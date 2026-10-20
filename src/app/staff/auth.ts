import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { masterKey, ENVIRONMENTS, type ApiEnvironment } from "@/lib/partner-api/config";
import { deriveKey } from "@/lib/partner-api/crypto-box";
import { STAFF_COOKIE, verifyStaffSession } from "@/lib/partner-api/staff-session";

export function sessionKey(): Buffer | null {
  const master = masterKey();
  return master ? deriveKey(master, "staff-session") : null;
}

export async function isStaff(): Promise<boolean> {
  const key = sessionKey();
  if (!key) return false;
  return verifyStaffSession((await cookies()).get(STAFF_COOKIE)?.value, key);
}

export async function requireStaff(): Promise<void> {
  if (!(await isStaff())) redirect("/staff/login");
}

export function parseEnv(value: unknown): ApiEnvironment {
  return ENVIRONMENTS.includes(value as ApiEnvironment) ? (value as ApiEnvironment) : "live";
}
