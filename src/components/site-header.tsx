"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { primaryNav, servicesNav } from "@/lib/constants";

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-milpaq-tan/60 bg-milpaq-cream/95 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-milpaq-olive-dark via-milpaq-gold to-milpaq-olive-dark" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/brand/logo-lockup.png"
            alt="MILPAQ Solutions"
            width={764}
            height={248}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 whitespace-nowrap xl:flex">
          <Link
            href="/"
            className="text-[13px] font-semibold uppercase tracking-wide text-milpaq-dark/80 transition-colors hover:text-milpaq-olive-dark"
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wide text-milpaq-dark/80 transition-colors hover:text-milpaq-olive-dark"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
            >
              Services
              <svg viewBox="0 0 12 8" className="h-2.5 w-2.5 fill-current">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-md border border-milpaq-tan/70 bg-white shadow-xl shadow-black/10">
                  <div className="h-0.5 bg-milpaq-gold" />
                  {servicesNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block border-b border-milpaq-cream-soft px-5 py-3 text-sm font-medium text-milpaq-dark last:border-0 hover:bg-milpaq-cream-soft hover:text-milpaq-olive-dark"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold uppercase tracking-wide text-milpaq-dark/80 transition-colors hover:text-milpaq-olive-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/services/military-packaging#quote"
            className="hidden rounded-sm bg-milpaq-olive-dark px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-milpaq-olive-darker xl:inline-block"
          >
            Request Packaging Quote
          </Link>

          <button
            type="button"
            className="p-2 xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="block h-0.5 w-6 bg-milpaq-dark mb-1.5" />
            <span className="block h-0.5 w-6 bg-milpaq-dark mb-1.5" />
            <span className="block h-0.5 w-6 bg-milpaq-dark" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-milpaq-tan/60 bg-milpaq-cream px-4 py-3 xl:hidden">
          <Link href="/" className="py-2 text-sm font-semibold uppercase tracking-wide text-milpaq-dark">
            Home
          </Link>
          <span className="pt-2 text-xs font-semibold uppercase tracking-wide text-milpaq-olive-dark">
            Services
          </span>
          {servicesNav.map((item) => (
            <Link key={item.href} href={item.href} className="py-2 pl-3 text-sm text-milpaq-dark">
              {item.label}
            </Link>
          ))}
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 text-sm font-semibold uppercase tracking-wide text-milpaq-dark"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/services/military-packaging#quote"
            className="mt-2 rounded-sm bg-milpaq-olive-dark px-5 py-2.5 text-center text-[13px] font-bold uppercase tracking-wide text-white"
          >
            Request Packaging Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
