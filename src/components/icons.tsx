type IconProps = { className?: string };

const base = "h-6 w-6 stroke-current fill-none";
const cap = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function IconTarget({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBriefcase({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <rect x="3" y="7.5" width="18" height="12" rx="1.5" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      <path d="M3 13h18" />
    </svg>
  );
}

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconTrendingUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function IconFactory({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M3 21V11l5 3.5V11l5 3.5V9l6 4v8H3z" />
      <path d="M7 21v-4M12 21v-4M17 21v-4" />
    </svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
    </svg>
  );
}

export function IconHandshake({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M2 12l4-4 4 3 3-3 2 2 4-3 3 3-5 5-3-2-3 3-5-4z" />
      <path d="M9 15l2 2" />
    </svg>
  );
}
