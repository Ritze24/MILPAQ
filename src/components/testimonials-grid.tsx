import { testimonials, type Testimonial } from "@/lib/testimonials-content";

function initials(attribution: string) {
  const role = attribution.split(",")[0] ?? attribution;
  return role
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ quote, attribution }: Testimonial) {
  return (
    <figure className="rounded-lg border border-milpaq-border bg-white p-6">
      <blockquote className="text-sm leading-relaxed text-milpaq-charcoal/80">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-milpaq-tan text-xs font-semibold text-milpaq-deep-olive">
          {initials(attribution)}
        </span>
        <span className="text-xs font-medium text-milpaq-charcoal/60">{attribution}</span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsGrid() {
  return (
    <section className="bg-milpaq-cream py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-milpaq-sage">
            What Clients Say
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight text-milpaq-charcoal sm:text-4xl">
            Trusted by Contractors &amp; Manufacturers
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.attribution} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
