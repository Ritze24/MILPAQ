import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { staffPassword } from "@/lib/partner-api/config";
import { safeEqual } from "@/lib/partner-api/keys";
import { STAFF_COOKIE, STAFF_SESSION_SECONDS, signStaffSession } from "@/lib/partner-api/staff-session";
import { isStaff, sessionKey } from "../auth";

export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";
  const expected = staffPassword();
  const key = sessionKey();
  const given = String(formData.get("password") ?? "");
  if (!expected || !key) redirect("/staff/login?error=unavailable");
  await new Promise((r) => setTimeout(r, 800)); // slows password guessing
  if (!safeEqual(given, expected)) redirect("/staff/login?error=invalid");
  (await cookies()).set(STAFF_COOKIE, signStaffSession(key), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/staff",
    maxAge: STAFF_SESSION_SECONDS,
  });
  redirect("/staff/quotes");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isStaff()) redirect("/staff/quotes");
  const { error } = await searchParams;
  return (
    <main className="mx-auto max-w-sm">
      <h1 className="text-2xl font-semibold">MILPAQ staff</h1>
      <p className="mt-1 text-sm text-muted-foreground">Partner quote requests.</p>
      <form action={login} className="mt-6 space-y-3">
        <label className="block text-sm font-medium" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-md border px-3 py-2" />
        {error ? (
          <p role="alert" className="text-sm text-red-600">
            {error === "unavailable" ? "Staff sign-in is not configured." : "Incorrect password."}
          </p>
        ) : null}
        <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">Sign in</button>
      </form>
    </main>
  );
}
