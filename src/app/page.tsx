import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { credentials, servicesNav } from "@/lib/constants";

const serviceCategories = [
  {
    title: "Government Market Access",
    description: "Connecting manufacturers with government buyers through OEM partnership and sales representation.",
  },
  {
    title: "Contract Execution",
    description: "End-to-end support from award through delivery: packaging, inspection, and documentation.",
  },
  {
    title: "Packaging & Compliance",
    description: "MIL-STD-2073 and MIL-STD-129 packaging, labeling, and DCMA origin inspection facilitation.",
  },
  {
    title: "Strategic Growth",
    description: "Advisory and outsourced business development for contractors scaling government revenue.",
  },
];

const whoWeHelp = [
  "U.S. & Canadian OEM Manufacturers",
  "Foreign Manufacturers Entering the U.S. Market",
  "Government Contractors & Prime Contractors",
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Government Market Access · Compliance · Contract Execution"
        title="Turning Manufacturing Capability Into Government Opportunity"
        description="MILPAQ helps manufacturers and contractors win, package, inspect, and deliver on U.S. government contracts — without building an in-house contracting department."
        primaryCta={{ label: "Schedule Discovery Call", href: "/oem-partnership" }}
        secondaryCta={{ label: "Request Packaging Quote", href: "/services/military-packaging#quote" }}
      />

      <section className="border-b border-milpaq-tan bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-8 sm:px-6">
          {credentials.map((credential) => (
            <span key={credential} className="text-sm font-semibold tracking-wide text-milpaq-dark/70">
              {credential}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-bold text-milpaq-dark">How We Help</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <div key={category.title} className="rounded-lg border border-milpaq-tan p-6">
              <h3 className="text-lg font-semibold text-milpaq-dark">{category.title}</h3>
              <p className="mt-2 text-sm text-milpaq-dark/70">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-tan-light">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold text-milpaq-dark">Who We Help</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {whoWeHelp.map((item) => (
              <li key={item} className="rounded-lg bg-white p-6 text-center font-medium text-milpaq-dark shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-bold text-milpaq-dark">Our Services</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {servicesNav.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="block rounded-lg border border-milpaq-tan p-6 font-medium text-milpaq-dark hover:border-milpaq-olive hover:bg-milpaq-tan-light"
              >
                {service.label} &rarr;
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Ready to move your manufacturing capability into government contracts?"
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership"
      />
    </>
  );
}
