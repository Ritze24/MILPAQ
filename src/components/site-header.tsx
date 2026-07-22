"use client";

import Link from "next/link";
import { useState } from "react";
import { company, primaryNav, servicesNav } from "@/lib/constants";

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-milpaq-tan bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-milpaq-dark">
          {company.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm font-medium text-milpaq-dark hover:text-milpaq-olive">
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="text-sm font-medium text-milpaq-dark hover:text-milpaq-olive"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
            >
              Services
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-72 rounded-md border border-milpaq-tan bg-white py-2 shadow-lg">
                {servicesNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-milpaq-dark hover:bg-milpaq-tan-light"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-milpaq-dark hover:text-milpaq-olive"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/services/military-packaging#quote"
          className="hidden rounded-md bg-milpaq-olive px-4 py-2 text-sm font-semibold text-white hover:bg-milpaq-olive-dark lg:inline-block"
        >
          Request Packaging Quote
        </Link>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="block h-0.5 w-6 bg-milpaq-dark mb-1.5" />
          <span className="block h-0.5 w-6 bg-milpaq-dark mb-1.5" />
          <span className="block h-0.5 w-6 bg-milpaq-dark" />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-milpaq-tan px-4 py-3 lg:hidden">
          <Link href="/" className="py-2 text-sm font-medium text-milpaq-dark">
            Home
          </Link>
          <span className="pt-2 text-xs font-semibold uppercase tracking-wide text-milpaq-olive">
            Services
          </span>
          {servicesNav.map((item) => (
            <Link key={item.href} href={item.href} className="py-2 pl-3 text-sm text-milpaq-dark">
              {item.label}
            </Link>
          ))}
          {primaryNav.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="py-2 text-sm font-medium text-milpaq-dark">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
