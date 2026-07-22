import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { CtaBand } from "@/components/cta-band";
import { credentials, servicesNav } from "@/lib/constants";
import {
  IconTarget,
  IconBriefcase,
  IconShieldCheck,
  IconTrendingUp,
  IconFactory,
  IconGlobe,
  IconHandshake,
} from "@/components/icons";

const serviceCategories = [
  {
    icon: IconTarget,
    title: "Government Market Access",
    description:
      "Connecting manufacturers with government buyers through OEM partnership and sales representation.",
  },
  {
    icon: IconBriefcase,
    title: "Contract Execution",
    description:
      "End-to-end support from award through delivery: packaging, inspection, and documentation.",
  },
  {
    icon: IconShieldCheck,
    title: "Packaging & Compliance",
    description:
      "MIL-STD-2073 and MIL-STD-129 packaging, labeling, and DCMA origin inspection facilitation.",
  },
  {
    icon: IconTrendingUp,
    title: "Strategic Growth",
    description:
      "Advisory and outsourced business development for contractors scaling government revenue.",
  },
];

const whoWeHelp = [
  {
    icon: IconFactory,
    title: "U.S. & Canadian OEM Manufacturers",
    description: "Building the packaging and compliance muscle to sell directly into government contracts.",
  },
  {
    icon: IconGlobe,
    title: "Foreign Manufacturers Entering the U.S. Market",
    description: "Navigating CAGE registration, SAM, and DCMA requirements from outside the U.S.",
  },
  {
    icon: IconHandshake,
    title: "Government Contractors & Prime Contractors",
    description: "Outsourcing packaging, inspection, and documentation without adding headcount.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero
        eyebrow="Government Market Access · Compliance · Contract Execution"
        title="Turning Manufacturing Capability Into Government Opportunity"
        description="MILPAQ helps manufacturers and contractors win, package, inspect, and deliver on U.S. government contracts — without building an in-house contracting department."
        primaryCta={{ label: "Schedule Discovery Call", href: "/oem-partnership" }}
        secondaryCta={{ label: "Request Packaging Quote", href: "/services/military-packaging#quote" }}
      />

      <section className="border-b border-milpaq-tan/60 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-7 sm:px-6 lg:px-8">
          {credentials.map((credential, i) => (
            <span key={credential} className="flex items-center gap-x-12">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-milpaq-dark/70">
                {credential}
              </span>
              {i < credentials.length - 1 && (
                <span className="hidden h-4 w-px bg-milpaq-tan sm:inline-block" />
              )}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-olive">
            What We Do
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-milpaq-dark sm:text-4xl">
            How We Help
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-milpaq-tan/60 bg-milpaq-tan/60 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group bg-white p-8 transition-colors hover:bg-milpaq-cream-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-milpaq-gold/50 text-milpaq-olive-dark">
                <Icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-5 text-base font-semibold uppercase tracking-wide text-milpaq-dark">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-milpaq-dark/70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-olive-darker">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-gold">
              Who We Serve
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
              Who We Help
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {whoWeHelp.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border-t-2 border-milpaq-gold bg-white/5 p-7">
                <Icon className="h-6 w-6 stroke-current fill-none text-milpaq-gold" />
                <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-olive">
            Capabilities
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-milpaq-dark sm:text-4xl">
            Our Services
          </h2>
        </div>
        <div className="mt-12 divide-y divide-milpaq-tan/60 border-y border-milpaq-tan/60">
          {servicesNav.map((service, i) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-milpaq-cream-soft"
            >
              <span className="flex items-center gap-6">
                <span className="font-display text-sm text-milpaq-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-medium uppercase tracking-wide text-milpaq-dark sm:text-xl">
                  {service.label}
                </span>
              </span>
              <span className="shrink-0 text-xl text-milpaq-olive-dark transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to move your manufacturing capability into government contracts?"
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership"
      />
    </>
  );
}
