import type { Metadata } from "next";
import Image from "next/image";
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
  const { posts } = isBlogConfigured ? await getPosts() : { posts: [] };

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Government Contracting Insights"
        image="/brand/services/svc-government-readiness.jpg"
        description="Packaging, DCMA inspections, traceability, OEM partnerships, compliance, and market entry - from the team that executes these contracts."
      />

      {posts.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-lg border border-milpaq-border bg-white transition-shadow hover:shadow-md"
              >
                {post.featuredImage && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.categories[0] && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-milpaq-sage">
                      {post.categories[0].name}
                    </p>
                  )}
                  <h2
                    className="font-display mt-2 text-lg font-semibold text-milpaq-dark group-hover:text-milpaq-olive"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <div
                    className="mt-2 line-clamp-3 text-sm text-milpaq-dark/70 [&_p]:inline"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <p className="mt-4 text-xs text-milpaq-dark/50">
                    {post.author && <>{post.author} · </>}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16 sm:px-6">
          <div className="mb-10 rounded-lg border border-milpaq-tan bg-milpaq-tan-light p-6 text-sm text-milpaq-dark/80">
            The blog is not yet connected to MILPAQ&apos;s WordPress instance. Below is the
            planned content calendar by category.
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {blogCategories.map((category) => (
              <div key={category.slug} className="rounded-lg border border-milpaq-tan p-6">
                <h2 className="font-display text-lg font-semibold text-milpaq-dark">{category.name}</h2>
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
