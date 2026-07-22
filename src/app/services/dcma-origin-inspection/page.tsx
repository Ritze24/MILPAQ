import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "DCMA Origin Inspection Facilitation",
  description:
    "Inspection scheduling, packaging readiness review, documentation review, and inspector coordination for DCMA origin inspections at MILPAQ's facility.",
};

const services = [
  "Inspection Scheduling",
  "Packaging Readiness Review",
  "Documentation Review",
  "Corrective Action Assistance",
  "Inspector Coordination",
  "Facility Hosting",
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
        description="MILPAQ prepares your shipment for DCMA origin inspection and coordinates the inspection process at our facility."
        primaryCta={{ label: "Schedule Inspection Review", href: "/contact" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-lg border border-milpaq-tan p-5 text-sm font-medium text-milpaq-dark"
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-tan-light">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-milpaq-dark">Frequently Asked Questions</h2>
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
        </div>
      </section>

      <CtaBand
        title="Preparing for a DCMA origin inspection?"
        ctaLabel="Schedule Inspection Review"
        ctaHref="/contact"
      />
    </>
  );
}
