export type SeoPage = {
  slug: string;
  title: string;
  intro: string;
  relatedHref: string;
  relatedLabel: string;
};

export const seoPages: SeoPage[] = [
  {
    slug: "military-packaging-services",
    title: "Military Packaging Services",
    intro:
      "MILPAQ provides military packaging services built around MIL-STD-2073 preservation, packing, and marking requirements — from packaging design through documentation review.",
    relatedHref: "/services/military-packaging",
    relatedLabel: "Military Packaging & Contract Execution",
  },
  {
    slug: "dcma-origin-inspection-services",
    title: "DCMA Origin Inspection Services",
    intro:
      "MILPAQ facilitates DCMA origin inspections — readiness review, documentation review, and inspector coordination — at MILPAQ's facility.",
    relatedHref: "/services/dcma-origin-inspection",
    relatedLabel: "DCMA Origin Inspection Facilitation",
  },
  {
    slug: "dla-packaging-requirements",
    title: "DLA Packaging Requirements",
    intro:
      "Defense Logistics Agency contracts carry specific packaging, preservation, and marking requirements. MILPAQ reviews contract and solicitation documents to identify what's required before you ship.",
    relatedHref: "/services/military-packaging",
    relatedLabel: "Military Packaging & Contract Execution",
  },
  {
    slug: "mil-std-2073-packaging",
    title: "MIL-STD-2073 Packaging",
    intro:
      "MIL-STD-2073 governs military packaging, preservation, and packing methods for defense materiel. MILPAQ reviews and executes packaging to this standard for contractors and OEMs.",
    relatedHref: "/services/military-packaging",
    relatedLabel: "Military Packaging & Contract Execution",
  },
  {
    slug: "mil-std-129-labeling",
    title: "MIL-STD-129 Labeling",
    intro:
      "MIL-STD-129 sets the requirements for military marking of shipments and storage. MILPAQ handles unit, intermediate, and exterior pack labeling to this standard.",
    relatedHref: "/services/military-packaging",
    relatedLabel: "Military Packaging & Contract Execution",
  },
  {
    slug: "government-contract-packaging",
    title: "Government Contract Packaging",
    intro:
      "Government contracts often specify packaging requirements separate from the product specification itself. MILPAQ reviews your awarded contract or solicitation and packages to what's required.",
    relatedHref: "/services/military-packaging",
    relatedLabel: "Military Packaging & Contract Execution",
  },
  {
    slug: "government-contractor-consulting",
    title: "Government Contractor Consulting",
    intro:
      "MILPAQ offers government contracting consulting through one-on-one strategy sessions and a seven-workshop Government Contracting Academy covering foundations through contract execution.",
    relatedHref: "/workshops",
    relatedLabel: "Workshops & Consulting",
  },
  {
    slug: "dla-contractor-training",
    title: "DLA Contractor Training",
    intro:
      "MILPAQ's workshop library covers DIBBS navigation and opportunity analysis for contractors selling to the Defense Logistics Agency.",
    relatedHref: "/workshops",
    relatedLabel: "Workshops & Consulting",
  },
  {
    slug: "government-contract-funding",
    title: "Government Contract Funding",
    intro:
      "Financing a government contract often requires different tools than commercial financing — supplier financing, lines of credit, SBA financing, and contract/invoice financing. MILPAQ's Government Contract Financing & Growth Capital workshop covers these options.",
    relatedHref: "/workshops",
    relatedLabel: "Workshops & Consulting",
  },
  {
    slug: "oem-government-sales-program",
    title: "OEM Government Sales Program",
    intro:
      "MILPAQ's OEM Partnership Program gives U.S., Canadian, and foreign manufacturers a path to sell to the U.S. government without building an in-house contracting department.",
    relatedHref: "/oem-partnership",
    relatedLabel: "OEM Partnership Program",
  },
];
