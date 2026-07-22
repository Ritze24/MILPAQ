import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Government Infrastructure Services",
  description:
    "Contractor websites, capability statements, CRM setup, proposal templates, and marketing assets — powered by MILPAQ and strategic partners.",
};

const services = [
  "Government Contractor Websites",
  "Capability Statements",
  "CRM Setup",
  "Proposal Templates",
  "Marketing Assets",
];

export default function GovernmentInfrastructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Powered By MILPAQ + Strategic Partners"
        title="Government Infrastructure Services"
        description="The digital and business infrastructure contractors need to look and operate like a serious government supplier."
        primaryCta={{ label: "Request Infrastructure Review", href: "/contact" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="rounded-lg border border-milpaq-tan p-5 text-sm font-medium text-milpaq-dark">
              {service}
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
