import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SimpleLeadForm } from "@/components/simple-lead-form";
import {
  IconMessage,
  IconTarget,
  IconFactory,
  IconDocument,
  IconHandshake,
  IconShieldCheck,
  IconCertificate,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Strategic Growth Retainer",
  description:
    "MILPAQ's Strategic Growth Retainer is an outsourced government business development team: opportunity reviews, pre/post-award support, packaging guidance, and weekly strategy calls.",
};

const featuredInclusion = {
  icon: IconMessage,
  image: "/brand/home-sections/hwh-strategic-growth.jpg",
  title: "Weekly Strategy Calls",
  description:
    "A standing weekly call with your MILPAQ team - pipeline review, priorities, and next steps.",
};

const inclusions = [
  {
    icon: IconTarget,
    image: "/brand/home-sections/hwh-market-access.jpg",
    title: "Opportunity Reviews",
    description: "New solicitations screened and scored against your capability.",
  },
  {
    icon: IconFactory,
    image: "/brand/home-sections/wwh-oem-manufacturers.jpg",
    title: "Supplier Development Guidance",
    description: "Sourcing and qualifying suppliers to meet contract requirements.",
  },
  {
    icon: IconDocument,
    image: "/brand/home-sections/success-readiness-training.jpg",
    title: "Pre-Award Support",
    description: "Bid strategy, pricing input, and proposal readiness before you submit.",
  },
  {
    icon: IconHandshake,
    image: "/brand/home-sections/hwh-contract-execution.jpg",
    title: "Post-Award Support",
    description: "Execution guidance from award through delivery and closeout.",
  },
  {
    icon: IconShieldCheck,
    image: "/brand/home-sections/hwh-packaging-compliance.jpg",
    title: "Packaging Guidance",
    description: "MIL-STD packaging and labeling questions answered as they come up.",
  },
  {
    icon: IconCertificate,
    image: "/brand/home-sections/success-compliance.jpg",
    title: "Compliance Reviews",
    description: "Ongoing checks against contract, registration, and certification requirements.",
  },
];

export default function StrategicGrowthRetainerPage() {
  return (
    <>
      <PageHero
        eyebrow="$10,000/month · 90-Day Minimum"
        title="Your Outsourced Government Business Development Team"
        image="/brand/services/svc-strategic-growth.jpg"
        description="A monthly retainer for contractors who are serious about scaling government revenue - MILPAQ acts as an extension of your team."
        primaryCta={{ label: "Apply For Strategic Growth Program", href: "#book" }}
        secondaryCta={{ label: "See What's Included", href: "#included" }}
      />

      <section id="included" className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            What&apos;s Included
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            An Extension Of Your Team
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="group relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-lg lg:min-h-full">
            <Image
              src={featuredInclusion.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
            <div className="relative p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <featuredInclusion.icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold uppercase leading-tight tracking-wide text-white">
                {featuredInclusion.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                {featuredInclusion.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {inclusions.map(({ icon: Icon, image, title, description }) => (
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

        <p className="mt-8 text-sm text-milpaq-dark/70">
          <Link href="/faq#consulting-training" className="font-medium text-milpaq-olive hover:underline">
            See what&apos;s included in the Strategic Advisory Retainer FAQ
          </Link>
        </p>
      </section>

      <section id="book" className="bg-milpaq-cream py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Apply
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold text-milpaq-dark">
            Apply For Strategic Growth Program
          </h2>
          <div className="mt-8">
            <SimpleLeadForm
              submitLabel="Apply Now"
              confirmationTitle="Application received"
              confirmationMessage="MILPAQ will review your application and follow up to schedule a discovery call."
              fields={[
                { label: "Company Name", name: "companyName", type: "text", required: true },
                { label: "Contact Name", name: "contactName", type: "text", required: true },
                { label: "Email", name: "email", type: "email", required: true },
                { label: "Phone", name: "phone", type: "tel", required: true },
                { label: "Tell us about your government contracting goals", name: "message", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
