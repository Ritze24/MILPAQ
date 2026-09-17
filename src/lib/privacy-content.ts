import type { TermsBlock } from "@/lib/terms-content";

export type PrivacySection = {
  id: string;
  number: number;
  title: string;
  blocks: TermsBlock[];
};

export const privacyVersion = "1.0";
export const privacyEffectiveDate = "July 1, 2026";

export const privacySections: PrivacySection[] = [
  {
    id: "overview",
    number: 1,
    title: "Overview",
    blocks: [
      {
        type: "p",
        text: "This Privacy Policy explains how MILPAQ Solutions, a 305 Aero Supplies LLC brand (“MILPAQ,” “we,” “us”), collects, uses, and protects information when you visit milpaq.com or engage with our services.",
      },
      {
        type: "p",
        text: "By using this website or submitting information to MILPAQ, you agree to the practices described in this policy.",
      },
    ],
  },
  {
    id: "information-we-collect",
    number: 2,
    title: "Information We Collect",
    blocks: [
      { type: "p", text: "We collect information you provide directly, including:" },
      {
        type: "list",
        items: [
          "Contact details submitted through our contact, quote request, and resource access forms (name, company, email, phone)",
          "Packaging RFQ details, including contract and shipment information you choose to share",
          "Information provided when scheduling a discovery call or consultation",
          "Correspondence you send us by phone, email, or web form",
        ],
      },
      {
        type: "p",
        text: "We also automatically collect limited technical information - such as browser type, device information, and pages visited - through standard web server logs and, where enabled, analytics tools.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    number: 3,
    title: "How We Use Information",
    blocks: [
      { type: "p", text: "We use the information we collect to:" },
      {
        type: "list",
        items: [
          "Respond to quote requests, inquiries, and consultation bookings",
          "Prepare and administer packaging, compliance, and government contracting engagements",
          "Send requested resources, checklists, and toolkits",
          "Improve our website and service offerings",
          "Meet legal, regulatory, and government reporting obligations tied to contract execution",
        ],
      },
      { type: "p", text: "We do not sell your personal information." },
    ],
  },
  {
    id: "cookies-and-tracking",
    number: 4,
    title: "Cookies & Tracking Technologies",
    blocks: [
      {
        type: "p",
        text: "Our website may use cookies and similar technologies to keep the site functioning correctly and to understand how visitors use it. This can include essential cookies required for the site to operate and, where enabled, analytics cookies that help us understand traffic patterns.",
      },
      {
        type: "p",
        text: "Most browsers let you control or disable cookies through their settings. Disabling cookies may affect certain site features.",
      },
    ],
  },
  {
    id: "sharing-of-information",
    number: 5,
    title: "Sharing of Information",
    blocks: [
      { type: "p", text: "We may share information with:" },
      {
        type: "list",
        items: [
          "Service providers who support our operations (e.g., hosting, email, scheduling) under confidentiality obligations",
          "Government agencies or contracting parties where necessary to execute a contract you have engaged us on",
          "Professional advisors, or as required by law, subpoena, or legal process",
        ],
      },
      { type: "p", text: "We do not share your information with third parties for their own marketing purposes." },
    ],
  },
  {
    id: "data-security",
    number: 6,
    title: "Data Security",
    blocks: [
      {
        type: "p",
        text: "We use reasonable administrative and technical safeguards to protect information submitted to us. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "data-retention",
    number: 7,
    title: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain information for as long as necessary to fulfill the purposes described in this policy, including ongoing contract execution, recordkeeping, and legal or regulatory requirements, after which it is deleted or de-identified.",
      },
    ],
  },
  {
    id: "your-choices",
    number: 8,
    title: "Your Choices & Rights",
    blocks: [
      { type: "p", text: "You may contact us at any time to:" },
      {
        type: "list",
        items: [
          "Request access to the information we hold about you",
          "Request correction of inaccurate information",
          "Request deletion of your information, subject to legal or contractual retention requirements",
          "Opt out of non-essential communications",
        ],
      },
    ],
  },
  {
    id: "childrens-privacy",
    number: 9,
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Our website and services are directed at businesses and professionals. We do not knowingly collect information from children under 13.",
      },
    ],
  },
  {
    id: "changes-to-this-policy",
    number: 10,
    title: "Changes to This Policy",
    blocks: [
      { type: "p", text: "MILPAQ may update this Privacy Policy from time to time." },
      { type: "p", text: "The current version will always be posted on this page with its effective date." },
    ],
  },
  {
    id: "contact-us",
    number: 11,
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: "Questions about this Privacy Policy or your information can be directed to MILPAQ Solutions using the contact details below.",
      },
    ],
  },
];
