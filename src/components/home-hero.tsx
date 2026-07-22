import Image from "next/image";
import Link from "next/link";

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
      <Image
        src="/brand/hero-manufacturing.jpg"
        alt="Precision-machined aerospace components staged for MIL-STD-2073 export packaging"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30 grayscale contrast-125"
      />
      <div className="absolute inset-0 bg-milpaq-deep-olive/55" />

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
              <Link
                href={secondaryCta.href}
                className="rounded border-2 border-white px-7 py-3.5 font-display text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-milpaq-deep-olive"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
