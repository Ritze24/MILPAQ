// Maps each website form to its Monday.com board.
//
// Board ID  = the number in the board URL (…monday.com/boards/<ID>).
// Column ID = shown in each column's ⋯ menu once Monday Labs → Developer mode is on.
//
// Any board or column left as "" is skipped, so this file can ship before every
// board exists — fill in IDs as boards are created, then redeploy.

export type MondayColumnKind =
  | "text"
  | "longText"
  | "email"
  | "phone"
  | "number"
  | "checkbox"
  | "status"
  | "file";

export type MondayColumnMapping =
  // Copy a submitted form field into a column.
  | { field: string; columnId: string; kind: MondayColumnKind }
  // Write a fixed value (e.g. Lead Status = "New") on every new item.
  | { value: string; columnId: string; kind: "status" | "text" };

export interface MondayBoardConfig {
  boardId: string;
  /** Form fields tried in order for the item name; the email is the fallback. */
  itemName: string[];
  columns: MondayColumnMapping[];
}

export const MONDAY_BOARDS: Record<string, MondayBoardConfig> = {
  // https://milpaq.com/contact
  contact: {
    boardId: "18435051122", // MILPAQ - CONTACT
    itemName: ["name"],
    columns: [
      { field: "company", columnId: "text_mm82y91m", kind: "text" }, // Company
      { field: "email", columnId: "text_mm82x1hv", kind: "text" }, // Email Address (Text column)
      { field: "phone", columnId: "text_mm82t03", kind: "text" }, // Phone Number (Text column)
      { field: "message", columnId: "long_text_mm82w3pc", kind: "longText" }, // Message
      { value: "New", columnId: "color_mm8234am", kind: "status" }, // Lead Status
      // Marketing attribution — fill in column IDs once the columns exist.
      { field: "utm_source", columnId: "", kind: "text" }, // UTM Source
      { field: "utm_medium", columnId: "", kind: "text" }, // UTM Medium
      { field: "utm_campaign", columnId: "", kind: "text" }, // UTM Campaign
      { field: "utm_term", columnId: "", kind: "text" }, // UTM Term
      { field: "utm_content", columnId: "", kind: "text" }, // UTM Content
      { field: "gclid", columnId: "", kind: "text" }, // GCLID (Google Ads click ID)
      { field: "landing_page", columnId: "", kind: "text" }, // Landing Page
      { field: "referrer", columnId: "", kind: "text" }, // Referrer
    ],
  },

  // https://milpaq.com/services/military-packaging
  "packaging-rfq": {
    boardId: "",
    itemName: ["contactName"],
    columns: [
      { field: "companyName", columnId: "", kind: "text" },
      { field: "email", columnId: "", kind: "email" },
      { field: "phone", columnId: "", kind: "phone" },
      { field: "units", columnId: "", kind: "number" },
      { field: "dimensions", columnId: "", kind: "text" },
      { field: "weight", columnId: "", kind: "text" },
      { field: "originInspection", columnId: "", kind: "checkbox" },
      { field: "destinationInspection", columnId: "", kind: "checkbox" },
      { field: "notes", columnId: "", kind: "longText" },
      { field: "contractFile", columnId: "", kind: "file" },
      { value: "New", columnId: "", kind: "status" },
    ],
  },

  // https://milpaq.com/oem-partnership
  "oem-partnership": {
    boardId: "",
    itemName: ["name"],
    columns: [
      { field: "company", columnId: "", kind: "text" },
      { field: "email", columnId: "", kind: "email" },
      { field: "phone", columnId: "", kind: "phone" },
      { field: "sellsToGovernment", columnId: "", kind: "status" },
      { value: "New", columnId: "", kind: "status" },
    ],
  },

  // https://milpaq.com/services/strategic-growth-retainer
  "strategic-growth-retainer": {
    boardId: "",
    itemName: ["contactName"],
    columns: [
      { field: "companyName", columnId: "", kind: "text" },
      { field: "email", columnId: "", kind: "email" },
      { field: "phone", columnId: "", kind: "phone" },
      { field: "message", columnId: "", kind: "longText" },
      { value: "New", columnId: "", kind: "status" },
    ],
  },
};
