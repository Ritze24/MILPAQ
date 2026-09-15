import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TermsToc } from "@/components/terms-toc";
import { accessibilitySections, accessibilityVersion, accessibilityEffectiveDate } from "@/lib/accessibility-content";
import { company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "MILPAQ Solutions' commitment to web accessibility, our WCAG 2.1 AA conformance efforts, and how to report accessibility issues.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility"
        image="/brand/services/svc-strategic-growth.jpg"
        description={`Version ${accessibilityVersion} — Effective ${accessibilityEffectiveDate}`}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <TermsToc sections={accessibilitySections} />
          </aside>

          <div className="max-w-2xl space-y-14">
            {accessibilitySections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-display text-xl font-bold text-milpaq-dark">
                  {section.number}. {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.blocks.map((block, index) =>
                    block.type === "p" ? (
                      <p key={index} className="text-milpaq-dark/80">
                        {block.text}
                      </p>
                    ) : (
                      <ul key={index} className="list-disc space-y-1.5 pl-5 text-milpaq-dark/80">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </div>
            ))}

            <div className="border-t border-milpaq-border pt-8 text-sm text-milpaq-dark/60">
              <p>
                Encountered an accessibility barrier? Contact {company.legalName} at{" "}
                <a href={company.phoneHref} className="font-medium text-milpaq-olive hover:underline">
                  {company.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
