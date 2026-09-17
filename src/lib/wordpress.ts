// Headless WordPress client (Phase 1 blog). Points at WORDPRESS_API_URL once
// MILPAQ's WordPress instance is provisioned on Hostinger; until then every
// call resolves to empty/null so the blog routes render a "coming soon" state
// instead of failing the build.

export type WordPressPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string | null;
  featuredImage: { url: string; alt: string } | null;
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
};

export type PostsPage = {
  posts: WordPressPost[];
  totalPages: number;
};

const apiUrl = process.env.WORDPRESS_API_URL;

type RawTerm = { taxonomy: string; name: string; slug: string };

type RawMedia = { source_url: string; alt_text?: string };

type RawAuthor = { name: string };

type RawPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded?: {
    author?: RawAuthor[];
    "wp:featuredmedia"?: RawMedia[];
    "wp:term"?: RawTerm[][];
  };
};

function normalize(post: RawPost): WordPressPost {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  const categories = terms
    .filter((term) => term.taxonomy === "category")
    .map((term) => ({ name: term.name, slug: term.slug }));
  const tags = terms
    .filter((term) => term.taxonomy === "post_tag")
    .map((term) => ({ name: term.name, slug: term.slug }));

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    author: post._embedded?.author?.[0]?.name ?? null,
    featuredImage:
      media && media.source_url
        ? { url: media.source_url, alt: media.alt_text ?? "" }
        : null,
    categories,
    tags,
  };
}

export async function getPosts({
  page = 1,
  perPage = 12,
  categorySlug,
}: { page?: number; perPage?: number; categorySlug?: string } = {}): Promise<PostsPage> {
  if (!apiUrl) return { posts: [], totalPages: 0 };

  try {
    const params = new URLSearchParams({
      _embed: "1",
      page: String(page),
      per_page: String(perPage),
    });

    if (categorySlug) {
      const categoryRes = await fetch(
        `${apiUrl}/wp-json/wp/v2/categories?slug=${categorySlug}`,
        { next: { revalidate: 3600 } }
      );
      if (categoryRes.ok) {
        const matches = (await categoryRes.json()) as { id: number }[];
        if (matches[0]) params.set("categories", String(matches[0].id));
      }
    }

    const res = await fetch(`${apiUrl}/wp-json/wp/v2/posts?${params}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { posts: [], totalPages: 0 };

    const posts = (await res.json()) as RawPost[];
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
    return { posts: posts.map(normalize), totalPages };
  } catch {
    // WordPress unreachable (DNS not yet propagated, host down, etc.) — degrade
    // to the "coming soon" state instead of failing the page/build.
    return { posts: [], totalPages: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  if (!apiUrl) return null;
  try {
    const res = await fetch(`${apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed=1`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const posts = (await res.json()) as RawPost[];
    return posts[0] ? normalize(posts[0]) : null;
  } catch {
    return null;
  }
}

export const isBlogConfigured = Boolean(apiUrl);
