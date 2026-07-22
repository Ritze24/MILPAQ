import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SimpleLeadForm } from "@/components/simple-lead-form";
import { company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact MILPAQ Solutions in Miami, FL.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get In Touch" />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6">
        <div>
          <SimpleLeadForm
            submitLabel="Send Message"
            confirmationTitle="Message received"
            confirmationMessage="Thank you for reaching out. MILPAQ will respond shortly."
            fields={[
              { label: "Name", name: "name", type: "text", required: true },
              { label: "Company", name: "company", type: "text" },
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Message", name: "message", type: "textarea", required: true },
            ]}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-milpaq-dark">{company.legalName}</h2>
          <p className="mt-3 text-milpaq-dark/80">
            {company.address.line1}
            <br />
            {company.address.city}, {company.address.state} {company.address.zip}
          </p>
          <p className="mt-3 text-milpaq-dark/80">
            <a href={company.phoneHref} className="hover:text-milpaq-olive">
              {company.phone}
            </a>
          </p>
          <p className="mt-3 text-sm text-milpaq-dark/60">CAGE Code {company.cageCode}</p>
        </div>
      </section>
    </>
  );
}
