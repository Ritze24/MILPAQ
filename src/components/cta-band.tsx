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
    <section className="relative overflow-hidden bg-milpaq-olive-darker">
      <div className="absolute inset-0 bg-gradient-to-br from-milpaq-olive-dark/40 via-transparent to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="font-display max-w-xl text-2xl font-semibold uppercase leading-snug tracking-tight text-white sm:text-3xl">
          {title}
        </p>
        <Link
          href={ctaHref}
          className="shrink-0 rounded-sm bg-milpaq-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-milpaq-olive-darker transition-colors hover:bg-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
