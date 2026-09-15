export type TermsBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type TermsSection = {
  id: string;
  number: number;
  title: string;
  blocks: TermsBlock[];
};

export const termsVersion = "1.0";
export const termsEffectiveDate = "July 1, 2026";

export const termsSections: TermsSection[] = [
  {
    id: "overview",
    number: 1,
    title: "Overview",
    blocks: [
      {
        type: "p",
        text: "These Terms & Conditions govern all services, consulting engagements, packaging services, compliance support, OEM partnerships, training programs, digital products, and related activities provided by MILPAQ Solutions, a 305 Aero Supplies brand (“MILPAQ”).",
      },
      {
        type: "p",
        text: "By purchasing services, requesting quotations, participating in training, downloading digital products, or engaging MILPAQ in any capacity, the customer agrees to these Terms & Conditions.",
      },
    ],
  },
  {
    id: "services-provided",
    number: 2,
    title: "Services Provided",
    blocks: [
      { type: "p", text: "MILPAQ may provide:" },
      {
        type: "list",
        items: [
          "Government Contract Execution Support",
          "Military Packaging & Preservation",
          "Export Packaging & Crating",
          "DCMA Inspection Coordination",
          "Compliance Services",
          "OEM Partnership Services",
          "Government Market Entry Services",
          "Consulting & Training",
          "Digital Products",
          "Templates, SOPs, Checklists, and Educational Materials",
        ],
      },
      { type: "p", text: "Services may be modified or expanded at MILPAQ's discretion." },
    ],
  },
  {
    id: "customer-responsibilities",
    number: 3,
    title: "Customer Responsibilities",
    blocks: [
      { type: "p", text: "Customers remain responsible for:" },
      {
        type: "list",
        items: [
          "Contract performance",
          "Product conformity",
          "Supplier management",
          "Traceability acquisition",
          "Regulatory compliance",
          "Government reporting requirements",
        ],
      },
      {
        type: "p",
        text: "MILPAQ provides support and guidance but does not guarantee contract awards, inspection approvals, traceability acceptance, or government payment.",
      },
    ],
  },
  {
    id: "traceability-services",
    number: 4,
    title: "Traceability Services",
    blocks: [
      { type: "p", text: "MILPAQ may review traceability documentation and provide recommendations." },
      {
        type: "p",
        text: "MILPAQ does not create traceability on behalf of customers and does not assume responsibility for supplier documentation provided by third parties.",
      },
      {
        type: "p",
        text: "Final responsibility for traceability remains with the contractor or supplier submitting the documentation.",
      },
    ],
  },
  {
    id: "country-of-origin-disclosure",
    number: 5,
    title: "Country of Origin Disclosure",
    blocks: [
      { type: "p", text: "Customers and suppliers shall accurately disclose:" },
      { type: "list", items: ["Country of Origin", "Country of Manufacture", "Source of Supply"] },
      { type: "p", text: "for all products involved in MILPAQ-supported projects." },
      {
        type: "p",
        text: "Failure to accurately disclose origin information may result in termination of services.",
      },
    ],
  },
  {
    id: "packaging-services",
    number: 6,
    title: "Packaging Services",
    blocks: [
      {
        type: "p",
        text: "MILPAQ provides packaging guidance and execution services based upon customer-provided contract requirements.",
      },
      {
        type: "p",
        text: "Customers remain responsible for ensuring contract requirements provided to MILPAQ are complete and accurate.",
      },
      {
        type: "p",
        text: "MILPAQ shall not be liable for errors caused by incomplete contract documentation supplied by customers.",
      },
    ],
  },
  {
    id: "dcma-inspection-services",
    number: 7,
    title: "DCMA Inspection Services",
    blocks: [
      { type: "p", text: "MILPAQ facilitates inspection readiness and inspection coordination." },
      { type: "p", text: "MILPAQ does not guarantee inspection acceptance or government approval." },
      { type: "p", text: "Government inspectors maintain independent authority regarding inspection outcomes." },
    ],
  },
  {
    id: "consulting-services",
    number: 8,
    title: "Consulting Services",
    blocks: [
      { type: "p", text: "Consulting services are advisory in nature." },
      {
        type: "p",
        text: "Recommendations provided by MILPAQ are based upon experience, industry practices, and available information.",
      },
      { type: "p", text: "Final business decisions remain the responsibility of the customer." },
    ],
  },
  {
    id: "training-programs",
    number: 9,
    title: "Training Programs",
    blocks: [
      { type: "p", text: "Training materials are educational in nature." },
      { type: "p", text: "Attendance does not guarantee:" },
      { type: "list", items: ["Contract awards", "Registrations", "Certifications", "Business success"] },
      {
        type: "p",
        text: "Training content may not be copied, resold, redistributed, or republished without written permission.",
      },
    ],
  },
  {
    id: "digital-products",
    number: 10,
    title: "Digital Products",
    blocks: [
      {
        type: "p",
        text: "Templates, SOPs, checklists, videos, and digital resources are licensed for customer use only.",
      },
      { type: "p", text: "Customers may not:" },
      { type: "list", items: ["Resell", "Repackage", "Redistribute", "Publish"] },
      { type: "p", text: "MILPAQ intellectual property without written authorization." },
    ],
  },
  {
    id: "oem-partnership-program",
    number: 11,
    title: "OEM Partnership Program",
    blocks: [
      { type: "p", text: "OEM Partnership relationships may be governed by separate agreements." },
      { type: "p", text: "MILPAQ reserves the right to require:" },
      {
        type: "list",
        items: [
          "Non-Circumvention Agreements",
          "Confidentiality Agreements",
          "Preferred Pricing Agreements",
          "Government Sales Representation Agreements",
        ],
      },
      { type: "p", text: "for OEM partnership participants." },
    ],
  },
  {
    id: "payment-terms",
    number: 12,
    title: "Payment Terms",
    blocks: [
      { type: "p", text: "Consulting sessions are payable in advance." },
      { type: "p", text: "Workshops are payable prior to attendance." },
      { type: "p", text: "Packaging projects require acceptance of quotations before work begins." },
      { type: "p", text: "Retainer services are billed monthly in advance." },
      { type: "p", text: "All sales are final unless otherwise agreed in writing." },
    ],
  },
  {
    id: "confidentiality",
    number: 13,
    title: "Confidentiality",
    blocks: [
      { type: "p", text: "MILPAQ shall treat customer information as confidential." },
      {
        type: "p",
        text: "Customers agree to protect MILPAQ proprietary methods, templates, SOPs, training materials, pricing, and business processes.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    number: 14,
    title: "Limitation of Liability",
    blocks: [
      { type: "p", text: "MILPAQ shall not be liable for:" },
      {
        type: "list",
        items: [
          "Lost profits",
          "Lost contract opportunities",
          "Government award decisions",
          "Government payment delays",
          "Supplier performance failures",
          "Customer business decisions",
        ],
      },
      {
        type: "p",
        text: "MILPAQ's maximum liability shall not exceed fees paid by the customer for the specific engagement.",
      },
    ],
  },
  {
    id: "termination",
    number: 15,
    title: "Termination",
    blocks: [
      { type: "p", text: "MILPAQ may terminate services for:" },
      {
        type: "list",
        items: [
          "Non-payment",
          "Fraud",
          "Misrepresentation",
          "Unethical conduct",
          "Regulatory violations",
          "Abuse of personnel",
        ],
      },
    ],
  },
  {
    id: "governing-law",
    number: 16,
    title: "Governing Law",
    blocks: [
      { type: "p", text: "These Terms & Conditions shall be governed by the laws of the State of Florida." },
      { type: "p", text: "Venue shall be Miami-Dade County, Florida." },
    ],
  },
  {
    id: "modifications",
    number: 17,
    title: "Modifications",
    blocks: [
      { type: "p", text: "MILPAQ may update these Terms & Conditions at any time." },
      { type: "p", text: "The current version shall be posted on the MILPAQ website." },
      { type: "p", text: "Continued use of services constitutes acceptance of revisions." },
    ],
  },
];
