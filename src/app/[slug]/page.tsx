import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { seoPages } from "@/lib/seo-pages";

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

function getPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

const heroImageByRelatedHref: Record<string, string> = {
  "/services/military-packaging": "/brand/services/svc-military-packaging.jpg",
  "/services/dcma-origin-inspection": "/brand/services/svc-dcma-inspection.jpg",
  "/workshops": "/brand/home-sections/success-readiness-training.jpg",
  "/oem-partnership": "/brand/hero-manufacturing.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return { title: page.title, description: page.intro };
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        title={page.title}
        description={page.intro}
        image={heroImageByRelatedHref[page.relatedHref]}
      />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-12 sm:px-6">
        <Link
          href={page.relatedHref}
          className="inline-block rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark"
        >
          See {page.relatedLabel} &rarr;
        </Link>
      </section>
    </>
  );
}
