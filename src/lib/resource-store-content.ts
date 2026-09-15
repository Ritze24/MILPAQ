export type ResourceItem = {
  name: string;
  price: string;
  includes?: string[];
  note?: string;
};

export const freeResources: ResourceItem[] = [
  {
    name: "Government Contractor Startup Checklist",
    price: "FREE",
    includes: [
      "Entity Setup Checklist",
      "SAM Registration Overview",
      "CAGE Code Overview",
      "JCP Overview",
      "DIBBS Overview",
      "First Steps Roadmap",
    ],
  },
  {
    name: "DLA Readiness Checklist",
    price: "FREE",
    includes: [
      "DIBBS Access",
      "Supplier Readiness",
      "Packaging Readiness",
      "Traceability Readiness",
      "Funding Readiness",
    ],
  },
  {
    name: "DLA Bid Tracking Spreadsheet",
    price: "FREE",
    note: "Based on MILPAQ's original bid tracking process.",
    includes: ["Solicitation Tracking", "Supplier Tracking", "Award Tracking", "Notes", "Follow Up Tracking"],
  },
  {
    name: "Supplier CAGE Code Tracker",
    price: "FREE",
    includes: ["Supplier Name", "CAGE Code", "FSC Category", "Notes", "Qualification Tracking"],
  },
  {
    name: "Packaging Readiness Checklist",
    price: "FREE",
  },
  {
    name: "Origin Inspection Readiness Checklist",
    price: "FREE",
  },
];

export const toolkits: ResourceItem[] = [
  {
    name: "Supplier Qualification Toolkit",
    price: "$199",
    includes: [
      "DLA First-Time Buy Vendor Template",
      "DLA Informal Cost Breakdown Template",
      "DLA Unrated Vendor Letter Template",
      "Supplier Vetting Process",
      "Supplier Qualification Checklist",
      "Risk Assessment Template",
    ],
  },
  {
    name: "DIBBS Bid Evaluation Toolkit",
    price: "$99",
    includes: ["Bid Review Checklist", "Supplier Evaluation Worksheet", "Margin Calculator", "Risk Assessment Worksheet"],
  },
  {
    name: "Packaging Interpretation Toolkit",
    price: "$99",
    includes: [
      "MIL-STD-2073 Reference Guide",
      "Packaging Code Lookup",
      "Material Selection Guide",
      "Contract Packaging Instructions Interpretation",
    ],
  },
  {
    name: "DCMA Readiness Toolkit",
    price: "$99",
    includes: ["Inspection Readiness Checklist", "Common Findings Guide", "Corrective Action Template"],
  },
];

export type WorkshopItem = {
  title: string;
  topics: string[];
};

export const workshopsDetailed: WorkshopItem[] = [
  {
    title: "Government Contracting Foundations",
    topics: ["What DLA Buys", "How DLA Buys", "Government Procurement Lifecycle", "Federal Market Overview"],
  },
  {
    title: "DIBBS Navigation & Opportunity Analysis",
    topics: ["DIBBS Navigation", "FSC Analysis", "NSN Analysis", "Solicitation Review"],
  },
  {
    title: "Supplier Sourcing & Qualification",
    topics: [
      "Finding Manufacturers",
      "Finding Distributors",
      "Supplier Outreach",
      "Supplier Qualification",
      "Supplier Risk Management",
    ],
  },
  {
    title: "Bid Pricing & Submission",
    topics: ["Pricing Strategy", "Margin Planning", "Freight", "Packaging Costs", "Bid Submission"],
  },
  {
    title: "Post-Award Contract Execution",
    topics: ["Purchasing", "Traceability", "Contract Funding", "Receiving", "Inventory Management"],
  },
  {
    title: "Packaging, Labeling & DCMA",
    topics: ["MIL-STD-2073", "MIL-STD-129", "VSM", "DCMA Origin Inspection", "Packaging Workflows"],
  },
  {
    title: "Government Contract Financing & Growth Capital",
    topics: [
      "Supplier Financing (Best Option)",
      "Business Lines of Credit",
      "SBA Financing",
      "Traditional Business Loans",
      "Business Credit Cards",
      "Contract & Invoice Financing",
      "Financing Mistakes To Avoid",
      "Funding Resources",
    ],
  },
];

export const implementationServices = [
  "Packaging Services",
  "Labeling Services",
  "Origin Inspection Coordination",
  "Government System Support (VSM, PIEE, WAWF)",
  "Traceability Review Services",
  "ISO 9001 Readiness Support",
  "CMMC Readiness Coordination",
  "Government Contractor Website Development",
  "Capability Statement Development",
  "Government Market Access Setup",
];

export const retainerIncludes = [
  "Access To All Workshops",
  "Weekly Strategy Calls",
  "Opportunity Reviews",
  "Bid Reviews",
  "Supplier Sourcing Guidance",
  "Contract Execution Guidance",
  "Packaging Guidance",
  "Compliance Guidance",
  "Staff Training",
  "Email Support",
];

export const oemPartnership = {
  idealFor: ["US Manufacturers", "Canadian Manufacturers", "Foreign Manufacturers"],
  milpaqProvides: [
    "Government Market Access",
    "Opportunity Identification",
    "Compliance Support",
    "Packaging Support",
    "Contract Execution Support",
  ],
  manufacturerProvides: ["Competitive Pricing", "Manufacturing Capability", "Product Expertise"],
};
