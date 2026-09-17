import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { IconGlobe, IconDocument, IconTarget, IconCertificate, IconMessage } from "@/components/icons";

export const metadata: Metadata = {
  title: "Government Infrastructure Services",
  description:
    "Contractor websites, capability statements, CRM setup, proposal templates, and marketing assets - powered by MILPAQ and strategic partners.",
};

const services = [
  {
    icon: IconGlobe,
    title: "Government Contractor Websites",
    description: "A professional web presence built to signal credibility to government buyers.",
  },
  {
    icon: IconDocument,
    title: "Capability Statements",
    description: "The one-page document every contracting officer expects to see.",
  },
  {
    icon: IconTarget,
    title: "CRM Setup",
    description: "A pipeline system to track opportunities, bids, and awards in one place.",
  },
  {
    icon: IconCertificate,
    title: "Proposal Templates",
    description: "Reusable templates that keep your proposals consistent and compliant.",
  },
  {
    icon: IconMessage,
    title: "Marketing Assets",
    description: "Collateral and messaging that positions you as a serious supplier.",
  },
];

export default function GovernmentInfrastructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Powered By MILPAQ + Strategic Partners"
        title="Government Infrastructure Services"
        image="/brand/services/svc-infrastructure-hero.jpg"
        description="The digital and business infrastructure contractors need to look and operate like a serious government supplier."
        primaryCta={{ label: "Request Infrastructure Review", href: "/contact" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            What We Deliver
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            Look And Operate Like A Serious Supplier
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-milpaq-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <Icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-4 text-lg font-semibold text-milpaq-dark">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-milpaq-dark/70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Need a capability statement, CRM, or website that matches your contracting ambitions?"
        ctaLabel="Request Infrastructure Review"
        ctaHref="/contact"
      />
    </>
  );
}
