const codeFields = [
  {
    term: "Method of Preservation",
    description:
      "The process used to protect the item from corrosion, deterioration, or damage during storage and shipment (e.g., cleaning, drying, preservative application).",
  },
  {
    term: "Cleaning & Drying",
    description: "The cleaning and moisture-removal process required before preservative materials are applied.",
  },
  {
    term: "Preservative Materials",
    description: "Coatings or compounds (e.g., VCI, desiccants) applied to protect the item from corrosion.",
  },
  {
    term: "Wrapping Material",
    description: "The barrier or cushioning material wrapped directly around the item.",
  },
  {
    term: "Cushioning Material",
    description: "Material used to protect the item from shock and vibration during handling and transit.",
  },
  {
    term: "Cushioning Thickness",
    description: "The required thickness of cushioning material, based on item weight and fragility.",
  },
  {
    term: "Unit/Intermediate Container",
    description: "The container level directly enclosing the item (unit) or grouping multiple unit packs (intermediate).",
  },
  {
    term: "Packing Code",
    description: "The code identifying the exterior shipping container and packing method required by the contract.",
  },
  {
    term: "Special Material Content",
    description: "Any special material declarations required for the item's construction or packaging.",
  },
  {
    term: "Hazardous Material",
    description: "Indicates whether the item is classified as hazardous material, which drives additional labeling and documentation.",
  },
  {
    term: "Special Marking",
    description: "Any marking requirements beyond standard MIL-STD-129 labeling (e.g., fragile, orientation, hazmat placards).",
  },
  {
    term: "Unit Container Level",
    description: "The packaging level (unit, intermediate, or exterior) a given requirement applies to.",
  },
  {
    term: "Optional Procedures",
    description: "Alternative preservation or packing procedures permitted by the contract when specified.",
  },
  {
    term: "Shelf-Life",
    description: "The defined storage life of the item before re-inspection or re-preservation is required.",
  },
  {
    term: "Shelf-Life Action",
    description: "The action required at shelf-life expiration (e.g., inspect, re-test, re-preserve, discard).",
  },
  {
    term: "Type of Storage",
    description: "The storage conditions the item is packaged to withstand (e.g., covered, uncovered, controlled climate).",
  },
];

export function PackagingCodeReference() {
  return (
    <div className="rounded-lg border border-milpaq-tan bg-milpaq-tan-light p-6">
      <h3 className="text-lg font-semibold text-milpaq-dark">MIL-STD-2073 Packaging Code Reference</h3>
      <p className="mt-2 text-sm text-milpaq-dark/70">
        A simplified reference for the packaging code fields found on most DoD contracts and
        solicitations. If your contract references a packaging code you don&apos;t recognize,
        upload it with your quote request and MILPAQ will interpret it for you.
      </p>
      <div className="mt-4 space-y-2">
        {codeFields.map((field) => (
          <details key={field.term} className="rounded-md border border-milpaq-tan bg-white p-3">
            <summary className="cursor-pointer text-sm font-medium text-milpaq-dark">
              {field.term}
            </summary>
            <p className="mt-2 text-sm text-milpaq-dark/70">{field.description}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
