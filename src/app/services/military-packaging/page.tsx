import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PackagingRfqForm } from "@/components/packaging-rfq-form";
import { PackagingCodeReference } from "@/components/packaging-code-reference";
import {
  IconFactory,
  IconCertificate,
  IconTarget,
  IconDocument,
  IconShieldCheck,
  IconGlobeCheck,
  IconHandshake,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Military Packaging & Contract Execution",
  description:
    "MIL-STD-2073 military packaging, MIL-STD-129 labeling, documentation review, and DCMA origin inspection facilitation for government contract fulfillment.",
};

const featuredService = {
  icon: IconFactory,
  image: "/brand/home-sections/success-preservation.jpg",
  title: "Military Packaging (MIL-STD-2073)",
  description:
    "Preservation, cushioning, and container selection engineered to spec - the core of every MILPAQ packaging job.",
};

const services = [
  {
    icon: IconCertificate,
    image: "/brand/home-sections/hwh-packaging-compliance.jpg",
    title: "MIL-STD-129 Labeling & Marking",
    description: "Bar codes, hazmat placards, and shipment marking done right the first time.",
  },
  {
    icon: IconTarget,
    image: "/brand/services/svc-packaging-design.jpg",
    title: "Packaging Design",
    description: "Engineered packaging solutions for fragile, oversized, or sensitive items.",
  },
  {
    icon: IconDocument,
    image: "/brand/home-sections/success-compliance.jpg",
    title: "Documentation Review",
    description: "Contract and packaging code review before a single box is built.",
  },
  {
    icon: IconShieldCheck,
    image: "/brand/home-sections/hwh-market-access.jpg",
    title: "Traceability Documentation Review",
    description: "Lot, serial, and material traceability records checked for compliance.",
  },
  {
    icon: IconGlobeCheck,
    image: "/brand/services/svc-dcma-inspection.jpg",
    title: "DCMA Origin Inspection Facilitation",
    description: "Coordinated source inspection so your shipment clears without delay.",
  },
  {
    icon: IconHandshake,
    image: "/brand/home-sections/hwh-contract-execution.jpg",
    title: "Contract Fulfillment Support",
    description: "End-to-end execution support from award through final delivery.",
  },
];

const processSteps = [
  {
    image: "/brand/home-sections/success-dla-packaging.jpg",
    step: "01",
    title: "Preservation & Packaging Design",
    description:
      "We review your contract's packaging code and engineer preservation, cushioning, and container specs to MIL-STD-2073.",
  },
  {
    image: "/brand/home-sections/success-dcma-inspection.jpg",
    step: "02",
    title: "Documentation & DCMA Inspection",
    description:
      "Labeling, traceability, and hazmat documentation are prepared and coordinated ahead of source or destination inspection.",
  },
  {
    image: "/brand/home-sections/success-export-packaging.jpg",
    step: "03",
    title: "Contract Fulfillment & Shipment",
    description:
      "Packaged units are staged, loaded, and shipped on schedule - with full documentation ready for delivery.",
  },
];

export default function MilitaryPackagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Military Packaging & Contract Execution"
        image="/brand/services/svc-military-packaging.jpg"
        description="From packaging design through DCMA-coordinated origin inspection, MILPAQ executes the physical and documentation requirements of your government contract."
        primaryCta={{ label: "Request Packaging Quote", href: "#quote" }}
        secondaryCta={{ label: "See Capabilities", href: "#capabilities" }}
      />

      <section id="capabilities" className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Capabilities
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            What We Handle
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="group relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-lg lg:min-h-full">
            <Image
              src={featuredService.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
            <div className="relative p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <featuredService.icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold uppercase leading-tight tracking-wide text-white">
                {featuredService.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                {featuredService.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {services.map(({ icon: Icon, image, title, description }) => (
              <div
                key={title}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg sm:aspect-auto sm:h-full"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />
                <div className="relative p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                    <Icon className="h-4 w-4 stroke-current fill-none" />
                  </div>
                  <h3 className="font-display mt-3 text-lg font-semibold uppercase leading-tight tracking-wide text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-milpaq-cream py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
              Process
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
              From Award to Delivery
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {processSteps.map(({ image, step, title, description }) => (
              <div
                key={step}
                className="group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-lg sm:aspect-[3/4]"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
                <div className="relative p-6">
                  <span className="font-display text-2xl font-semibold text-milpaq-tan [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                    {step}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-semibold uppercase leading-tight tracking-wide text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-24 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Get Started
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            Request a Packaging Quote
          </h2>
          <p className="mt-4 text-milpaq-dark/70">
            Upload your awarded contract or solicitation and we&apos;ll review packaging and
            inspection requirements before preparing your quote.
          </p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <PackagingRfqForm />
          <PackagingCodeReference />
        </div>
        <p className="mt-8 text-sm text-milpaq-dark/70">
          Have questions first?{" "}
          <Link
            href="/faq#military-packaging-preservation"
            className="font-medium text-milpaq-olive hover:underline"
          >
            See military packaging FAQs
          </Link>
          .
        </p>
      </section>
    </>
  );
}
