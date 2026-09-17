import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { faqCategories } from "@/lib/faq-content";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about MILPAQ's military packaging, DCMA inspection support, traceability review, OEM partnerships, consulting, and compliance services.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        image="/brand/home-sections/hwh-market-access.jpg"
        description="Answers on packaging, DCMA inspections, traceability, OEM partnerships, consulting, and compliance."
      />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-16 sm:px-6">
        <nav aria-label="FAQ categories" className="flex flex-wrap gap-2 border-b border-milpaq-border pb-10">
          {faqCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-milpaq-tan px-4 py-1.5 text-sm font-medium text-milpaq-dark hover:bg-milpaq-tan-light"
            >
              {category.title}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {faqCategories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold text-milpaq-dark">{category.title}</h2>
              <div className="mt-6 space-y-4">
                {category.items.map((item) => (
                  <details
                    key={item.question}
                    className="rounded-lg border border-milpaq-tan bg-white p-5"
                  >
                    <summary className="cursor-pointer font-medium text-milpaq-dark">
                      {item.question}
                    </summary>
                    <div className="mt-3 space-y-2 text-sm text-milpaq-dark/70">
                      {item.blocks.map((block, index) =>
                        block.type === "p" ? (
                          <p key={index}>{block.text}</p>
                        ) : (
                          <ul key={index} className="list-disc space-y-1 pl-5">
                            {block.items.map((listItem) => (
                              <li key={listItem}>{listItem}</li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 border-t border-milpaq-border pt-8 text-sm text-milpaq-dark/60">
          Don&apos;t see your question here?{" "}
          <Link href="/contact" className="font-medium text-milpaq-olive hover:underline">
            Contact MILPAQ
          </Link>{" "}
          directly.
        </p>
      </section>

      <CtaBand
        title="Ready to talk through your packaging or compliance project?"
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership"
      />
    </>
  );
}
