import { cookies } from "next/headers";
import { KKUUserSession, UserRole } from "@/types/auth";
import { getMockUser, MOCK_USERS } from "./mock-auth";

const SESSION_COOKIE_NAME = "specwise_session_role";

/**
 * Mock authentication is ONLY enabled when explicitly requested via env
 * AND the app is not running a production build. This prevents an
 * accidental production deploy from exposing the role-switch backdoor.
 */
export function isMockAuthEnabled(): boolean {
  return (
    process.env.ENABLE_MOCK_AUTH === "true" &&
    process.env.NODE_ENV !== "production"
  );
}

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: 401 | 403 = 401
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Resolve the current user session.
 *
 * Mock mode (local dev only): map the unsigned role cookie to a mock user.
 * Real mode: session must be established by the SSONext callback which
 * stores a server-issued session payload in an httpOnly cookie.
 *
 * Returns null when unauthenticated.
 */
export async function getCurrentUser(): Promise<KKUUserSession | null> {
  const cookieStore = await cookies();

  if (isMockAuthEnabled()) {
    const roleCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (roleCookie && MOCK_USERS[roleCookie.toLowerCase()]) {
      return MOCK_USERS[roleCookie.toLowerCase()];
    }
    return getMockUser("requester");
  }

  // Real SSONext session: the callback writes a signed session cookie.
  // The unsigned role cookie is never trusted for authorization here.
  const sessionCookie = cookieStore.get("specwise_user_session")?.value;
  if (!sessionCookie) return null;

  try {
    const parsed = JSON.parse(sessionCookie) as KKUUserSession;
    if (!parsed.id || !parsed.email || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Require an authenticated user; throws AuthError(401) otherwise.
 * Use in every API route that reads or mutates protected data.
 */
export async function requireUser(): Promise<KKUUserSession> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthError("กรุณาเข้าสู่ระบบผ่าน KKU SSONext ก่อนใช้งาน", 401);
  }
  return user;
}

/**
 * Require one of the given roles; throws AuthError(401/403) otherwise.
 */
export async function requireRole(...roles: UserRole[]): Promise<KKUUserSession> {
  const user = await requireUser();
  if (!roles.includes(user.role)) {
    throw new AuthError(
      `สิทธิ์ของคุณ (${user.role}) ไม่เพียงพอสำหรับการดำเนินการนี้`,
      403
    );
  }
  return user;
}

export function getMockUserByRole(role: string): KKUUserSession {
  return getMockUser(role);
}
