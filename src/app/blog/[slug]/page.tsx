import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { CopyLinkButton } from "@/components/copy-link-button";
import {
  IconClock,
  IconUser,
  IconTag,
  IconMail,
  IconLinkedIn,
  IconTwitterX,
  IconFacebook,
} from "@/components/icons";
import { getPostBySlug, getPosts, isBlogConfigured, type WordPressPost } from "@/lib/wordpress";

const AUTHOR_NAME = "Team MilPaq";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milpaq.com";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(html: string) {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

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

  const minutes = readingTime(post.content);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title.replace(/<[^>]+>/g, ""));

  let related: WordPressPost[] = [];
  const primaryCategory = post.categories[0];
  if (primaryCategory) {
    const { posts } = await getPosts({ categorySlug: primaryCategory.slug, perPage: 4 });
    related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  }

  return (
    <>
      <PageHero
        eyebrow={primaryCategory?.name}
        title={post.title}
        image={post.featuredImage?.url ?? "/brand/services/svc-government-readiness.jpg"}
      />

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-milpaq-olive hover:underline"
        >
          ← Back to Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-milpaq-border py-4 text-sm text-milpaq-dark/70">
          <span className="inline-flex items-center gap-1.5">
            <IconUser className="h-4 w-4 stroke-current fill-none" />
            {AUTHOR_NAME}
          </span>
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="h-4 w-4 stroke-current fill-none" />
            {minutes} min read
          </span>
          {primaryCategory && (
            <Link
              href={`/blog?category=${primaryCategory.slug}`}
              className="rounded-full bg-milpaq-tan-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-milpaq-olive hover:bg-milpaq-tan"
            >
              {primaryCategory.name}
            </Link>
          )}
        </div>

        {post.featuredImage && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

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

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-milpaq-border pt-6">
            <IconTag className="h-4 w-4 stroke-current fill-none text-milpaq-dark/50" />
            {post.tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog?tag=${encodeURIComponent(tag.slug)}`}
                className="rounded-full border border-milpaq-border px-3 py-1 text-xs font-medium text-milpaq-dark/70 hover:border-milpaq-olive hover:text-milpaq-olive"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-milpaq-border pt-6">
          <span className="text-sm font-medium text-milpaq-dark/70">Share this article:</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-milpaq-border text-milpaq-dark/70 hover:border-milpaq-olive hover:text-milpaq-olive"
          >
            <IconLinkedIn className="h-4 w-4 stroke-current fill-none" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-milpaq-border text-milpaq-dark/70 hover:border-milpaq-olive hover:text-milpaq-olive"
          >
            <IconTwitterX className="h-4 w-4 stroke-current fill-none" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-milpaq-border text-milpaq-dark/70 hover:border-milpaq-olive hover:text-milpaq-olive"
          >
            <IconFacebook className="h-4 w-4 stroke-current fill-none" />
          </a>
          <a
            href={`mailto:?subject=${shareText}&body=${encodeURIComponent(postUrl)}`}
            aria-label="Share by email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-milpaq-border text-milpaq-dark/70 hover:border-milpaq-olive hover:text-milpaq-olive"
          >
            <IconMail className="h-4 w-4 stroke-current fill-none" />
          </a>
          <CopyLinkButton url={postUrl} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-milpaq-border bg-milpaq-tan-light/40">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-14">
            <h2 className="font-display text-2xl font-bold text-milpaq-dark">Related Blogs</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <div
                  key={r.id}
                  className="group overflow-hidden rounded-lg border border-milpaq-border bg-white transition-shadow hover:shadow-md"
                >
                  {r.featuredImage && (
                    <Link href={`/blog/${r.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={r.featuredImage.url}
                        alt={r.featuredImage.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}
                  <div className="p-6">
                    {r.categories[0] && (
                      <Link
                        href={`/blog?category=${r.categories[0].slug}`}
                        className="inline-block text-xs font-semibold uppercase tracking-wide text-milpaq-sage hover:underline"
                      >
                        {r.categories[0].name}
                      </Link>
                    )}
                    <h3 className="font-display mt-2 text-lg font-semibold text-milpaq-dark group-hover:text-milpaq-olive">
                      <Link href={`/blog/${r.slug}`} dangerouslySetInnerHTML={{ __html: r.title }} />
                    </h3>
                    <p className="mt-4 text-xs text-milpaq-dark/50">
                      {AUTHOR_NAME} · {formatDate(r.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Ready to put this into practice on your next contract?"
        ctaLabel="Schedule Discovery Call"
        ctaHref="/oem-partnership"
      />
    </>
  );
}
