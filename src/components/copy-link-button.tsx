"use client";

import { useEffect, useRef, useState } from "react";
import { IconLink } from "@/components/icons";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      // Clipboard API unavailable (insecure context / denied) — legacy fallback.
      const el = document.createElement("textarea");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(el);
    }
    if (!ok) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-milpaq-border text-milpaq-dark/70 hover:border-milpaq-olive hover:text-milpaq-olive"
      >
        <IconLink className="h-4 w-4 stroke-current fill-none" />
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-milpaq-dark px-2 py-1 text-xs font-medium text-white transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? "Link copied" : ""}
      </span>
    </span>
  );
}
