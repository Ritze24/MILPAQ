import Image from "next/image";
import Link from "next/link";
import { company, primaryNav, servicesNav } from "@/lib/constants";
import { BrochureDownloadForm } from "@/components/brochure-download-form";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Accessibility", href: "/accessibility" },
];

const footerColumns = [
  {
    heading: "Services",
    links: servicesNav,
  },
  {
    heading: "Company",
    links: [...primaryNav, { label: "Blog", href: "/blog" }],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-milpaq-deep-olive text-white/70">
      <div className="h-0.5 bg-milpaq-tan" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src="/brand/logo-white.png"
              alt="MILPAQ Solutions"
              width={1920}
              height={542}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{company.entityName}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-milpaq-tan">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/60 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-milpaq-tan">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a href={company.phoneHref} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="break-all hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                {company.address.line1}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </li>
              <li className="text-xs uppercase tracking-wide text-white/40">
                CAGE Code {company.cageCode}
              </li>
              <li>
                <BrochureDownloadForm triggerClassName="inline-flex items-center gap-1.5 text-white/60 hover:text-white" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-white/40 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {company.entityName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="uppercase tracking-widest text-white/30">
            SDVOSB &middot; ISO 9001 &middot; JCP Certified &middot; SAM Registered &middot; CAGE{" "}
            {company.cageCode}
          </p>
        </div>
      </div>

      <div aria-hidden className="overflow-hidden border-t border-white/10 py-8 select-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Image
            src="/brand/wordmark-white.png"
            alt=""
            width={1239}
            height={256}
            className="h-auto w-full opacity-[0.06]"
          />
        </div>
      </div>
    </footer>
  );
}
