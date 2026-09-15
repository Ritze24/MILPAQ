import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { credentials } from "@/lib/constants";
import {
  IconHandshake,
  IconTrendingUp,
  IconCertificate,
  IconFactory,
  IconGlobeCheck,
  IconTarget,
  IconShieldCheck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About MILPAQ",
  description:
    "MILPAQ Solutions is the government contracting and compliance division of 305 Aero Supplies LLC, helping manufacturers execute on U.S. government contracts.",
};

const differentiators = [
  {
    icon: IconHandshake,
    title: "Excellent Customer Service",
    description: "A single point of contact who knows your contract from bid to delivery.",
  },
  {
    icon: IconTrendingUp,
    title: "Competitive Pricing",
    description: "Transparent, contract-appropriate pricing on every quote.",
  },
  {
    icon: IconCertificate,
    title: "ISO 9001:2015 Quality Management",
    description: "Certified quality management system behind every shipment.",
  },
  {
    icon: IconFactory,
    title: "MIL-STD Trained Staff",
    description: "Our team is trained on military specification packaging and shipping procedures.",
  },
  {
    icon: IconGlobeCheck,
    title: "DCMA Inspection Facilitation",
    description: "Able to host and facilitate DCMA origin inspections at our own facility.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MILPAQ"
        title="Consulting Is One Service. Execution Is The Business."
        image="/brand/services/svc-facility-hosting.jpg"
        description="MILPAQ Solutions is the government contracting and compliance division of 305 Aero Supplies LLC — bridging the gap between manufacturers, suppliers, and government customers."
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/brand/about/our-story.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
              Our Story
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
              Built From Real Execution Experience
            </h2>
            <p className="mt-5 text-milpaq-dark/80">
              305 Aero Supplies LLC — the parent company behind MILPAQ Solutions — is a
              Service-Disabled Veteran-Owned Small Business built on logistics, government
              procurement, and supply chain management. Specializing in wholesale distribution,
              warehousing, MIL-STD packaging, and targeted marketing, we provide end-to-end
              support to defense and government customers.
            </p>
            <p className="mt-4 text-milpaq-dark/80">
              MILPAQ Solutions was formed to focus that experience specifically on government
              market access, packaging compliance, and contract execution — becoming the bridge
              manufacturers need between what they build and what the government buys.
            </p>
            <p className="mt-4 font-medium text-milpaq-dark">Richard Jones — Founder</p>
          </div>
        </div>
      </section>

      <section className="bg-milpaq-cream py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="rounded-lg border border-milpaq-tan bg-white p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <IconTarget className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h2 className="font-display mt-4 text-xl font-bold text-milpaq-dark">Mission</h2>
              <p className="mt-3 text-milpaq-dark/80">
                Bridge the gap between manufacturers, suppliers, and government customers.
              </p>
            </div>
            <div className="rounded-lg border border-milpaq-tan bg-white p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <IconShieldCheck className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h2 className="font-display mt-4 text-xl font-bold text-milpaq-dark">Vision</h2>
              <p className="mt-3 text-milpaq-dark/80">
                Become the most trusted government compliance and execution partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Why MILPAQ
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            What Sets Us Apart
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-milpaq-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <Icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-4 text-sm font-semibold text-milpaq-dark">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-milpaq-dark/70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Certifications &amp; Registrations
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            Credentials
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
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

      <CtaBand
        title="Ready to put real execution experience behind your government contracts?"
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership#discovery-call"
      />
    </>
  );
}
