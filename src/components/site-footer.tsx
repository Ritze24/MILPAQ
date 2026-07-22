import Image from "next/image";
import Link from "next/link";
import { company, primaryNav, servicesNav } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-milpaq-olive-darker text-white/70">
      <div className="h-1 bg-gradient-to-r from-milpaq-gold via-milpaq-olive-dark to-milpaq-gold" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/brand/logo-mark.png" alt="" width={800} height={665} className="h-10 w-auto" />
              <span className="font-display text-xl font-semibold tracking-wide text-white">
                MILPAQ
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{company.legalName}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {company.address.line1}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
            </p>
            <p className="mt-3 text-sm">
              <a href={company.phoneHref} className="text-white/80 hover:text-milpaq-gold">
                {company.phone}
              </a>
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-white/40">
              CAGE Code {company.cageCode}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-milpaq-gold">Services</p>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-milpaq-gold">Company</p>
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
