import Link from "next/link";
import { company, primaryNav, servicesNav } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-milpaq-tan bg-milpaq-dark text-milpaq-tan-light">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">{company.name}</p>
            <p className="mt-2 text-sm">{company.legalName}</p>
            <p className="mt-4 text-sm">
              {company.address.line1}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
            </p>
            <p className="mt-2 text-sm">
              <a href={company.phoneHref} className="hover:text-white">
                {company.phone}
              </a>
            </p>
            <p className="mt-1 text-sm">CAGE Code {company.cageCode}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Services</p>
            <ul className="mt-3 space-y-2 text-sm">
              {servicesNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              {primaryNav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs">
          &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
