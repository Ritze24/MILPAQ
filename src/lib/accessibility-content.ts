import type { TermsBlock } from "@/lib/terms-content";

export type AccessibilitySection = {
  id: string;
  number: number;
  title: string;
  blocks: TermsBlock[];
};

export const accessibilityVersion = "1.0";
export const accessibilityEffectiveDate = "July 1, 2026";

export const accessibilitySections: AccessibilitySection[] = [
  {
    id: "our-commitment",
    number: 1,
    title: "Our Commitment",
    blocks: [
      {
        type: "p",
        text: "MILPAQ Solutions is committed to making milpaq.com accessible to the widest possible audience, including people with disabilities. We believe everyone — manufacturers, suppliers, and government partners alike — should be able to access information about our services without barriers.",
      },
    ],
  },
  {
    id: "conformance-standard",
    number: 2,
    title: "Conformance Standard",
    blocks: [
      {
        type: "p",
        text: "We are working toward conformance with the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, the widely accepted standard for web accessibility. This includes ongoing attention to:",
      },
      {
        type: "list",
        items: [
          "Clear, consistent navigation and page structure",
          "Sufficient color contrast between text and backgrounds",
          "Descriptive alt text for meaningful images",
          "Keyboard-accessible forms, menus, and interactive elements",
          "Readable, well-structured content for screen readers",
        ],
      },
    ],
  },
  {
    id: "ongoing-efforts",
    number: 3,
    title: "Ongoing Efforts",
    blocks: [
      {
        type: "p",
        text: "Accessibility is an ongoing effort. As we add new pages, tools, and features — including our packaging code lookup and RFQ workflows — we review them for accessibility and make improvements as we identify opportunities.",
      },
    ],
  },
  {
    id: "known-limitations",
    number: 4,
    title: "Known Limitations",
    blocks: [
      {
        type: "p",
        text: "Despite our efforts, some parts of the site may not yet fully conform to accessibility standards, particularly embedded third-party content or recently added features. We welcome reports of any accessibility barriers so we can address them.",
      },
    ],
  },
  {
    id: "compatible-technology",
    number: 5,
    title: "Compatible Technology",
    blocks: [
      {
        type: "p",
        text: "This website is designed to be compatible with current versions of major browsers (Chrome, Safari, Firefox, Edge) and commonly used assistive technologies, including screen readers.",
      },
    ],
  },
  {
    id: "feedback",
    number: 6,
    title: "Feedback",
    blocks: [
      {
        type: "p",
        text: "If you encounter an accessibility barrier on this website, please let us know. Include the web page and a description of the issue, and we will work to address it as quickly as possible.",
      },
    ],
  },
];
