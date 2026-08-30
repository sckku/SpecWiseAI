import * as Minio from "minio";
import fs from "fs";
import path from "path";

const isMockStorage = process.env.ENABLE_MOCK_STORAGE === "true";

// Credentials must come from the environment; never fall back to
// hardcoded secrets. Mock storage mode skips the client entirely.
function createMinioClient(): Minio.Client | null {
  if (isMockStorage) return null;

  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;
  if (!accessKey || !secretKey) {
    console.warn(
      "MINIO_ACCESS_KEY / MINIO_SECRET_KEY are not set; MinIO operations will fall back to local storage"
    );
    return null;
  }

  return new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost",
    port: parseInt(process.env.MINIO_PORT || "9000", 10),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey,
    secretKey,
  });
}

export const minioClient = createMinioClient();

const DEFAULT_BUCKET = process.env.MINIO_BUCKET_NAME || "specwise-attachments";
const LOCAL_STORAGE_DIR = path.resolve(process.cwd(), ".local_storage");

/**
 * Resolve an object key to a local file path, refusing anything that
 * escapes the local storage root (defense-in-depth alongside the upload
 * route's key sanitization).
 */
function resolveLocalPath(objectKey: string): string {
  const resolved = path.resolve(LOCAL_STORAGE_DIR, objectKey);
  const rootWithSep = LOCAL_STORAGE_DIR.endsWith(path.sep)
    ? LOCAL_STORAGE_DIR
    : LOCAL_STORAGE_DIR + path.sep;
  if (resolved !== LOCAL_STORAGE_DIR && !resolved.startsWith(rootWithSep)) {
    throw new Error("Invalid storage object key");
  }
  return resolved;
}

export async function ensureBucketExists(bucketName = DEFAULT_BUCKET) {
  if (isMockStorage) {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    return;
  }

  if (!minioClient) return;

  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
    }
  } catch (error) {
    console.warn("MinIO bucket check failed, falling back to local storage:", error);
  }
}

export async function uploadAttachment(
  objectKey: string,
  buffer: Buffer,
  contentType: string,
  bucketName = DEFAULT_BUCKET
): Promise<{ storageKey: string; url: string }> {
  if (isMockStorage) {
    await ensureBucketExists();
    const filePath = resolveLocalPath(objectKey);
    const parentDir = path.dirname(filePath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
    return {
      storageKey: objectKey,
      url: `/api/upload/file?key=${encodeURIComponent(objectKey)}`,
    };
  }

  try {
    if (!minioClient) {
      throw new Error("MinIO client is not configured");
    }
    await ensureBucketExists(bucketName);
    await minioClient.putObject(bucketName, objectKey, buffer, buffer.length, {
      "Content-Type": contentType,
    });
    const presignedUrl = await minioClient.presignedGetObject(bucketName, objectKey, 24 * 60 * 60);
    return {
      storageKey: objectKey,
      url: presignedUrl,
    };
  } catch (error) {
    console.warn("MinIO upload failed, saving to local fallback:", error);
    const filePath = resolveLocalPath(objectKey);
    const parentDir = path.dirname(filePath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
    return {
      storageKey: objectKey,
      url: `/api/upload/file?key=${encodeURIComponent(objectKey)}`,
    };
  }
}

export async function getAttachmentPresignedUrl(
  objectKey: string,
  bucketName = DEFAULT_BUCKET
): Promise<string> {
  if (isMockStorage) {
    return `/api/upload/file?key=${encodeURIComponent(objectKey)}`;
  }
  try {
    if (!minioClient) {
      throw new Error("MinIO client is not configured");
    }
    return await minioClient.presignedGetObject(bucketName, objectKey, 15 * 60); // 15 mins expiry
  } catch {
    return `/api/upload/file?key=${encodeURIComponent(objectKey)}`;
  }
}
