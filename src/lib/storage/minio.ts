import * as Minio from "minio";
import fs from "fs";
import path from "path";

const isMockStorage = process.env.ENABLE_MOCK_STORAGE === "true";

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "9000", 10),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || "specwise_minio_admin",
  secretKey: process.env.MINIO_SECRET_KEY || "specwise_secure_pass_2026",
});

const DEFAULT_BUCKET = process.env.MINIO_BUCKET_NAME || "specwise-attachments";
const LOCAL_STORAGE_DIR = path.join(process.cwd(), ".local_storage");

export async function ensureBucketExists(bucketName = DEFAULT_BUCKET) {
  if (isMockStorage) {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    return;
  }

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
    const filePath = path.join(LOCAL_STORAGE_DIR, objectKey);
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
    const filePath = path.join(LOCAL_STORAGE_DIR, objectKey);
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
    return await minioClient.presignedGetObject(bucketName, objectKey, 15 * 60); // 15 mins expiry
  } catch {
    return `/api/upload/file?key=${encodeURIComponent(objectKey)}`;
  }
}
