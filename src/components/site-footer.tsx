import Image from "next/image";
import Link from "next/link";
import { company, primaryNav, servicesNav } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-milpaq-deep-olive text-white/70">
      <div className="h-0.5 bg-milpaq-tan" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/brand/logo-white.png"
              alt="MILPAQ Solutions"
              width={1920}
              height={542}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{company.legalName}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {company.address.line1}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
            </p>
            <p className="mt-3 text-sm">
              <a href={company.phoneHref} className="text-white/80 hover:text-white">
                {company.phone}
              </a>
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-white/40">
              CAGE Code {company.cageCode}
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-milpaq-tan">
              Services
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {servicesNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-milpaq-tan">
              Company
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {primaryNav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-white/60 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-widest">SDVOSB &middot; ISO 9001 &middot; JCP Certified</p>
        </div>
      </div>
    </footer>
  );
}
