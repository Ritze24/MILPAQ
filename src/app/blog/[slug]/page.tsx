import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { getPostBySlug, isBlogConfigured } from "@/lib/wordpress";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogConfigured) return {};
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isBlogConfigured) notFound();

  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.categories[0]?.name}
        title={post.title}
        image={post.featuredImage?.url ?? "/brand/services/svc-government-readiness.jpg"}
        description={[
          post.author,
          new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        ]
          .filter(Boolean)
          .join(" · ")}
      />

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-milpaq-olive hover:underline"
        >
          ← Back to Blog
        </Link>

        <div
          className="mt-8 space-y-5 text-milpaq-dark/90
            [&_p]:leading-relaxed
            [&_a]:font-medium [&_a]:text-milpaq-olive [&_a]:underline [&_a]:underline-offset-2
            [&_h2]:font-display [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-milpaq-dark
            [&_h3]:font-display [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-milpaq-dark
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
            [&_li]:leading-relaxed
            [&_blockquote]:border-l-4 [&_blockquote]:border-milpaq-tan [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-milpaq-dark/70
            [&_strong]:font-semibold [&_strong]:text-milpaq-dark
            [&_img]:my-6 [&_img]:rounded-lg
            [&_hr]:my-10 [&_hr]:border-milpaq-border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <CtaBand
        title="Ready to put this into practice on your next contract?"
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership"
      />
    </>
  );
}
