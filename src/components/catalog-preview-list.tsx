"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import {
  IconShieldCheck,
  IconBriefcase,
  IconTarget,
  IconFactory,
  IconTrendingUp,
} from "@/components/icons";

type CatalogItem = {
  name: string;
  category: string;
  badge: string;
  icon: typeof IconShieldCheck;
  colorClass: string;
};

const catalogItems: CatalogItem[] = [
  {
    name: "Government Contractor Startup Checklist",
    category: "Free Resource",
    badge: "FREE",
    icon: IconShieldCheck,
    colorClass: "bg-milpaq-olive text-white",
  },
  {
    name: "DLA Readiness Checklist",
    category: "Free Resource",
    badge: "FREE",
    icon: IconShieldCheck,
    colorClass: "bg-milpaq-olive text-white",
  },
  {
    name: "Supplier Qualification Toolkit",
    category: "Toolkit",
    badge: "$199",
    icon: IconBriefcase,
    colorClass: "bg-milpaq-tan text-milpaq-deep-olive",
  },
  {
    name: "DIBBS Bid Evaluation Toolkit",
    category: "Toolkit",
    badge: "$99",
    icon: IconBriefcase,
    colorClass: "bg-milpaq-tan text-milpaq-deep-olive",
  },
  {
    name: "Packaging Interpretation Toolkit",
    category: "Toolkit",
    badge: "$99",
    icon: IconBriefcase,
    colorClass: "bg-milpaq-tan text-milpaq-deep-olive",
  },
  {
    name: "Government Contracting Foundations",
    category: "Workshop 1 of 7",
    badge: "In Academy",
    icon: IconTarget,
    colorClass: "bg-milpaq-sage text-white",
  },
  {
    name: "Packaging, Labeling & DCMA",
    category: "Workshop 6 of 7",
    badge: "In Academy",
    icon: IconTarget,
    colorClass: "bg-milpaq-sage text-white",
  },
  {
    name: "MILPAQ Government Contracting Academy",
    category: "All 7 Workshops",
    badge: "$999",
    icon: IconTarget,
    colorClass: "bg-milpaq-deep-olive text-white",
  },
  {
    name: "Implementation Services",
    category: "Packaging, Labeling & Compliance",
    badge: "Custom Quote",
    icon: IconFactory,
    colorClass: "bg-milpaq-deep-olive text-white",
  },
  {
    name: "Strategic Growth Retainer",
    category: "90-Day Minimum",
    badge: "$10,000/mo",
    icon: IconTrendingUp,
    colorClass: "bg-milpaq-deep-olive text-white",
  },
];

function CatalogCard({ name, category, badge, icon: Icon, colorClass }: CatalogItem) {
  return (
    <figure className="mx-auto w-full max-w-md rounded-lg border border-milpaq-tan bg-white p-4 [box-shadow:0_2px_8px_rgba(43,56,16,0.06)]">
      <div className="flex flex-row items-center gap-3">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", colorClass)}>
          <Icon className="h-5 w-5 stroke-current fill-none" />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <figcaption className="flex items-baseline justify-between gap-2">
            <span className="truncate text-sm font-semibold text-milpaq-charcoal">{name}</span>
            <span className="shrink-0 text-xs font-semibold text-milpaq-olive">{badge}</span>
          </figcaption>
          <p className="text-xs text-milpaq-charcoal/50">{category}</p>
        </div>
      </div>
    </figure>
  );
}

export function CatalogPreviewList({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex h-[440px] w-full flex-col overflow-hidden", className)}>
      <AnimatedList delay={900}>
        {catalogItems.map((item) => (
          <CatalogCard key={item.name} {...item} />
        ))}
      </AnimatedList>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-milpaq-cream" />
    </div>
  );
}
