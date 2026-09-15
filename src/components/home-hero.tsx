import Link from "next/link";
import { PixelImage } from "@/components/ui/pixel-image";
import { ShinyLink } from "@/components/ui/shiny-link";

type Cta = { label: string; href: string };

export function HomeHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section className="relative overflow-hidden bg-milpaq-deep-olive">
      <PixelImage
        src="/brand/hero-manufacturing.jpg"
        customGrid={{ rows: 4, cols: 6 }}
        grayscaleAnimation
        className="absolute inset-0 h-full w-full md:h-full md:w-full"
        imageClassName="absolute inset-0 h-full w-full rounded-none object-cover contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-milpaq-tan" />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-tan">
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold uppercase leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded bg-milpaq-tan px-7 py-3.5 font-display text-base font-semibold uppercase tracking-wide text-milpaq-deep-olive transition-colors hover:bg-milpaq-tan-hover"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <ShinyLink
                href={secondaryCta.href}
                shineColor="#ffffff"
                className="rounded border-2 border-white px-7 py-3.5 font-display text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-milpaq-deep-olive"
              >
                {secondaryCta.label}
              </ShinyLink>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
