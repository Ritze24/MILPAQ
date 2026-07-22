import Link from "next/link";

export function CtaBand({
  title,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="bg-milpaq-deep-olive">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="font-display max-w-xl text-2xl font-semibold uppercase leading-snug tracking-tight text-white sm:text-3xl">
          {title}
        </p>
        <Link
          href={ctaHref}
          className="shrink-0 rounded bg-milpaq-tan px-7 py-3.5 font-display text-base font-semibold uppercase tracking-wide text-milpaq-deep-olive transition-colors hover:bg-milpaq-tan-hover"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
