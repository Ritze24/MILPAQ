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
};

const apiUrl = process.env.WORDPRESS_API_URL;

type RawPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
};

function normalize(post: RawPost): WordPressPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
  };
}

export async function getPosts(): Promise<WordPressPost[]> {
  if (!apiUrl) return [];
  const res = await fetch(`${apiUrl}/wp-json/wp/v2/posts?_embed`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const posts = (await res.json()) as RawPost[];
  return posts.map(normalize);
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  if (!apiUrl) return null;
  const res = await fetch(`${apiUrl}/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const posts = (await res.json()) as RawPost[];
  return posts[0] ? normalize(posts[0]) : null;
}

export const isBlogConfigured = Boolean(apiUrl);
