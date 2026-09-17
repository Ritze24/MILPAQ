import Image from "next/image";
import { HomeHero } from "@/components/home-hero";
import { CtaBand } from "@/components/cta-band";
import { TestimonialsGrid } from "@/components/testimonials-grid";
import { ServicesExplorer } from "@/components/services-explorer";
import { StatsBand } from "@/components/stats-band";
import { credentials } from "@/lib/constants";
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
    image: "/brand/home-sections/hwh-market-access.jpg",
  },
  {
    icon: IconBriefcase,
    title: "Contract Execution",
    description:
      "End-to-end support from award through delivery: packaging, inspection, and documentation.",
    image: "/brand/home-sections/hwh-contract-execution.jpg",
  },
  {
    icon: IconShieldCheck,
    title: "Packaging & Compliance",
    description:
      "MIL-STD-2073 and MIL-STD-129 packaging, labeling, and DCMA origin inspection facilitation.",
    image: "/brand/home-sections/hwh-packaging-compliance.jpg",
  },
  {
    icon: IconTrendingUp,
    title: "Strategic Growth",
    description:
      "Advisory and outsourced business development for contractors scaling government revenue.",
    image: "/brand/home-sections/hwh-strategic-growth.jpg",
  },
];

const whoWeHelp = [
  {
    icon: IconFactory,
    title: "U.S. & Canadian OEM Manufacturers",
    description: "Building the packaging and compliance muscle to sell directly into government contracts.",
    image: "/brand/home-sections/wwh-oem-manufacturers.jpg",
  },
  {
    icon: IconGlobe,
    title: "Foreign Manufacturers Entering the U.S. Market",
    description: "Navigating CAGE registration, SAM, and DCMA requirements from outside the U.S.",
    image: "/brand/home-sections/wwh-foreign-manufacturers.jpg",
  },
  {
    icon: IconHandshake,
    title: "Government Contractors & Prime Contractors",
    description: "Outsourcing packaging, inspection, and documentation without adding headcount.",
    image: "/brand/home-sections/wwh-government-contractors.jpg",
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
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:px-8">
          {credentials.map(({ label, image }) => (
            <div key={label} className="relative h-16 w-full sm:h-20">
              <Image
                src={image}
                alt={label}
                fill
                sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-milpaq-border pb-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
              What We Do
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-milpaq-charcoal sm:text-4xl">
              How We Help
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-milpaq-charcoal/60">
            Four capabilities, one execution partner — from first opportunity to delivered
            contract.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {serviceCategories.map(({ icon: Icon, title, description, image }, index) => (
            <div key={title} className="group overflow-hidden rounded-lg border border-milpaq-border bg-white">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                  <Icon className="h-5 w-5 stroke-current fill-none" />
                </div>
                <span className="font-display absolute bottom-4 right-4 text-2xl font-semibold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-milpaq-charcoal">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-milpaq-charcoal/70">{description}</p>
              </div>
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
            {whoWeHelp.map(({ icon: Icon, title, description, image }) => (
              <div key={title} className="overflow-hidden rounded-lg bg-white">
                <div className="relative h-64 w-full">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                    <Icon className="h-5 w-5 stroke-current fill-none" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-milpaq-charcoal">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-milpaq-charcoal/70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-milpaq-cream">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
              Capabilities
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-milpaq-charcoal sm:text-4xl">
              Our Services
            </h2>
          </div>

          <div className="mt-12">
            <ServicesExplorer services={serviceCards} />
          </div>
        </div>
      </section>

      <StatsBand />

      <TestimonialsGrid />

      <CtaBand
        title="Ready to move your manufacturing capability into government contracts?"
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership"
      />
    </>
  );
}
