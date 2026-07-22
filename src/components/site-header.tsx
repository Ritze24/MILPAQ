"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { primaryNav, servicesNav } from "@/lib/constants";

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-milpaq-deep-olive">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/brand/logo-white.png"
            alt="MILPAQ Solutions"
            width={1920}
            height={542}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-7 whitespace-nowrap xl:flex">
          <Link
            href="/"
            className="font-display text-sm font-medium uppercase tracking-wide text-white/85 transition-colors hover:text-white"
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
              className="flex items-center gap-1.5 font-display text-sm font-medium uppercase tracking-wide text-white/85 transition-colors hover:text-white"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
            >
              Services
              <svg viewBox="0 0 12 8" className="h-2.5 w-2.5 fill-none stroke-current">
                <path d="M1 1l5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                <div className="border border-milpaq-border bg-white">
                  <div className="h-0.5 bg-milpaq-tan" />
                  {servicesNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block border-b border-milpaq-border px-5 py-3 text-sm font-medium text-milpaq-charcoal last:border-0 hover:bg-milpaq-cream"
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
              className="font-display text-sm font-medium uppercase tracking-wide text-white/85 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/services/military-packaging#quote"
            className="hidden rounded bg-milpaq-tan px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-milpaq-deep-olive transition-colors hover:bg-milpaq-tan-hover xl:inline-block"
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
            <span className="block h-0.5 w-6 bg-white mb-1.5" />
            <span className="block h-0.5 w-6 bg-white mb-1.5" />
            <span className="block h-0.5 w-6 bg-white" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/15 px-4 py-3 xl:hidden">
          <Link href="/" className="py-2 font-display text-sm font-medium uppercase tracking-wide text-white">
            Home
          </Link>
          <span className="pt-2 font-display text-xs font-semibold uppercase tracking-wide text-milpaq-tan">
            Services
          </span>
          {servicesNav.map((item) => (
            <Link key={item.href} href={item.href} className="py-2 pl-3 text-sm text-white/80">
              {item.label}
            </Link>
          ))}
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 font-display text-sm font-medium uppercase tracking-wide text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/services/military-packaging#quote"
            className="mt-2 rounded bg-milpaq-tan px-6 py-2.5 text-center font-display text-sm font-semibold uppercase tracking-wide text-milpaq-deep-olive"
          >
            Request Packaging Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
