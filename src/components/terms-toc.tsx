"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TermsToc({ sections }: { sections: { id: string; number: number; title: string }[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-milpaq-sage">
        On This Page
      </p>
      <ul className="mt-4 space-y-1 border-l border-milpaq-border">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                activeId === section.id
                  ? "border-milpaq-olive font-medium text-milpaq-olive"
                  : "border-transparent text-milpaq-dark/60 hover:text-milpaq-dark"
              )}
            >
              {section.number}. {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
