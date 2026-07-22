import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants";
import { seoPages } from "@/lib/seo-pages";

const corePaths = [
  "",
  "/services/military-packaging",
  "/services/dcma-origin-inspection",
  "/services/government-readiness",
  "/services/strategic-growth-retainer",
  "/services/government-infrastructure",
  "/oem-partnership",
  "/workshops",
  "/resource-store",
  "/about",
  "/contact",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...corePaths, ...seoPages.map((page) => `/${page.slug}`)];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
