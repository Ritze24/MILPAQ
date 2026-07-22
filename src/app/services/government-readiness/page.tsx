import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ReadinessAssessment } from "@/components/readiness-assessment";

export const metadata: Metadata = {
  title: "Government Readiness Assessment",
  description:
    "Take the MILPAQ Government Contractor Readiness Assessment to find out whether you're Beginner, Developing, Ready, or Advanced.",
};

export default function GovernmentReadinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Government Readiness"
        title="Government Contractor Readiness Assessment"
        description="Answer seven questions to find out where you stand in your government contracting journey — and what to do next."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ReadinessAssessment />
      </section>
    </>
  );
}
