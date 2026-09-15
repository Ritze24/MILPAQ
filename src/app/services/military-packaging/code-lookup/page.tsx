import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PackagingCodeLookup } from "@/components/packaging-code-lookup";

export const metadata: Metadata = {
  title: "MIL-STD-2073 Packaging Code Lookup",
  description:
    "Look up MIL-STD-2073-1E packaging codes — method of preservation, cushioning, containers, packing level, and special marking — and get the decoded requirement.",
};

export default function PackagingCodeLookupPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title="MIL-STD-2073 Packaging Code Lookup"
        image="/brand/services/svc-military-packaging.jpg"
        description="Enter the packaging codes from your contract or specification sheet and get the decoded requirement for each — sourced directly from MIL-STD-2073-1E, Appendix J."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <PackagingCodeLookup />

        <p className="mt-10 text-sm text-milpaq-dark/70">
          Need help preparing a shipment instead?{" "}
          <Link
            href="/services/military-packaging#quote"
            className="font-medium text-milpaq-olive hover:underline"
          >
            Request a packaging quote
          </Link>{" "}
          or{" "}
          <Link
            href="/faq#military-packaging-preservation"
            className="font-medium text-milpaq-olive hover:underline"
          >
            see military packaging FAQs
          </Link>
          .
        </p>
      </section>
    </>
  );
}
