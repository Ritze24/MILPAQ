import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SimpleLeadForm } from "@/components/simple-lead-form";
import { IconTarget, IconShieldCheck, IconGlobeCheck, IconHandshake } from "@/components/icons";

export const metadata: Metadata = {
  title: "OEM Partnership Program",
  description:
    "MILPAQ's OEM Partnership Program helps U.S., Canadian, and foreign manufacturers access U.S. government buyers without building an in-house contracting department.",
};

const whatWeDo = [
  {
    icon: IconTarget,
    title: "Opportunity Identification",
    description: "Government opportunity identification and assessment.",
  },
  {
    icon: IconShieldCheck,
    title: "Bid & Packaging Support",
    description: "Bid preparation and packaging/compliance support.",
  },
  {
    icon: IconGlobeCheck,
    title: "DCMA Coordination",
    description: "DCMA origin inspection coordination.",
  },
  {
    icon: IconHandshake,
    title: "Contract Execution",
    description: "Contract execution and delivery to government buyers.",
  },
];

const whoWePartnerWith = [
  {
    image: "/brand/home-sections/wwh-oem-manufacturers.jpg",
    title: "U.S. & Canadian Manufacturers",
  },
  {
    image: "/brand/home-sections/wwh-foreign-manufacturers.jpg",
    title: "Foreign Manufacturers",
  },
];

const partnershipModels = [
  {
    icon: IconHandshake,
    title: "Strategic OEM Partner",
    description: "Preferred pricing, government growth, and long-term partnership.",
  },
  {
    icon: IconTarget,
    title: "Government Readiness Program",
    description: "A self-service path for OEMs who want to prepare on their own timeline.",
  },
];

export default function OemPartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Highest-Value Partnership Program"
        title="Turning Manufacturing Capability Into Government Opportunity"
        image="/brand/hero-manufacturing.jpg"
        description="You build it. MILPAQ moves it. We become your government market access, sales channel, packaging, compliance, and contract execution partner."
        primaryCta={{ label: "Schedule Discovery Call", href: "#discovery-call" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            What We Do
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            Your Government Market Access Partner
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-milpaq-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <Icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold text-milpaq-dark">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-milpaq-dark/70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-deep-olive py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-tan">
              Who We Partner With
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
              Manufacturers, Wherever You Are
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {whoWePartnerWith.map(({ image, title }) => (
              <div
                key={title}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                <div className="relative p-6">
                  <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-wide text-white">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Partnership Models
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            Choose Your Path
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {partnershipModels.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-lg border border-milpaq-tan p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <Icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold text-milpaq-dark">{title}</h3>
              <p className="mt-2 text-sm text-milpaq-dark/70">{description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-milpaq-dark/70">
          <Link href="/faq#oem-partnership-program" className="font-medium text-milpaq-olive hover:underline">
            Read the OEM Partnership Program FAQs
          </Link>
        </p>
      </section>

      <section id="discovery-call" className="bg-milpaq-cream py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Get Started
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold text-milpaq-dark">
            Schedule Discovery Call
          </h2>
          <div className="mt-8">
            <SimpleLeadForm
              submitLabel="Schedule Discovery Call"
              confirmationTitle="Request received"
              confirmationMessage="MILPAQ will reach out to schedule your discovery call."
              fields={[
                { label: "Name", name: "name", type: "text", required: true },
                { label: "Company", name: "company", type: "text", required: true },
                { label: "Email", name: "email", type: "email", required: true },
                { label: "Phone", name: "phone", type: "tel", required: true },
                {
                  label: "Do you currently sell to the government?",
                  name: "sellsToGovernment",
                  type: "select",
                  options: ["Yes", "No", "Not yet, but exploring it"],
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
