import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import {
  IconBriefcase,
  IconShieldCheck,
  IconDocument,
  IconTrendingUp,
  IconHandshake,
  IconFactory,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "DCMA Origin Inspection Facilitation",
  description:
    "Inspection scheduling, packaging readiness review, documentation review, and inspector coordination for DCMA origin inspections at MILPAQ's facility.",
};

const featuredService = {
  icon: IconBriefcase,
  image: "/brand/home-sections/hwh-market-access.jpg",
  title: "Inspection Scheduling",
  description:
    "MILPAQ coordinates scheduling with government inspectors so your shipment is reviewed on time, every time.",
};

const services = [
  {
    icon: IconShieldCheck,
    image: "/brand/home-sections/hwh-packaging-compliance.jpg",
    title: "Packaging Readiness Review",
    description: "Every crate checked against spec before the inspector arrives.",
  },
  {
    icon: IconDocument,
    image: "/brand/home-sections/success-compliance.jpg",
    title: "Documentation Review",
    description: "Contract, packaging code, and shipment paperwork verified in advance.",
  },
  {
    icon: IconTrendingUp,
    image: "/brand/home-sections/success-readiness-training.jpg",
    title: "Corrective Action Assistance",
    description: "Fast turnaround on fixes when a shipment doesn't pass the first time.",
  },
  {
    icon: IconHandshake,
    image: "/brand/services/svc-government-readiness.jpg",
    title: "Inspector Coordination",
    description: "A single point of contact for the government inspector, start to finish.",
  },
  {
    icon: IconFactory,
    image: "/brand/services/svc-facility-hosting.jpg",
    title: "Facility Hosting",
    description: "Inspections hosted at MILPAQ's facility - staged, organized, and ready.",
  },
];

const processSteps = [
  {
    image: "/brand/home-sections/success-dcma-inspection.jpg",
    step: "01",
    title: "Readiness Review",
    description:
      "Before the inspector is scheduled, MILPAQ reviews packaging, labeling, and documentation against the contract requirements.",
  },
  {
    image: "/brand/services/svc-government-infrastructure.jpg",
    step: "02",
    title: "On-Site Facilitation",
    description:
      "MILPAQ hosts and coordinates the inspection at our facility, working directly with the government inspector.",
  },
  {
    image: "/brand/home-sections/success-export-packaging.jpg",
    step: "03",
    title: "Clearance & Shipment",
    description:
      "Once cleared, your shipment is staged and released - with corrective action support if issues come up.",
  },
];

const faqs = [
  {
    question: "What are the most common DCMA inspection mistakes?",
    answer:
      "Incorrect inspection location, incorrect place of performance, improper packaging or labeling, missing documentation, and general failure to prepare.",
  },
  {
    question: "Where are inspections performed?",
    answer: "At MILPAQ's facility(s).",
  },
  {
    question: "Can MILPAQ perform the inspection itself?",
    answer:
      "No. MILPAQ coordinates readiness and scheduling; government inspectors retain independent acceptance authority.",
  },
  {
    question: "Can MILPAQ help if a shipment has already failed inspection?",
    answer: "Yes, through corrective action assistance and re-inspection coordination.",
  },
];

export default function DcmaOriginInspectionPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="DCMA Origin Inspection Facilitation"
        image="/brand/services/svc-dcma-inspection.jpg"
        description="MILPAQ prepares your shipment for DCMA origin inspection and coordinates the inspection process at our facility."
        primaryCta={{ label: "Schedule Inspection Review", href: "/contact" }}
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
                  <h3 className="font-display mt-3 text-sm font-semibold uppercase leading-tight tracking-wide text-white">
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
              How Inspection Facilitation Works
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

      <section className="mx-auto max-w-3xl px-4 py-12 sm:py-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
          Questions
        </p>
        <h2 className="font-display mt-3 text-2xl font-bold text-milpaq-dark">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-milpaq-tan bg-white p-5">
              <summary className="cursor-pointer font-medium text-milpaq-dark">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-milpaq-dark/70">{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-milpaq-dark/70">
          <Link href="/faq#dcma-inspection-support" className="font-medium text-milpaq-olive hover:underline">
            See more DCMA inspection FAQs
          </Link>
        </p>
      </section>

      <CtaBand
        title="Preparing for a DCMA origin inspection?"
        ctaLabel="Schedule Inspection Review"
        ctaHref="/contact"
      />
    </>
  );
}
