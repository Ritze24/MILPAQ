import Link from "next/link";

type Cta = { label: string; href: string };

export function PageHero({
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
    <section className="border-b border-milpaq-tan bg-milpaq-tan-light">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-milpaq-olive">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-milpaq-dark sm:text-5xl">
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
