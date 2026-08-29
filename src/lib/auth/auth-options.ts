import { cookies } from "next/headers";
import { KKUUserSession } from "@/types/auth";
import { getMockUser, MOCK_USERS } from "./mock-auth";

const SESSION_COOKIE_NAME = "specwise_session_role";

export async function getCurrentUser(): Promise<KKUUserSession> {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (roleCookie && MOCK_USERS[roleCookie.toLowerCase()]) {
    return MOCK_USERS[roleCookie.toLowerCase()];
  }

  return getMockUser("requester");
}

export function getMockUserByRole(role: string): KKUUserSession {
  return getMockUser(role);
}
