"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { primaryNav, servicesNav } from "@/lib/constants";
import { ShinyLink } from "@/components/ui/shiny-link";

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-milpaq-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/brand/logo-color.png"
            alt="MILPAQ Solutions"
            width={1920}
            height={542}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-7 whitespace-nowrap xl:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 font-display text-sm font-medium uppercase tracking-wide text-milpaq-charcoal transition-colors hover:text-milpaq-olive"
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
                <div className="border border-milpaq-border bg-white shadow-lg">
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

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-medium uppercase tracking-wide text-milpaq-charcoal transition-colors hover:text-milpaq-olive"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ShinyLink
            href="/services/military-packaging#quote"
            shineColor="#ffffff"
            className="hidden items-center rounded bg-milpaq-tan px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-milpaq-deep-olive transition-colors hover:bg-milpaq-tan-hover xl:inline-flex"
          >
            Request Packaging Quote
          </ShinyLink>

          <button
            type="button"
            className="p-2 xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="block h-0.5 w-6 bg-milpaq-charcoal mb-1.5" />
            <span className="block h-0.5 w-6 bg-milpaq-charcoal mb-1.5" />
            <span className="block h-0.5 w-6 bg-milpaq-charcoal" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-milpaq-border px-4 py-3 xl:hidden">
          <span className="font-display text-xs font-semibold uppercase tracking-wide text-milpaq-sage">
            Services
          </span>
          {servicesNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 pl-3 text-sm text-milpaq-dark/80"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 font-display text-sm font-medium uppercase tracking-wide text-milpaq-charcoal"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <ShinyLink
            href="/services/military-packaging#quote"
            shineColor="#ffffff"
            className="mt-2 flex items-center justify-center rounded bg-milpaq-tan px-6 py-2.5 text-center font-display text-sm font-semibold uppercase tracking-wide text-milpaq-deep-olive"
            onClick={() => setMobileOpen(false)}
          >
            Request Packaging Quote
          </ShinyLink>
        </nav>
      )}
    </header>
  );
}
