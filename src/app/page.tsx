import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { CtaBand } from "@/components/cta-band";
import { credentials } from "@/lib/constants";
import {
  IconTarget,
  IconBriefcase,
  IconShieldCheck,
  IconTrendingUp,
  IconFactory,
  IconGlobe,
  IconHandshake,
  IconShieldStar,
  IconGlobeCheck,
  IconCertificate,
  IconBank,
} from "@/components/icons";

const credentialIcons = [IconShieldStar, IconGlobeCheck, IconCertificate, IconBank];

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

const serviceCards = [
  {
    image: "/brand/services/svc-military-packaging.jpg",
    eyebrow: "MIL-STD-2073 / 129",
    title: "Military Packaging & Contract Execution",
    description: "End-to-end packaging, labeling, and export prep — from award through delivery.",
    href: "/services/military-packaging",
    cta: "Explore Packaging",
  },
  {
    image: "/brand/services/svc-dcma-inspection.jpg",
    eyebrow: "Origin Inspection",
    title: "DCMA Origin Inspection Facilitation",
    description: "Coordinating source inspection so MILPAQ is listed and ready before DCMA arrives.",
    href: "/services/dcma-origin-inspection",
    cta: "Inspection Support",
  },
  {
    image: "/brand/services/svc-government-readiness.jpg",
    eyebrow: "Readiness",
    title: "Government Readiness",
    description: "Assessing and building the operational infrastructure to sell into the federal market.",
    href: "/services/government-readiness",
    cta: "Readiness Assessment",
  },
  {
    image: "/brand/services/svc-strategic-growth.jpg",
    eyebrow: "90-Day Engagement",
    title: "Strategic Growth Retainer",
    description: "Outsourced business development for contractors scaling government revenue.",
    href: "/services/strategic-growth-retainer",
    cta: "Growth Retainer",
  },
  {
    image: "/brand/services/svc-government-infrastructure.jpg",
    eyebrow: "Systems & Compliance",
    title: "Government Infrastructure Services",
    description: "PIEE, VSM, WAWF, and eJCP support so contract administration doesn't stall delivery.",
    href: "/services/government-infrastructure",
    cta: "Infrastructure Support",
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

      <section className="border-b border-milpaq-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {credentials.map(({ label, caption }, i) => {
            const Icon = credentialIcons[i];
            return (
              <div key={label} className="flex items-start gap-3">
                <Icon className="h-8 w-8 shrink-0 stroke-current fill-none text-milpaq-olive" />
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-milpaq-charcoal">
                    {label}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-milpaq-charcoal/60">{caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            What We Do
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-milpaq-charcoal sm:text-4xl">
            How We Help
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden border border-milpaq-border bg-milpaq-border sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group bg-white p-8 transition-colors hover:bg-milpaq-cream">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-milpaq-tan text-milpaq-olive">
                <Icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-5 text-base font-semibold uppercase tracking-wide text-milpaq-charcoal">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-milpaq-charcoal/70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-deep-olive">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-tan">
              Who We Serve
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
              Who We Help
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {whoWeHelp.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border-t-2 border-milpaq-tan bg-white/5 p-7">
                <Icon className="h-6 w-6 stroke-current fill-none text-milpaq-tan" />
                <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Capabilities
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-milpaq-charcoal sm:text-4xl">
            Our Services
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden"
            >
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-milpaq-deep-olive/15 transition-colors group-hover:bg-milpaq-deep-olive/5" />

              <div className="relative p-6">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-milpaq-tan">
                  {service.eyebrow}
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold uppercase leading-tight tracking-wide text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{service.description}</p>
                <span className="mt-5 inline-block border border-white/40 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-white transition-colors group-hover:border-milpaq-tan group-hover:text-milpaq-tan">
                  {service.cta}
                </span>
              </div>
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
