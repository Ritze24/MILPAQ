import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
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

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div
          className="space-y-4 text-milpaq-dark/90 [&_a]:text-milpaq-olive [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-milpaq-dark"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </>
  );
}
