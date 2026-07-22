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
    <section className="bg-milpaq-dark">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6">
        <p className="max-w-xl text-2xl font-bold text-white">{title}</p>
        <Link
          href={ctaHref}
          className="shrink-0 rounded-md bg-milpaq-tan px-6 py-3 text-sm font-semibold text-milpaq-dark hover:bg-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
