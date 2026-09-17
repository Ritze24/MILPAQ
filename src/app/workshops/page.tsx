import type { Metadata } from "next";
import Image from "next/image";
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
        image="/brand/home-sections/success-readiness-training.jpg"
        description="Start with a one-hour Government Market Strategy Session ($250/hr), then go deeper with the full seven-workshop Government Contracting Academy."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
              Curriculum
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
              Workshop Library
            </h2>
            <ol className="mt-8 space-y-3">
              {workshops.map((workshop, index) => (
                <li
                  key={workshop}
                  className="flex items-center gap-4 rounded-lg border border-milpaq-border bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-milpaq-tan text-sm font-semibold text-milpaq-deep-olive">
                    {index + 1}
                  </span>
                  <span className="font-medium text-milpaq-dark">{workshop}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-milpaq-dark/70">
              All seven workshops are available as the MILPAQ Government Contracting Academy
              bundle for $999. See the{" "}
              <Link href="/resource-store" className="font-medium text-milpaq-olive underline">
                Resource Store
              </Link>{" "}
              for details, or check the{" "}
              <Link href="/faq#consulting-training" className="font-medium text-milpaq-olive underline">
                Consulting &amp; Training FAQs
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src="/brand/home-sections/hwh-market-access.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 20rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-lg border border-milpaq-tan bg-milpaq-tan-light p-6 text-center">
              <p className="font-display text-3xl font-bold text-milpaq-dark">$999</p>
              <p className="mt-1 text-sm text-milpaq-dark/70">
                Full 7-workshop Government Contracting Academy bundle
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-milpaq-cream">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16 sm:px-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-milpaq-sage">
              Want Ongoing Support Instead?
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-milpaq-dark">Strategic Growth Retainer</h2>
            <p className="mt-2 max-w-xl text-milpaq-dark/70">
              A $10,000/month outsourced government business development team - weekly strategy
              calls, opportunity reviews, and contract execution guidance instead of a one-time
              workshop.
            </p>
          </div>
          <Link
            href="/services/strategic-growth-retainer"
            className="mt-6 inline-block shrink-0 rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark sm:mt-0"
          >
            See Retainer Details
          </Link>
        </div>
      </section>

      <CtaBand
        title="Not sure where to start? Book a Government Market Strategy Session."
        ctaLabel="Schedule Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
