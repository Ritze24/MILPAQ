"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ServiceExplorerItem = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export function ServicesExplorer({ services }: { services: ServiceExplorerItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const collapsedWidth = 60 / (services.length - 1);

  return (
    <>
      {/* lg+: interactive expanding panels */}
      <div className="hidden lg:flex lg:h-[30rem] lg:gap-2">
        {services.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={service.href}
              style={{ width: isActive ? "40%" : `${collapsedWidth}%` }}
              onMouseEnter={() => setActiveIndex(index)}
              className="group relative h-full overflow-hidden rounded-lg transition-[width] duration-500 ease-in-out"
            >
              <Image
                src={service.image}
                alt=""
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  isActive
                    ? "bg-gradient-to-t from-black/85 via-black/30 to-black/10"
                    : "bg-black/40"
                )}
              />

              {isActive ? (
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-milpaq-tan">
                    {service.eyebrow}
                  </span>
                  <h3 className="font-display mt-2 text-2xl font-semibold uppercase leading-tight tracking-wide text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-5 inline-block w-fit border border-white/40 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-milpaq-tan hover:text-milpaq-tan"
                  >
                    {service.cta}
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${service.title}`}
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-between p-5"
                >
                  <span className="font-display text-sm font-semibold text-milpaq-tan [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display max-h-full [writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-lg font-semibold uppercase tracking-wide text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                    {service.title}
                  </span>
                  <span aria-hidden className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Below lg: stacked cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group relative flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-lg"
          >
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
            <div className="relative p-6">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-milpaq-tan">
                {service.eyebrow}
              </p>
              <h3 className="font-display mt-2 text-lg font-semibold uppercase leading-tight tracking-wide text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{service.description}</p>
              <span className="mt-5 inline-block border border-white/40 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-white">
                {service.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
