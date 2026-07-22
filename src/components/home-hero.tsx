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
    <section className="relative overflow-hidden bg-milpaq-olive-darker">
      <Image
        src="/brand/hero-manufacturing.jpg"
        alt="Precision-machined aerospace components staged for MIL-STD-2073 export packaging"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-milpaq-olive-darker via-milpaq-olive-darker/90 to-milpaq-olive-darker/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-milpaq-olive-darker/80 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-milpaq-gold" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-gold">
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
                className="rounded-sm bg-milpaq-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-milpaq-olive-darker transition-colors hover:bg-white"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-sm border border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
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
