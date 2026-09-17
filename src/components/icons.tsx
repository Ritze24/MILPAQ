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

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

export function IconMessage({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M4 5h16v11H8l-4 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

export function IconDownload({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M12 3v12" />
      <path d="M7.5 10.5L12 15l4.5-4.5" />
      <path d="M4 19h16" />
    </svg>
  );
}

export function IconDocument({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M6 3h9l4 4v14H6V3z" />
      <path d="M15 3v4h4" />
      <path d="M9 13h6M9 16.5h6" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconTag({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M11.5 3.5H5.5a2 2 0 0 0-2 2v6l9.6 9.6a2 2 0 0 0 2.83 0l6.17-6.17a2 2 0 0 0 0-2.83L11.5 3.5z" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.5 4.4-5.5 7.5-5.5s6.1 2 7.5 5.5" />
    </svg>
  );
}

export function IconLink({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M9.5 14.5l5-5" />
      <path d="M13 7l1.5-1.5a3.5 3.5 0 0 1 5 5L18 12" />
      <path d="M11 17l-1.5 1.5a3.5 3.5 0 0 1-5-5L6 12" />
    </svg>
  );
}

export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v6.5M7.5 7.5v.01" />
      <path d="M11.5 16.5V10M11.5 12.5c0-1.4 1-2.5 2.25-2.5S16 11.1 16 12.5v4" />
    </svg>
  );
}

export function IconTwitterX({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} strokeWidth={2} {...cap}>
      <path d="M14.5 21v-7h2.5l.5-3h-3V9c0-.9.3-1.5 1.7-1.5H17.5V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4V11H8.5v3H11v7h3.5z" />
    </svg>
  );
}
