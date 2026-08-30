import { cookies } from "next/headers";
import { KKUUserSession } from "@/types/auth";
import { getMockUser, MOCK_USERS } from "./mock-auth";

const SESSION_ROLE_COOKIE = "specwise_session_role";
const SESSION_USER_COOKIE = "specwise_user_session";

export async function getCurrentUser(): Promise<KKUUserSession> {
  const cookieStore = await cookies();

  // 1. Try to read explicit user session cookie (from KKU SSONext login)
  const sessionUserCookie = cookieStore.get(SESSION_USER_COOKIE)?.value;
  if (sessionUserCookie) {
    try {
      const parsed = JSON.parse(sessionUserCookie) as KKUUserSession;
      if (parsed && parsed.email && parsed.role) {
        return parsed;
      }
    } catch {
      // ignore JSON parse failure and fallback
    }
  }

  // 2. Try to read role switcher cookie (Mock Auth)
  const roleCookie = cookieStore.get(SESSION_ROLE_COOKIE)?.value;
  if (roleCookie && MOCK_USERS[roleCookie.toLowerCase()]) {
    return MOCK_USERS[roleCookie.toLowerCase()];
  }

  return getMockUser("requester");
}

export function getMockUserByRole(role: string): KKUUserSession {
  return getMockUser(role);
}
