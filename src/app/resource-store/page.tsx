import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Resource Store",
  description:
    "Free checklists and paid toolkits for government contractors: supplier qualification, DIBBS bid evaluation, packaging interpretation, and DCMA readiness.",
};

const freeResources = [
  "Government Contractor Startup Checklist",
  "DLA Readiness Checklist",
  "DLA Bid Tracking Spreadsheet",
  "Supplier CAGE Code Tracker",
  "Packaging Readiness Checklist",
  "Origin Inspection Readiness Checklist",
];

const toolkits = [
  { name: "Supplier Qualification Toolkit", price: "$199" },
  { name: "DIBBS Bid Evaluation Toolkit", price: "$99" },
  { name: "Packaging Interpretation Toolkit", price: "$99" },
  { name: "DCMA Readiness Toolkit", price: "$99" },
];

export default function ResourceStorePage() {
  return (
    <>
      <PageHero
        eyebrow="Resource Store"
        title="Toolkits, Checklists & Training for Government Contractors"
        description="Free resources to get started, paid toolkits to move faster, and the full Government Contracting Academy for contractors ready to go deep."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-milpaq-dark">Free Resources</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeResources.map((resource) => (
            <div key={resource} className="rounded-lg border border-milpaq-tan p-5">
              <p className="font-medium text-milpaq-dark">{resource}</p>
              <p className="mt-2 text-sm font-semibold text-milpaq-olive">FREE</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-milpaq-tan-light">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-milpaq-dark">Paid Toolkits</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {toolkits.map((toolkit) => (
              <div key={toolkit.name} className="flex items-center justify-between rounded-lg bg-white p-5 shadow-sm">
                <p className="font-medium text-milpaq-dark">{toolkit.name}</p>
                <p className="font-semibold text-milpaq-olive">{toolkit.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-lg border border-milpaq-olive bg-milpaq-olive/5 p-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-milpaq-dark">Government Contracting Academy</h2>
            <p className="mt-2 text-milpaq-dark/70">All seven workshops, delivered as video modules, PDF worksheets, templates, and checklists.</p>
          </div>
          <p className="mt-4 text-3xl font-bold text-milpaq-olive sm:mt-0">$999</p>
        </div>
        <p className="mt-6 text-sm text-milpaq-dark/70">
          Looking for ongoing support instead?{" "}
          <Link href="/services/strategic-growth-retainer" className="font-medium text-milpaq-olive underline">
            See the Strategic Growth Retainer
          </Link>
          .
        </p>
      </section>
    </>
  );
}
