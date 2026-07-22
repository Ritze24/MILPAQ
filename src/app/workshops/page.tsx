import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Workshops & Consulting",
  description:
    "MILPAQ's Government Contracting Academy: seven workshops covering foundations, DIBBS navigation, supplier sourcing, bid pricing, contract execution, packaging, and financing.",
};

const workshops = [
  "Government Contracting Foundations",
  "DIBBS Navigation & Opportunity Analysis",
  "Supplier Sourcing & Qualification",
  "Bid Pricing & Submission",
  "Post-Award Contract Execution",
  "Packaging, Labeling & DCMA",
  "Government Contract Financing & Growth Capital",
];

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting & Training"
        title="Government Market Introduction Session & Workshop Library"
        description="Start with a one-hour Government Market Strategy Session ($250/hr), then go deeper with the full seven-workshop Government Contracting Academy."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-milpaq-dark">Workshop Library</h2>
        <ol className="mt-6 space-y-3">
          {workshops.map((workshop, index) => (
            <li
              key={workshop}
              className="flex items-center gap-4 rounded-lg border border-milpaq-tan p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-milpaq-olive text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span className="font-medium text-milpaq-dark">{workshop}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-milpaq-dark/70">
          All seven workshops are available as the MILPAQ Government Contracting Academy bundle
          for $999. See the{" "}
          <Link href="/resource-store" className="font-medium text-milpaq-olive underline">
            Resource Store
          </Link>{" "}
          for details.
        </p>
      </section>

      <CtaBand
        title="Not sure where to start? Book a Government Market Strategy Session."
        ctaLabel="Schedule Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
