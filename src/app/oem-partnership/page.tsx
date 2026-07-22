import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SimpleLeadForm } from "@/components/simple-lead-form";

export const metadata: Metadata = {
  title: "OEM Partnership Program",
  description:
    "MILPAQ's OEM Partnership Program helps U.S., Canadian, and foreign manufacturers access U.S. government buyers without building an in-house contracting department.",
};

const whatWeDo = [
  "Government opportunity identification and assessment",
  "Bid preparation and packaging/compliance support",
  "DCMA origin inspection coordination",
  "Contract execution and delivery to government buyers",
];

const whoWePartnerWith = ["U.S. & Canadian Manufacturers", "Foreign Manufacturers"];

const partnershipModels = [
  {
    title: "Strategic OEM Partner",
    description: "Preferred pricing, government growth, and long-term partnership.",
  },
  {
    title: "Government Readiness Program",
    description: "A self-service path for OEMs who want to prepare on their own timeline.",
  },
];

export default function OemPartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Highest-Value Partnership Program"
        title="Turning Manufacturing Capability Into Government Opportunity"
        description="You build it. MILPAQ moves it. We become your government market access, sales channel, packaging, compliance, and contract execution partner."
        primaryCta={{ label: "Schedule Discovery Call", href: "#discovery-call" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-milpaq-dark">What We Do</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whatWeDo.map((item) => (
            <li key={item} className="rounded-lg border border-milpaq-tan p-5 text-sm font-medium text-milpaq-dark">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-milpaq-tan-light">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-milpaq-dark">Who We Partner With</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {whoWePartnerWith.map((item) => (
              <div key={item} className="rounded-lg bg-white p-6 text-center font-medium text-milpaq-dark shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-milpaq-dark">Partnership Models</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {partnershipModels.map((model) => (
            <div key={model.title} className="rounded-lg border border-milpaq-tan p-6">
              <h3 className="text-lg font-semibold text-milpaq-dark">{model.title}</h3>
              <p className="mt-2 text-sm text-milpaq-dark/70">{model.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="discovery-call" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className="text-2xl font-bold text-milpaq-dark">Schedule Discovery Call</h2>
        <div className="mt-8">
          <SimpleLeadForm
            submitLabel="Schedule Discovery Call"
            confirmationTitle="Request received"
            confirmationMessage="MILPAQ will reach out to schedule your discovery call."
            fields={[
              { label: "Name", name: "name", type: "text", required: true },
              { label: "Company", name: "company", type: "text", required: true },
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Phone", name: "phone", type: "tel", required: true },
              {
                label: "Do you currently sell to the government?",
                name: "sellsToGovernment",
                type: "select",
                options: ["Yes", "No", "Not yet, but exploring it"],
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
