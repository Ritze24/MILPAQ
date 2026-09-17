import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SimpleLeadForm } from "@/components/simple-lead-form";
import { BrochureDownloadForm } from "@/components/brochure-download-form";
import { company } from "@/lib/constants";
import {
  IconPhone,
  IconMapPin,
  IconCertificate,
  IconMessage,
  IconShieldCheck,
  IconBriefcase,
  IconHandshake,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact MILPAQ Solutions in Miami, FL, or download the MILPAQ company brochure.",
};

const quickLinks = [
  { icon: IconShieldCheck, label: "Frequently Asked Questions", href: "/faq" },
  { icon: IconBriefcase, label: "Resource Store", href: "/resource-store" },
  { icon: IconHandshake, label: "OEM Partnership Program", href: "/oem-partnership" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get In Touch"
        image="/brand/home-sections/success-compliance.jpg"
        description="Questions about packaging, compliance, or working with MILPAQ? Send a message or call us directly."
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-milpaq-tan text-milpaq-deep-olive">
                <IconMessage className="h-5 w-5 stroke-current fill-none" />
              </div>
              <h2 className="font-display text-lg font-semibold text-milpaq-dark">Send a Message</h2>
            </div>
            <div className="mt-6">
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
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-milpaq-border p-6">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wide text-milpaq-sage">
                {company.entityName}
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3">
                  <IconMapPin className="h-5 w-5 shrink-0 stroke-current fill-none text-milpaq-olive" />
                  <span className="text-sm text-milpaq-dark/80">
                    {company.address.line1}
                    <br />
                    {company.address.city}, {company.address.state} {company.address.zip}
                  </span>
                </li>
                <li className="flex gap-3">
                  <IconPhone className="h-5 w-5 shrink-0 stroke-current fill-none text-milpaq-olive" />
                  <a href={company.phoneHref} className="text-sm text-milpaq-dark/80 hover:text-milpaq-olive">
                    {company.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <IconCertificate className="h-5 w-5 shrink-0 stroke-current fill-none text-milpaq-olive" />
                  <span className="text-sm text-milpaq-dark/80">CAGE Code {company.cageCode}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-milpaq-tan bg-milpaq-tan-light p-6">
              <h3 className="font-display text-sm font-semibold text-milpaq-dark">Company Brochure</h3>
              <BrochureDownloadForm triggerClassName="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-milpaq-olive px-4 py-2.5 text-sm font-semibold text-white hover:bg-milpaq-olive-dark" />
            </div>

            <div className="rounded-lg border border-milpaq-border p-6">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wide text-milpaq-sage">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-3">
                {quickLinks.map(({ icon: Icon, label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 text-sm font-medium text-milpaq-dark hover:text-milpaq-olive"
                    >
                      <Icon className="h-5 w-5 shrink-0 stroke-current fill-none text-milpaq-olive" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
