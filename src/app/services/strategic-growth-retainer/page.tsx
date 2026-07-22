import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SimpleLeadForm } from "@/components/simple-lead-form";

export const metadata: Metadata = {
  title: "Strategic Growth Retainer",
  description:
    "MILPAQ's Strategic Growth Retainer is an outsourced government business development team: opportunity reviews, pre/post-award support, packaging guidance, and weekly strategy calls.",
};

const inclusions = [
  "Weekly Strategy Calls",
  "Opportunity Reviews",
  "Supplier Development Guidance",
  "Pre-Award Support",
  "Post-Award Support",
  "Packaging Guidance",
  "Compliance Reviews",
];

export default function StrategicGrowthRetainerPage() {
  return (
    <>
      <PageHero
        eyebrow="$10,000/month · 90-Day Minimum"
        title="Your Outsourced Government Business Development Team"
        description="A monthly retainer for contractors who are serious about scaling government revenue — MILPAQ acts as an extension of your team."
        primaryCta={{ label: "Apply For Strategic Growth Program", href: "#book" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {inclusions.map((item) => (
            <div key={item} className="rounded-lg border border-milpaq-tan p-5 text-sm font-medium text-milpaq-dark">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className="text-2xl font-bold text-milpaq-dark">Apply For Strategic Growth Program</h2>
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
      </section>
    </>
  );
}
