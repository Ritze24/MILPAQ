import Image from "next/image";
import Link from "next/link";

type Cta = { label: string; href: string };

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  image?: string;
}) {
  if (image) {
    return (
      <section className="relative overflow-hidden bg-milpaq-deep-olive">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
          {eyebrow && (
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-milpaq-tan" />
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-tan">
                {eyebrow}
              </p>
            </div>
          )}
          <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold uppercase leading-[1.1] tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg text-white/80">{description}</p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="rounded-md bg-milpaq-tan px-6 py-3 text-sm font-semibold text-milpaq-deep-olive hover:bg-milpaq-tan-hover"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-md border-2 border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-milpaq-deep-olive"
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

  return (
    <section className="border-b border-milpaq-tan bg-milpaq-tan-light">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {eyebrow && (
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-milpaq-olive">{eyebrow}</p>
        )}
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight text-milpaq-dark sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-milpaq-dark/80">{description}</p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-md border border-milpaq-olive px-6 py-3 text-sm font-semibold text-milpaq-dark hover:bg-milpaq-tan"
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
