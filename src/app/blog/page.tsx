import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { getPosts, isBlogConfigured } from "@/lib/wordpress";
import { blogCategories } from "@/lib/blog-categories";

const AUTHOR_NAME = "Team MilPaq";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Government contracting insights on military packaging, DCMA inspections, traceability, OEM partnerships, compliance, and market entry.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const { category: categorySlug, tag: tagSlug } = await searchParams;
  const { posts } = isBlogConfigured
    ? await getPosts({ categorySlug, tagSlug })
    : { posts: [] };
  const activeCategory = categorySlug
    ? blogCategories.find((c) => c.slug === categorySlug)
    : undefined;
  // A tag filter takes precedence over category. Tags aren't in the static
  // category list, so take the display name from the matched posts.
  const filterLabel = tagSlug
    ? (posts[0]?.tags.find((t) => t.slug === tagSlug)?.name ?? tagSlug.replace(/-/g, " "))
    : categorySlug
      ? (activeCategory?.name ?? categorySlug)
      : undefined;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Government Contracting Insights"
        image="/brand/services/svc-government-readiness.jpg"
        description="Packaging, DCMA inspections, traceability, OEM partnerships, compliance, and market entry - from the team that executes these contracts."
      />

      {posts.length > 0 ? (
        <>
          <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-14">
            {filterLabel && (
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <p className="text-sm text-milpaq-dark/70">
                  {tagSlug ? "Showing posts tagged:" : "Showing posts in:"}{" "}
                  <span className="font-semibold text-milpaq-dark">{filterLabel}</span>
                </p>
                <Link
                  href="/blog"
                  className="rounded-full border border-milpaq-border px-3 py-1 text-xs font-medium text-milpaq-dark/70 hover:border-milpaq-olive hover:text-milpaq-olive"
                >
                  Clear filter ×
                </Link>
              </div>
            )}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group overflow-hidden rounded-lg border border-milpaq-border bg-white transition-shadow hover:shadow-md"
                >
                  {post.featuredImage && (
                    <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}
                  <div className="p-6">
                    {post.categories[0] && (
                      <Link
                        href={`/blog?category=${post.categories[0].slug}`}
                        className="inline-block text-xs font-semibold uppercase tracking-wide text-milpaq-sage hover:underline"
                      >
                        {post.categories[0].name}
                      </Link>
                    )}
                    <h3 className="font-display mt-2 text-lg font-semibold text-milpaq-dark group-hover:text-milpaq-olive">
                      <Link href={`/blog/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title }} />
                    </h3>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-2 line-clamp-3 block text-sm text-milpaq-dark/70 [&_p]:inline"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <p className="mt-4 text-xs text-milpaq-dark/50">
                      {AUTHOR_NAME} · {formatDate(post.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <CtaBand
            title="Have a packaging or compliance question we didn't cover?"
            ctaLabel="Schedule Discovery Call"
            ctaHref="/oem-partnership"
          />
        </>
      ) : filterLabel ? (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-14">
          <p className="text-sm text-milpaq-dark/70">
            {tagSlug ? "No posts found tagged" : "No posts yet in"}{" "}
            <span className="font-semibold text-milpaq-dark">{filterLabel}</span>
            .{" "}
            <Link href="/blog" className="font-medium text-milpaq-olive hover:underline">
              View all posts
            </Link>
          </p>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-14">
          <div className="grid gap-6 sm:grid-cols-2">
            {blogCategories.map((category) => (
              <div
                key={category.slug}
                className="rounded-lg border border-milpaq-border bg-white p-6 transition-shadow hover:shadow-md"
              >
                <h2 className="font-display text-lg font-semibold text-milpaq-dark">
                  {category.name}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-milpaq-dark/70">
                  {category.plannedTitles.map((title) => (
                    <li key={title} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-milpaq-tan" />
                      {title}
                    </li>
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
