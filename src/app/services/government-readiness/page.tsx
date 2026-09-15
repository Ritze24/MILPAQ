import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ReadinessAssessment } from "@/components/readiness-assessment";
import {
  IconCertificate,
  IconGlobe,
  IconDocument,
  IconShieldStar,
  IconBank,
  IconFactory,
  IconShieldCheck,
  IconTrendingUp,
  IconHandshake,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Government Readiness Assessment",
  description:
    "Take the MILPAQ Government Contractor Readiness Assessment to find out whether you're Beginner, Developing, Ready, or Advanced.",
};

const topics = [
  { icon: IconCertificate, title: "Government Registrations" },
  { icon: IconGlobe, title: "DIBBS" },
  { icon: IconDocument, title: "PIEE" },
  { icon: IconShieldStar, title: "VSM" },
  { icon: IconBank, title: "WAWF" },
  { icon: IconFactory, title: "Packaging" },
  { icon: IconShieldCheck, title: "Traceability" },
  { icon: IconTrendingUp, title: "Government Market Strategy" },
  { icon: IconHandshake, title: "Supplier Development" },
];

export default function GovernmentReadinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Government Readiness"
        title="Government Contractor Readiness Assessment"
        image="/brand/services/svc-government-readiness.jpg"
        description="Answer seven questions to find out where you stand in your government contracting journey — and what to do next."
        primaryCta={{ label: "Take the Assessment", href: "#assessment" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Workshop Topics
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-milpaq-dark sm:text-4xl">
            What the Readiness Workshop Covers
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {topics.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="rounded-lg border border-milpaq-border bg-white p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <Icon className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h3 className="font-display mt-3 text-sm font-semibold text-milpaq-dark">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-deep-olive">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/brand/home-sections/success-readiness-training.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-tan">
              Why It Matters
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
              Know Where You Stand Before You Bid
            </h2>
            <p className="mt-4 text-white/80">
              Most contractors lose time and money bidding before they&apos;re actually ready.
              MILPAQ&apos;s readiness process gives you an honest picture of your registrations,
              packaging, and compliance posture — so your first bids aren&apos;t your learning
              curve.
            </p>
          </div>
        </div>
      </section>

      <section id="assessment" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            Take The Assessment
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold text-milpaq-dark">
            Where Do You Stand?
          </h2>
        </div>
        <div className="mt-8">
          <ReadinessAssessment />
        </div>
        <p className="mt-8 text-sm text-milpaq-dark/70">
          Curious what the Government Readiness Workshop covers?{" "}
          <Link href="/faq#consulting-training" className="font-medium text-milpaq-olive hover:underline">
            Read the FAQ
          </Link>
          .
        </p>
      </section>
    </>
  );
}
