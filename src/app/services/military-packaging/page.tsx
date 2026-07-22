import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PackagingRfqForm } from "@/components/packaging-rfq-form";
import { PackagingCodeReference } from "@/components/packaging-code-reference";

export const metadata: Metadata = {
  title: "Military Packaging & Contract Execution",
  description:
    "MIL-STD-2073 military packaging, MIL-STD-129 labeling, documentation review, and DCMA origin inspection facilitation for government contract fulfillment.",
};

const services = [
  "Military Packaging (MIL-STD-2073)",
  "MIL-STD-129 Labeling & Marking",
  "Packaging Design",
  "Documentation Review",
  "Traceability Documentation Review",
  "DCMA Origin Inspection Facilitation",
  "Contract Fulfillment Support",
];

export default function MilitaryPackagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Military Packaging & Contract Execution"
        description="From packaging design through DCMA-coordinated origin inspection, MILPAQ executes the physical and documentation requirements of your government contract."
        primaryCta={{ label: "Request Packaging Quote", href: "#quote" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
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

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <h2 className="text-2xl font-bold text-milpaq-dark">Request a Packaging Quote</h2>
        <p className="mt-2 max-w-3xl text-milpaq-dark/70">
          Upload your awarded contract or solicitation and we&apos;ll review packaging and
          inspection requirements before preparing your quote.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <PackagingRfqForm />
          <PackagingCodeReference />
        </div>
      </section>
    </>
  );
}
