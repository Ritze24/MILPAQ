export type BlogCategory = {
  name: string;
  slug: string;
  plannedTitles: string[];
};

export const blogCategories: BlogCategory[] = [
  {
    name: "Military Packaging & Preservation",
    slug: "military-packaging-preservation",
    plannedTitles: [
      "MIL-STD-2073 Explained",
      "MIL-STD-2073 vs ASTM D3951",
      "Understanding Unit/Intermediate/Exterior Packs",
      "Common Military Packaging Mistakes That Cause Delays",
      "How MILPAQ Reviews Packaging Requirements Before Shipment",
    ],
  },
  {
    name: "DCMA & Origin Inspections",
    slug: "dcma-origin-inspections",
    plannedTitles: [
      "How DCMA Origin Inspections Work",
      "What Happens Before a DCMA Inspector Arrives",
      "The Most Common DCMA Inspection Deficiencies",
      "Place of Inspection vs Place of Performance Explained",
      "Can a Third Party Coordinate a DCMA Inspection?",
    ],
  },
  {
    name: "Traceability",
    slug: "traceability",
    plannedTitles: [
      "What Is Traceability in Government Contracting?",
      "Why Traceability Gets Rejected",
      "First-Time Supplier Questionnaires Explained",
      "How to Evaluate a New Supplier Before You Buy",
      "What Government Buyers Look for in a Traceability Package",
    ],
  },
  {
    name: "OEM Partnerships",
    slug: "oem-partnerships",
    plannedTitles: [
      "Why Manufacturers Miss Government Opportunities",
      "Do Manufacturers Need a Government Contracting Department?",
      "How OEMs Can Sell to the U.S. Government Without Hiring a Contracting Team",
      "Government Sales Representation for Manufacturers",
      "You Build It. MILPAQ Moves It.",
    ],
  },
  {
    name: "Compliance & Readiness",
    slug: "compliance-readiness",
    plannedTitles: [
      "What Is JCP and Who Needs It?",
      "ISO 9001 and Government Contracting",
      "What Is CMMC and Why Manufacturers Should Pay Attention",
      "Government Contractor Compliance Checklist",
    ],
  },
  {
    name: "Government Market Entry",
    slug: "government-market-entry",
    plannedTitles: [
      "How to Start Selling to DLA",
      "SAM, CAGE, PIEE, VSM, and WAWF Explained",
      "The Government Contracting Systems Every Supplier Should Know",
      "Can Foreign Manufacturers Sell to the U.S. Government?",
      "Canadian Manufacturers and U.S. Government Opportunities",
      "Entering the U.S. Government Market: A Guide for International Manufacturers",
    ],
  },
];
