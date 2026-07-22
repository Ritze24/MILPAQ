import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getPosts, isBlogConfigured } from "@/lib/wordpress";
import { blogCategories } from "@/lib/blog-categories";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Government contracting insights on military packaging, DCMA inspections, traceability, OEM partnerships, compliance, and market entry.",
};

export default async function BlogPage() {
  const posts = isBlogConfigured ? await getPosts() : [];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Government Contracting Insights"
        description="Packaging, DCMA inspections, traceability, OEM partnerships, compliance, and market entry — from the team that executes these contracts."
      />

      {posts.length > 0 ? (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="rounded-lg border border-milpaq-tan p-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-lg font-semibold text-milpaq-dark hover:text-milpaq-olive"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 rounded-lg border border-milpaq-tan bg-milpaq-tan-light p-6 text-sm text-milpaq-dark/80">
            The blog is not yet connected to MILPAQ&apos;s WordPress instance. Below is the
            planned content calendar by category.
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {blogCategories.map((category) => (
              <div key={category.slug} className="rounded-lg border border-milpaq-tan p-6">
                <h2 className="text-lg font-semibold text-milpaq-dark">{category.name}</h2>
                <ul className="mt-3 space-y-2 text-sm text-milpaq-dark/70">
                  {category.plannedTitles.map((title) => (
                    <li key={title}>{title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
