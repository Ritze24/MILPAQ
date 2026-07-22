import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { credentials } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About MILPAQ",
  description:
    "MILPAQ Solutions is the government contracting and compliance division of 305 Aero Supplies LLC, helping manufacturers execute on U.S. government contracts.",
};

const coreValues = ["Reliability", "Integrity", "Execution", "Professionalism", "Customer Service"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MILPAQ"
        title="Consulting Is One Service. Execution Is The Business."
        description="MILPAQ Solutions is the government contracting and compliance division of 305 Aero Supplies LLC — bridging the gap between manufacturers, suppliers, and government customers."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-milpaq-dark">Mission</h2>
            <p className="mt-3 text-milpaq-dark/80">
              Bridge the gap between manufacturers, suppliers, and government customers.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-milpaq-dark">Vision</h2>
            <p className="mt-3 text-milpaq-dark/80">
              Become the most trusted government compliance and execution partner.
            </p>
          </div>
        </div>

        <h2 className="mt-16 text-xl font-bold text-milpaq-dark">Core Values</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {coreValues.map((value) => (
            <span
              key={value}
              className="rounded-full border border-milpaq-olive px-4 py-2 text-sm font-medium text-milpaq-dark"
            >
              {value}
            </span>
          ))}
        </div>

        <h2 className="mt-16 text-xl font-bold text-milpaq-dark">Credentials</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {credentials.map((credential) => (
            <span
              key={credential}
              className="rounded-full bg-milpaq-tan-light px-4 py-2 text-sm font-medium text-milpaq-dark"
            >
              {credential}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
