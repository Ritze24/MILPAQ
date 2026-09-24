export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.milpaq.com";

export const company = {
  name: "MILPAQ Solutions",
  legalName: "305 Aero Supplies LLC DBA MILPAQ Solutions",
  entityName: "305 Aero Supplies LLC",
  tagline: "Turning Manufacturing Capability Into Government Opportunity",
  address: {
    line1: "1701 NW 84th Avenue, Suite B16",
    city: "Miami",
    state: "FL",
    zip: "33126",
  },
  phone: "786-807-4466",
  phoneHref: "tel:+17868074466",
  email: "milpaq@305aerosupplies.com",
  cageCode: "97PC9",
  domain: "milpaq.com",
};

export const credentials = [
  {
    label: "SDVOSB",
    image: "/brand/credentials/sdvosb.png",
  },
  {
    label: "ISO 9001",
    image: "/brand/credentials/iso-9001.webp",
  },
  {
    label: "JCP Certified",
    image: "/brand/credentials/jcp.png",
  },
  {
    label: "CMMC Level 2",
    image: "/brand/credentials/cmmc-level-2.png",
  },
  {
    label: `CAGE ${company.cageCode}`,
    image: "/brand/credentials/cage-certified.png",
  },
  {
    label: "SAM Registered",
    image: "/brand/credentials/sam-certified.png",
  },
];

export type NavLink = { label: string; href: string };

export const servicesNav: NavLink[] = [
  { label: "Military Packaging & Contract Execution", href: "/services/military-packaging" },
  { label: "DCMA Origin Inspection Facilitation", href: "/services/dcma-origin-inspection" },
  { label: "Government Readiness", href: "/services/government-readiness" },
  { label: "Strategic Growth Retainer", href: "/services/strategic-growth-retainer" },
  { label: "Government Infrastructure Services", href: "/services/government-infrastructure" },
];

export const primaryNav: NavLink[] = [
  { label: "OEM Partnership Program", href: "/oem-partnership" },
  { label: "Workshops", href: "/workshops" },
  { label: "Resource Store", href: "/resource-store" },
  { label: "About MILPAQ", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
