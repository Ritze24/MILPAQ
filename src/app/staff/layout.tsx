import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff",
  robots: { index: false, follow: false },
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">{children}</div>;
}
