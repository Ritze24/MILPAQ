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

export function IconShieldStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M12 8.2l1.1 2.2 2.4.3-1.75 1.7.4 2.4L12 13.6l-2.15 1.2.4-2.4-1.75-1.7 2.4-.3z" />
    </svg>
  );
}

export function IconGlobeCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <circle cx="10.5" cy="12" r="7.5" />
      <path d="M3 12h15M10.5 4.5c2 2 3 4.7 3 7.5s-1 5.5-3 7.5c-2-2-3-4.7-3-7.5s1-5.5 3-7.5z" />
      <path d="M15.5 15l2 2 3.5-4" />
    </svg>
  );
}

export function IconCertificate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <rect x="3" y="3" width="14" height="18" rx="1" />
      <path d="M6.5 7.5h7M6.5 10.5h7M6.5 13.5h4" />
      <circle cx="17.5" cy="16.5" r="3.5" />
      <path d="M16 19.5l-.7 3 2.2-1.3 2.2 1.3-.7-3" />
    </svg>
  );
}

export function IconBank({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M3 9.5L12 4l9 5.5" />
      <path d="M4.5 9.5v9M9 9.5v9M15 9.5v9M19.5 9.5v9" />
      <path d="M3 21h18" />
      <path d="M3 9.5h18" />
    </svg>
  );
}
