import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { CatalogPreviewList } from "@/components/catalog-preview-list";
import {
  IconShieldCheck,
  IconBriefcase,
  IconTarget,
  IconFactory,
  IconTrendingUp,
  IconHandshake,
} from "@/components/icons";
import {
  freeResourceCategories,
  toolkits,
  workshopsDetailed,
  implementationServices,
  retainerIncludes,
  oemPartnership,
  type ResourceItem,
} from "@/lib/resource-store-content";

export const metadata: Metadata = {
  title: "Resource Store",
  description:
    "Free checklists, paid toolkits, workshops, and implementation services for government contractors: supplier qualification, DIBBS bid evaluation, packaging interpretation, and DCMA readiness.",
};

function ResourceCard({ item, ctaLabel }: { item: ResourceItem; ctaLabel: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-milpaq-tan bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-medium text-milpaq-dark">{item.name}</h3>
        <span
          className={
            item.price === "FREE"
              ? "shrink-0 rounded-full bg-milpaq-olive/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-milpaq-olive"
              : "shrink-0 text-lg font-bold text-milpaq-olive"
          }
        >
          {item.price}
        </span>
      </div>
      {item.note && <p className="mt-2 text-xs italic text-milpaq-dark/50">{item.note}</p>}
      {item.includes && (
        <ul className="mt-4 space-y-1.5 text-sm text-milpaq-dark/70">
          {item.includes.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-milpaq-tan-hover">–</span>
              {line}
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/contact"
        className="mt-6 inline-block text-sm font-semibold text-milpaq-olive hover:underline"
      >
        {ctaLabel} →
      </Link>
    </div>
  );
}

export default function ResourceStorePage() {
  return (
    <>
      <PageHero
        eyebrow="Resource Store"
        title="Toolkits, Checklists & Training for Government Contractors"
        image="/brand/services/svc-resource-store.jpg"
        description="MILPAQ isn't a course company — these are the same checklists, templates, and workshops we use inside our own client engagements, made available directly."
      />

      <section className="border-b border-milpaq-border bg-milpaq-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-milpaq-olive">
              Everything In One Place
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-milpaq-dark">One Store, Every Stage of Readiness</h2>
            <p className="mt-4 max-w-md text-milpaq-dark/70">
              From your first CAGE Code to a fully outsourced government contracting team — free
              checklists, paid toolkits, workshops, implementation services, and the Strategic
              Growth Retainer all live here.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-3xl font-bold text-milpaq-olive">6</dt>
                <dd className="text-sm text-milpaq-dark/60">Free resources</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-milpaq-olive">4</dt>
                <dd className="text-sm text-milpaq-dark/60">Paid toolkits</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-milpaq-olive">7</dt>
                <dd className="text-sm text-milpaq-dark/60">Workshops</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-milpaq-olive">10+</dt>
                <dd className="text-sm text-milpaq-dark/60">Implementation services</dd>
              </div>
            </dl>
          </div>
          <CatalogPreviewList />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
            <IconShieldCheck className="h-5 w-5 stroke-current fill-none" />
          </div>
          <h2 className="font-display text-2xl font-bold text-milpaq-dark">Free Resources</h2>
        </div>
        <div className="mt-8 space-y-10">
          {freeResourceCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-display text-lg font-semibold text-milpaq-dark">{category.name}</h3>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((resource) => (
                  <ResourceCard key={resource.name} item={resource} ctaLabel="Request Access" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-tan-light">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-deep-olive text-milpaq-tan">
              <IconBriefcase className="h-5 w-5 stroke-current fill-none" />
            </div>
            <h2 className="font-display text-2xl font-bold text-milpaq-dark">Paid Toolkits</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {toolkits.map((toolkit) => (
              <ResourceCard key={toolkit.name} item={toolkit} ctaLabel="Inquire About This Toolkit" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
            <IconTarget className="h-5 w-5 stroke-current fill-none" />
          </div>
          <h2 className="font-display text-2xl font-bold text-milpaq-dark">Workshops &amp; Academy</h2>
        </div>
        <p className="mt-4 max-w-2xl text-milpaq-dark/70">
          Seven workshops covering the full lifecycle of government contracting — from first
          registration through post-award execution and growth capital.
        </p>

        <ol className="mt-8 space-y-4">
          {workshopsDetailed.map((workshop, index) => (
            <li key={workshop.title} className="rounded-lg border border-milpaq-tan p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-milpaq-olive text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display font-medium text-milpaq-dark">{workshop.title}</h3>
                  <p className="mt-2 text-sm text-milpaq-dark/60">{workshop.topics.join(" · ")}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-lg border border-milpaq-olive bg-milpaq-olive/5 p-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-milpaq-olive">Academy Bundle</p>
            <h3 className="font-display mt-1 text-2xl font-bold text-milpaq-dark">MILPAQ Government Contracting Academy</h3>
            <p className="mt-2 max-w-xl text-milpaq-dark/70">
              All seven workshops, delivered as video modules, PDF worksheets, templates, and
              checklists.
            </p>
          </div>
          <div className="mt-6 shrink-0 sm:mt-0 sm:text-right">
            <p className="text-3xl font-bold text-milpaq-olive">$999</p>
            <Link href="/contact" className="mt-2 inline-block text-sm font-semibold text-milpaq-olive hover:underline">
              Enroll in the Academy →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-sm text-milpaq-dark/70">
          See the full{" "}
          <Link href="/workshops" className="font-medium text-milpaq-olive underline">
            Workshops &amp; Consulting
          </Link>{" "}
          page, or browse the{" "}
          <Link href="/faq#consulting-training" className="font-medium text-milpaq-olive underline">
            Consulting &amp; Training FAQs
          </Link>
          .
        </p>
      </section>

      <section className="bg-milpaq-tan-light">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-deep-olive text-milpaq-tan">
              <IconFactory className="h-5 w-5 stroke-current fill-none" />
            </div>
            <h2 className="font-display text-2xl font-bold text-milpaq-dark">Implementation Services</h2>
          </div>
          <p className="mt-4 max-w-2xl text-milpaq-dark/70">
            When you&apos;d rather MILPAQ execute directly — packaging, systems, compliance readiness,
            and contractor infrastructure, priced per engagement.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {implementationServices.map((service) => (
              <div
                key={service}
                className="rounded-lg border border-milpaq-tan bg-white p-4 text-sm font-medium text-milpaq-dark"
              >
                {service}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-lg font-bold text-milpaq-olive">Custom Quote</span>
            <Link href="/contact" className="text-sm font-semibold text-milpaq-olive hover:underline">
              Request Implementation Quote →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-milpaq-deep-olive">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-lg border-t-2 border-milpaq-tan bg-white/8 p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <IconTrendingUp className="h-5 w-5 stroke-current fill-none" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-milpaq-tan">
                90-Day Minimum
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-white">Strategic Growth Retainer</h2>
              <p className="mt-2 text-2xl font-bold text-milpaq-tan">$10,000/month</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-white/70">
                {retainerIncludes.map((item) => (
                  <li key={item}>– {item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/60">
                MILPAQ acts as an extension of your government contracting team.
              </p>
              <Link
                href="/services/strategic-growth-retainer"
                className="mt-6 inline-block rounded bg-milpaq-tan px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-milpaq-deep-olive hover:bg-milpaq-tan-hover"
              >
                View Retainer Details
              </Link>
            </div>

            <div className="rounded-lg border-t-2 border-milpaq-tan bg-white/8 p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <IconHandshake className="h-5 w-5 stroke-current fill-none" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-milpaq-tan">
                Application Only
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-white">OEM Partnership Program</h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/50">Ideal For</p>
              <p className="mt-1 text-sm text-white/70">{oemPartnership.idealFor.join(" · ")}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/50">
                MILPAQ Provides
              </p>
              <p className="mt-1 text-sm text-white/70">{oemPartnership.milpaqProvides.join(" · ")}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/50">
                Manufacturer Provides
              </p>
              <p className="mt-1 text-sm text-white/70">{oemPartnership.manufacturerProvides.join(" · ")}</p>
              <Link
                href="/oem-partnership"
                className="mt-6 inline-block rounded border-2 border-milpaq-tan px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-milpaq-tan hover:bg-milpaq-tan hover:text-milpaq-deep-olive"
              >
                Apply for Partnership
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure what fits? Talk it through with MILPAQ first."
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership"
      />
    </>
  );
}
