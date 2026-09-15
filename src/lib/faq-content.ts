export type FaqBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type FaqItem = {
  question: string;
  blocks: FaqBlock[];
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "general-questions",
    title: "General Questions",
    items: [
      {
        question: "What is MILPAQ?",
        blocks: [
          {
            type: "p",
            text: "MILPAQ is a government contract execution and compliance company that helps manufacturers, suppliers, and contractors successfully navigate packaging, inspections, traceability, compliance, logistics, and government market access requirements.",
          },
        ],
      },
      {
        question: "Is MILPAQ a packaging company?",
        blocks: [
          { type: "p", text: "Packaging is one of the services we provide." },
          {
            type: "p",
            text: "MILPAQ specializes in contract execution, compliance support, government market access, inspections, logistics coordination, and military packaging services.",
          },
        ],
      },
      {
        question: "Who does MILPAQ work with?",
        blocks: [
          { type: "p", text: "MILPAQ works with:" },
          {
            type: "list",
            items: [
              "Prime Contractors",
              "Government Suppliers",
              "U.S. Manufacturers",
              "Canadian Manufacturers",
              "Foreign Manufacturers",
              "Machine Shops",
              "OEMs",
              "Distributors",
            ],
          },
        ],
      },
      {
        question: "Does MILPAQ sell products?",
        blocks: [
          {
            type: "p",
            text: "MILPAQ provides services and solutions that support government contracting and supply chain execution.",
          },
        ],
      },
      {
        question: "What makes MILPAQ different?",
        blocks: [
          { type: "p", text: "Most companies offer consulting." },
          { type: "p", text: "Most packaging companies offer packaging." },
          { type: "p", text: "MILPAQ offers contract execution." },
          {
            type: "p",
            text: "We bridge the gap between manufacturers, suppliers, contractors, and government customers.",
          },
        ],
      },
    ],
  },
  {
    id: "military-packaging-preservation",
    title: "Military Packaging & Preservation",
    items: [
      {
        question: "What packaging standards does MILPAQ support?",
        blocks: [
          { type: "p", text: "MILPAQ supports:" },
          {
            type: "list",
            items: [
              "MIL-STD-2073",
              "ASTM D3951",
              "MIL-STD-129",
              "Preservation Requirements",
              "Unit Pack Requirements",
              "Intermediate Pack Requirements",
              "Exterior Pack Requirements",
            ],
          },
        ],
      },
      {
        question: "Can MILPAQ review my packaging requirements?",
        blocks: [
          {
            type: "p",
            text: "MILPAQ can review packaging requirements and explain required preservation methods, materials, packaging, and labeling requirements.",
          },
        ],
      },
      {
        question: "Can MILPAQ package my government contract items?",
        blocks: [
          { type: "p", text: "Yes." },
          {
            type: "p",
            text: "Customers may ship materials to MILPAQ for packaging, labeling, inspection preparation, and shipment support on a cost basis.",
          },
        ],
      },
      {
        question: "Can MILPAQ create packaging instructions for my contract?",
        blocks: [
          {
            type: "p",
            text: "MILPAQ offers Packaging Interpretation Services where we review contract requirements and provide step-by-step packaging instructions and material recommendations.",
          },
        ],
      },
      {
        question: "Do I have to use MILPAQ for packaging?",
        blocks: [
          { type: "p", text: "No." },
          {
            type: "p",
            text: "MILPAQ offers packaging guidance for customers who want to perform packaging internally.",
          },
        ],
      },
    ],
  },
  {
    id: "dcma-inspection-support",
    title: "DCMA Inspection Support",
    items: [
      {
        question: "Can MILPAQ coordinate DCMA inspections?",
        blocks: [
          { type: "p", text: "Yes." },
          {
            type: "p",
            text: "MILPAQ coordinates inspection readiness, scheduling, document reviews, and inspector communication.",
          },
        ],
      },
      {
        question: "Where are inspections performed?",
        blocks: [
          { type: "p", text: "Inspections coordinated by MILPAQ are performed at MILPAQ's facility(s)." },
        ],
      },
      {
        question: "What is the most common DCMA mistake contractors make?",
        blocks: [
          { type: "p", text: "Common mistakes include:" },
          {
            type: "list",
            items: [
              "Incorrect inspection location",
              "Incorrect place of performance",
              "Improper packaging",
              "Improper labeling",
              "Missing documentation",
              "Failure to prepare for inspection",
            ],
          },
        ],
      },
      {
        question: "Can MILPAQ help prepare for a DCMA inspection?",
        blocks: [
          { type: "p", text: "Yes." },
          { type: "p", text: "MILPAQ performs readiness reviews before inspections are scheduled." },
        ],
      },
      {
        question: "Can MILPAQ perform inspections?",
        blocks: [
          { type: "p", text: "MILPAQ coordinates inspections." },
          { type: "p", text: "Government inspectors remain responsible for inspection acceptance decisions." },
        ],
      },
    ],
  },
  {
    id: "traceability",
    title: "Traceability",
    items: [
      {
        question: "What is traceability?",
        blocks: [
          {
            type: "p",
            text: "Traceability is the ability to document a product's supply chain back to an acceptable source.",
          },
        ],
      },
      {
        question: "Can MILPAQ create traceability documentation for me?",
        blocks: [
          { type: "p", text: "No." },
          { type: "p", text: "Customers remain responsible for obtaining supplier documentation." },
          {
            type: "p",
            text: "MILPAQ reviews traceability documentation and identifies deficiencies before submission.",
          },
        ],
      },
      {
        question: "Can MILPAQ review a rejected traceability package?",
        blocks: [
          { type: "p", text: "Yes." },
          {
            type: "p",
            text: "MILPAQ can review rejected traceability submissions and provide corrective action recommendations.",
          },
        ],
      },
      {
        question: "Does MILPAQ offer supplier qualification support?",
        blocks: [
          { type: "p", text: "Yes." },
          { type: "p", text: "MILPAQ provides supplier qualification templates, questionnaires, and review services." },
        ],
      },
      {
        question: "Can MILPAQ help with first-time buyer questionnaires?",
        blocks: [
          { type: "p", text: "Yes." },
          {
            type: "p",
            text: "MILPAQ offers guidance and templates for first-time buyer questionnaires, supplier reviews, and traceability readiness.",
          },
        ],
      },
    ],
  },
  {
    id: "oem-partnership-program",
    title: "OEM Partnership Program",
    items: [
      {
        question: "What is the OEM Partnership Program?",
        blocks: [
          {
            type: "p",
            text: "The OEM Partnership Program helps manufacturers access government opportunities without building an internal government contracting department.",
          },
        ],
      },
      {
        question: "Can foreign manufacturers participate?",
        blocks: [
          { type: "p", text: "Yes." },
          { type: "p", text: "MILPAQ works with both domestic and international manufacturers." },
        ],
      },
      {
        question: "Does MILPAQ charge manufacturers to become partners?",
        blocks: [
          { type: "p", text: "Strategic OEM partnerships are evaluated individually." },
          { type: "p", text: "Training and consulting services are available separately." },
        ],
      },
      {
        question: "Will MILPAQ represent my products to government customers?",
        blocks: [
          { type: "p", text: "Yes." },
          {
            type: "p",
            text: "Qualified partners may participate in MILPAQ's Government Sales Representation Program.",
          },
        ],
      },
      {
        question: "What industries does MILPAQ support?",
        blocks: [
          { type: "p", text: "Examples include:" },
          {
            type: "list",
            items: [
              "Aerospace",
              "Batteries",
              "Electronics",
              "Industrial Components",
              "Machined Parts",
              "Technology Products",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "consulting-training",
    title: "Consulting & Training",
    items: [
      {
        question: "How much is a consultation?",
        blocks: [
          { type: "p", text: "Government Market Strategy Session:" },
          { type: "p", text: "$250 per hour." },
        ],
      },
      {
        question: "What is included in the Government Readiness Workshop?",
        blocks: [
          { type: "p", text: "The workshop covers:" },
          {
            type: "list",
            items: [
              "Government Registrations",
              "DIBBS",
              "PIEE",
              "VSM",
              "WAWF",
              "Packaging",
              "Traceability",
              "Government Market Strategy",
              "Supplier Development",
            ],
          },
        ],
      },
      {
        question: "What is included in the Strategic Advisory Retainer?",
        blocks: [
          {
            type: "list",
            items: [
              "10 Monthly Strategy Sessions",
              "Priority Support",
              "Resource Library Access",
              "SOP Access",
              "Video Training Access",
              "Government Contracting Support",
            ],
          },
        ],
      },
      {
        question: "Can training be performed virtually?",
        blocks: [
          { type: "p", text: "Yes." },
          { type: "p", text: "Training is available virtually or in person." },
        ],
      },
    ],
  },
  {
    id: "compliance-readiness",
    title: "Compliance & Readiness",
    items: [
      {
        question: "Does MILPAQ provide ISO support?",
        blocks: [
          { type: "p", text: "Yes." },
          { type: "p", text: "MILPAQ provides ISO readiness and implementation assistance." },
        ],
      },
      {
        question: "Does MILPAQ provide CMMC support?",
        blocks: [
          { type: "p", text: "Yes." },
          {
            type: "p",
            text: "MILPAQ coordinates CMMC readiness and implementation support through qualified partners.",
          },
        ],
      },
      {
        question: "Does MILPAQ provide JCP assistance?",
        blocks: [
          { type: "p", text: "Yes." },
          { type: "p", text: "MILPAQ assists eligible companies with JCP onboarding and readiness." },
        ],
      },
      {
        question: "Does MILPAQ provide SAM registration assistance?",
        blocks: [
          { type: "p", text: "Yes." },
          {
            type: "p",
            text: "MILPAQ can assist companies with SAM registration, CAGE setup, and government onboarding activities.",
          },
        ],
      },
    ],
  },
  {
    id: "services-we-do-not-offer",
    title: "Services We Do Not Offer",
    items: [
      {
        question: "What products does MILPAQ not handle?",
        blocks: [
          { type: "p", text: "MILPAQ does not currently support:" },
          {
            type: "list",
            items: [
              "Firearms",
              "Ammunition",
              "Explosives",
              "Ordnance",
              "Petrochemicals",
              "Controlled Medical Products",
              "Clean Room Packaging Projects",
            ],
          },
          {
            type: "p",
            text: "Projects are evaluated individually and may be declined based on facility limitations or regulatory requirements.",
          },
        ],
      },
      {
        question: "Does MILPAQ accept technical drawings or controlled technical data?",
        blocks: [
          {
            type: "p",
            text: "Customers should not submit controlled technical data unless specifically requested and appropriate security controls are in place.",
          },
        ],
      },
    ],
  },
];
