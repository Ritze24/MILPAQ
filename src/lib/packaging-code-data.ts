// Source: MIL-STD-2073-1E w/CHANGE 4, Appendix J (public domain DoD standard).
// Transcribed directly from the official standard text for the packaging code lookup tool.

export type CodeEntry = {
  code: string;
  description: string;
  options?: string[];
  notes?: string[];
};

export type CodeCategory = {
  key: string;
  label: string;
  tableRef: string;
  placeholder: string;
  entries: CodeEntry[];
};

export const packagingCodeCategories: CodeCategory[] = [
  {
    key: "methodOfPreservation",
    label: "Method of Preservation",
    tableRef: "Table J-I",
    placeholder: "e.g. 31",
    entries: [
      {
        code: "10",
        description:
          "Physical protection. The unpreserved item(s) shall be protected from physical damage and mechanical malfunction. Cushioning materials, dunnage, blocking and bracing shall be applied as required to protect the item(s) and the enclosing media and restrict the movement of the item within the container. The materials selected for all blocking and bracing, and the design and application thereof, shall be compatible with the item and its bearing load limitations. Materials shall be as clean and as dry as practicable.",
      },
      {
        code: "20",
        description:
          "Preservative coating. Items shall be treated with appropriate preservatives. Contact preservative coated items shall be wrapped in material conforming to MIL-PRF-121 or QQ-A-1876. Flexible wraps shall snugly enclose the coated part or item and be secured to prevent unintentional unwrapping. Parts or items coated with hard film preservatives conforming to MIL-PRF-16173, Grade 1 or 4, may, when dried, be exempted from wrapping. Projections, sharp edges, or other features of the item that may damage the wrap shall be cushioned as required. The type of cushioning and wrapping material used shall be commensurate with the size, weight and configuration of the preserved part or item.",
      },
      {
        code: "30",
        description:
          "Waterproof or waterproof-greaseproof protection with preservative as required. Items protected in accordance with Method 30 shall be heat sealed within a waterproof or waterproof-greaseproof bag. Projections, sharp edges or other physical characteristics of the item that may damage the waterproof or waterproof-greaseproof barrier or container shall be cushioned. The item shall also be cushioned as required to mitigate shock and vibration, thereby preventing physical and functional damage to the item.",
      },
      {
        code: "31",
        description:
          "Waterproof bag, heat sealed. The item, preserved, wrapped and cushioned as required, shall be enclosed in a heat-sealed bag conforming to MIL-DTL-117, Type III, Class B, Style 2. When specified in the contract or order, a carton or box shall be required to effect the unit container, and the primary cushioning shall be placed between the outside of the bag and the inside of the carton or box. When it has been determined to protect items with VCI, they shall be preserved in accordance with 5.2.4.9.",
      },
      {
        code: "32",
        description:
          "Container, waterproof bag, heat sealed. The item, preserved, wrapped and cushioned as required, shall be enclosed in a close fitting container (box) selected from Table C-I, which in turn shall be enclosed in a heat-sealed waterproof bag conforming to MIL-DTL-117, Type III, Class B, Style 2.",
      },
      {
        code: "33",
        description:
          "Greaseproof-waterproof bag, heat sealed. The item, preserved, wrapped and cushioned as required, shall be enclosed in a close fitting heat-sealed bag conforming to MIL-DTL-117, Type II, Class C, Style 1, 2 or 3. When specified in the contract or order, a carton or box shall be required to effect the unit container, and the primary cushioning specified in the contract or order shall be placed between the outside of the bag and the inside of the carton or box. When it has been determined to protect items with VCI, they shall be preserved in accordance with 5.2.4.9.",
      },
      {
        code: "40",
        description:
          "Watervaporproof protection with preservative as required. Items protected in accordance with Method 40 shall be heat sealed within a watervaporproof enclosure. Projections, sharp edges or other physical characteristics of the item, which may damage the watervaporproof enclosure, shall be cushioned. The item shall also be cushioned as required to mitigate shock and vibration, thereby preventing physical and functional damage to the item.",
      },
      {
        code: "41",
        description:
          "Watervaporproof bag, heat sealed. The item, preserved, wrapped and cushioned as required, shall be enclosed in a close fitting heat-sealed bag conforming to one of the following:",
        options: [
          "MIL-DTL-117, Type I, Class E, Style 1, 2 or 3 (see notes 2, 4).",
          "MIL-DTL-117, Type I, Class F, Style 1, use intended for ESD sensitive items only (see note 1).",
          "MIL-DTL-117, Type II, Class E, Style 1 (see notes 2, 3).",
          "MIL-DTL-117, Type IV, Class E, Style 1 (see notes 2, 4).",
        ],
        notes: [
          "1. For electrostatic protection refer to 5.2.4.1.",
          "2. When specified in the contract or order, a carton or box shall be required to complete the unit container and the primary cushioning shall be placed between the outside of the bag and the inside of the carton or box.",
          "3. When MIL-DTL-117, Type II, Class E, Style 1 bags are selected, they shall be limited to the restrictions detailed in MIL-PRF-131 for Class 2 material.",
          "4. When it has been determined to protect items with VCI, they shall be preserved in accordance with 5.2.4.9.",
        ],
      },
      {
        code: "42",
        description:
          "Container, watervaporproof bag, heat sealed, container. The item, preserved, wrapped and cushioned as required, shall be enclosed in a close fitting inner container (box), selected from Table C-I, and enclosed in a heat-sealed bag conforming to MIL-DTL-117, Type I, Class E, Style 1; or Type II, Class E, Style 1. Bags in accordance with MIL-DTL-6060 shall be used when the construction limitations of MIL-DTL-117 are exceeded. The sealed bag shall then be enclosed within an appropriate outer container (box), selected from Table C-II. When the outer container serves as the shipping container, it shall be marked as a shipping container in accordance with MIL-STD-129; the bag shall be marked as a unit pack in accordance with MIL-STD-129.",
      },
      {
        code: "43",
        description:
          "Floating watervaporproof bag, heat sealed. The item, preserved, wrapped and cushioned as required and anchored or shock mounted as necessary, shall be enclosed in a heat-sealed bag conforming to MIL-DTL-6060. When the outer container serves as the shipping container, it shall be marked as a shipping container in accordance with MIL-STD-129; the bag shall be marked as a unit pack in accordance with MIL-STD-129.",
      },
      {
        code: "44",
        description:
          "Rigid container (other than metal), sealed. The item, preserved, wrapped, and cushioned as required, shall be enclosed in a sealed, snug fitting, rigid container other than all metal. Any sealed rigid container other than all metal may be used if the sealed container provides a watervapor transmission rate (WVTR) not exceeding 0.075 gram per 100 square inches per 24 hours, when tested in accordance with ASTM D4279.",
      },
      {
        code: "45",
        description:
          "Rigid metal container, sealed. The item, preserved, wrapped and cushioned as required, shall be snugly enclosed in a sealed, rigid metal container. Any selected type of rigid metal container with machine seamed or gasketed closure may be used. When specified in the contract or purchase order or when dictated by the requirements of the item, the metal container shall be vacuum sealed.",
      },
      {
        code: "50",
        description:
          "Watervaporproof protection with desiccant. Items protected in accordance with Method 50 shall be heat sealed in a watervaporproof enclosure with activated desiccant. Unit packs of all of these methods shall also include a humidity indicator. Projections, sharp edges, or other physical characteristics of the item that may damage the watervaporproof bag or container shall be cushioned, and the item shall also be cushioned as required to mitigate shock and vibration. Requirements for desiccant and humidity indicators:",
        options: [
          "Desiccant (activated) — bagged, activated desiccant conforming to MIL-D-3464 (Type I unless Type II or III is required), strategically located in the pack so as not to be load bearing, and not in direct contact with critical surfaces of the item.",
          "Quantity of desiccant — computed using Formula I (sealed container other than rigid all-metal: U = CA + X1D + X2D + X3D + X4D) or Formula II (sealed rigid metal container: U = KV + X1D + X2D + X3D + X4D); see the standard for the full variable definitions.",
          "Humidity indicators — shall conform to MS20003 and be firmly secured directly behind the inspection window or immediately within the closure seal of the container.",
        ],
      },
      {
        code: "51",
        description:
          "Watervaporproof bag with desiccant, heat sealed. The item, preserved, wrapped, cushioned and desiccated with humidity indicator as required, shall be enclosed within a heat sealed bag conforming to one of the following:",
        options: [
          "MIL-DTL-117, Type I, Class E, Style 1, 2 or 3 (see notes 1, 2).",
          "MIL-DTL-117, Type II, Class E, Style 1 or Type IV, Class E, Style 1 (see note 2).",
        ],
        notes: [
          "1. When specified in the contract or order, a carton or box shall be required to complete the unit container and the primary cushioning shall be placed between the outside of the bag and the inside of the carton or box.",
          "2. When MIL-DTL-117, Type II, Class E, Style 1 bags are selected, they shall be limited to the restrictions detailed in MIL-PRF-131 for Class 2 material.",
        ],
      },
      {
        code: "52",
        description:
          "Container, watervaporproof bag with desiccant, heat sealed, container. The item, preserved, wrapped, cushioned and desiccated with humidity indicator as required, shall be enclosed in a close fitting inner container (box) selected from Table C-I. The item and container shall then be enclosed in a heat-sealed bag conforming to MIL-DTL-117, Type I, Class E, Style 1; or Type II, Class E, Style 1; or Type IV, Class E, Style 1. Bags in accordance with MIL-DTL-6060 shall be used when the construction limitations of MIL-DTL-117 are exceeded. The sealed bag shall then be enclosed within an appropriate outer container (box) selected from Table C-II.",
      },
      {
        code: "53",
        description:
          "Floating watervaporproof bag with desiccant, heat sealed. The item, preserved, wrapped, cushioned, and desiccated with humidity indicator as required and anchored or shock mounted as necessary, shall be enclosed in a sealed bag conforming to MIL-DTL-6060. When specified in the contract or order, a window of material conforming to MIL-PRF-22191, Type I shall be provided in the bag for packs 15 cubic feet or larger. When specified, externally mounted plug type humidity indicators conforming to SAE AS26860 shall be used. When an exterior container is placed over the floating bag, a removable inspection port shall be provided, situated to coincide with the inspection window or mounted humidity plug.",
      },
      {
        code: "54",
        description:
          "Rigid container (other than metal) with desiccant, sealed. The item, preserved, wrapped, cushioned and desiccated with humidity indicator as required, shall be enclosed in a sealed, close fitting, rigid container other than all metal. Any sealed, rigid container other than all metal may be used if it provides a WVTR not exceeding 0.075 gram per 100 square inches per 24 hours when tested in accordance with ASTM D4279 using the constant atmosphere method.",
      },
      {
        code: "55",
        description:
          "Rigid metal container with desiccant, sealed. The item, preserved, wrapped, cushioned and desiccated with humidity indicator as required, shall be enclosed in a sealed, close fitting, metal container. Any selected type of rigid metal container with a machine seamed or welded closure, or reusable container with a gasketed or threaded closure, shall be used.",
      },
      { code: "ZZ", description: "Special requirement — see specific instructions or drawings provided." },
    ],
  },
  {
    key: "specializedPreservation",
    label: "Specialized Preservation Procedure",
    tableRef: "Table J-Ia",
    placeholder: "e.g. AE",
    entries: [
      { code: "AE", description: "Seal or plug all openings and preserve by Method 10." },
      {
        code: "AH",
        description:
          "Preserve Method 20 as follows: Fog spray or flush internally with preservative indicated by preservation code. All openings shall then be plugged or sealed to prevent entrance of dirt and moisture. Exterior unpainted ferrous metal surfaces shall be coated with a suitable paint or enamel, or coated with cold application, nontacky, corrosion preventive compound conforming to MIL-PRF-16173, Grade 4.",
      },
      {
        code: "AU",
        description:
          "Preservative compounds shall not be applied to windings, commutators or peripheries of armatures or rotors. Shafts shall be coated with MIL-PRF-16173, Grade 2 preservative and wrapped with MIL-PRF-121 material, secured in place with ASTM-D5486 tape. Commutators shall be wrapped with MIL-PRF-121 material, held in place with ASTM D5486 tape. Exposed surfaces of steel collector rings shall be coated with MIL-PRF-16173, Grade 2 preservative. No preservative is required for bronze, brass or corrosion resisting metals. All collector rings shall be wrapped with MIL-PRF-121 material, secured in place with ASTM D5486 tape. Corrodible surfaces, except shafts, commutators, and collector rings, may be preserved by the use of insulating varnish applied during the manufacturing process. In addition to the foregoing requirements, armatures and rotors shall be wrapped with MIL-PRF-121 material, secured with ASTM D5486 tape.",
      },
      {
        code: "AW",
        description:
          "Preserve in accordance with any of the following alternate methods (used for gaskets and similar items):",
        options: [
          "Seal in bags conforming to Class B, C or E of MIL-DTL-117, using stiffening material internally if needed to maintain rigidity.",
          "Preservation method 42 or 44.",
          "Place between sheet of, or in fold of, corrugated fiberboard of sufficient stiffness to resist bending, overwrap with waterproof wrapping paper conforming to PPP-B-1055 and seal with pressure sensitive tape conforming to ASTM D5486 or adhesive conforming to MMM-A-260. Authorization to use other waterproof barrier materials may be granted upon request.",
        ],
      },
      {
        code: "BC",
        description:
          "Preserve by Method 20 as follows: Coat all pieces of set with preservative compound conforming to MIL-PRF-16173, Grade 4. Wrap or bag each preserved piece individually in MIL-PRF-121 material. Cushion or segregate individually wrapped or bagged pieces in the storage container to prevent movement and possible physical damage. (Segregated identical pieces, such as buckets and seal strips, are to be kept as close together in the container as possible to facilitate ease of counting.) Individually preserved, wrapped or bagged pieces need not be identified since container markings are in accordance with MIL-STD-129. Itemized packing lists for inclusion within or attachment to the outside of the container shall be furnished in accordance with MIL-STD-129. The lists shall show quantity and nomenclature of all items included in the set. (Used for turbine blade sets and similar items.)",
      },
      {
        code: "BD",
        description:
          "Remove parts made of rubber, fiber, or nonmetallic materials adversely affected by preservative compounds and package by Method 41 without a preservative. Preserve metal parts of assembly to conform to the requirements of Method 40. Mark the bag containing nonmetallic parts \"Parts for Assembly\" and include it within, or securely attached to, the pack containing metal parts in a manner which will assure its being found when the pack is opened. (Use for couplings and similar items.)",
      },
      { code: "BL", description: "Plug or seal all openings and preserve using Method 20." },
      {
        code: "DB",
        description:
          "Preserve by Method 10 modified as follows: Preserve in transparent barrier bag made of A-A-3174 or Type III MIL-PRF-22191 material. A-A-3174 or MIL-PRF-22191, Type III material, A-A-3129 or PPP-C-795 cushioning shall be used to cushion sharp edges and protrusions of the preserved items. Bag closure shall be made by any suitable means, except that staples shall not be used. When use of a bag is not practicable, the item shall be completely wrapped in the above barrier or cushioning material and secured with pressure sensitive tape. Also, the use of shaped or molded packs utilizing MIL-PRF-22191 or A-A-3174 materials in conjunction with plastic coated board is acceptable provided the pack's cube is not increased and the pack meets the tests specified in Appendix G. Strip or block form of multiple packages shall incorporate provisions for separating unit quantities.",
      },
      {
        code: "DC",
        description:
          "Preserve by Method 20 modified as follows: Preserve in a transparent barrier wrap made of Type II, MIL-PRF-22191 barrier material, or bag conforming to Type II, Class C, Style 2 of MIL-DTL-117. MIL-PRF-22191, Type II barrier material shall be used to cushion sharp edges and protrusions of item to prevent bag puncture. A-A-3129 or PPP-C-795 may also be used to cushion sharp edges and protrusions if item is first wrapped in MIL-PRF-22191, Type II barrier material. The bag closure shall be made by any suitable means, except that staples shall not be used. Also, the use of shaped, preformed or molded packages utilizing MIL-PRF-22191 or A-A-3174 materials in conjunction with plastic coated board is acceptable, provided that the package cube is not increased and materials are compatible with preservative specified. However, these packages shall be capable of meeting the tests specified in Appendix G. Strip or block form of multiple packages shall incorporate provisions for separating unit quantities.",
      },
      {
        code: "DR",
        description:
          "Preserve by Method 30 as follows: Each unit shall have all internal fluid-carrying passages, which are not prelubricated, filled with the specified preservative, allowing space for internal thermal expansion. If filling is not practical, the unit shall be internally fog-sprayed or flushed, then drained to the drip point. All ports, fittings, openings, etc., shall be capped or plugged with noncorrosive (non-interacting) metal caps or plugs conforming to NAS 847 or equivalent. All hydraulic preservative operating fluid used shall be filtered through a 3 micron absolute filter prior to being used as specified above. Exterior bare metal surfaces, subject to corrosion, shall be coated with compound conforming to MIL-PRF-16173, Grade 2 or MIL-C-11796, Class 3. Unit shall be wrapped with a greaseproof wrap conforming to MIL-PRF-121 or equivalent; seal seams with ASTM D5486 tape to effect a measure of waterproofness and prevent unwrapping. The unit must be adequately cushioned with material specified and placed in a grade V3c container fabricated in accordance with ASTM D5118/D5118M (as a minimum), Style FOL or CSSC. All seams, corners, and manufacturer's joint shall be tape-sealed with two inch tape conforming to ASTM D5486, Type III or IV.",
      },
      {
        code: "DW",
        description:
          "Preserve by Method 52 as follows: Item shall be cleaned, wrapped, blocked and braced, with desiccant in an interior fiberboard box fabricated in accordance with ASTM D5118/D5118M, Class domestic. Desiccant shall be placed inside the fiberboard box. A humidity indicator shall be placed on the outside of the fiberboard box. MIL-PRF-131 barrier material, sealed as required, shall be utilized around the first container. The cushioning, to be specified under the cushioning code and in the thickness required to adequately protect the item, shall be placed between the barrier and the outer container.",
      },
      {
        code: "EK",
        description:
          "Preserve by Method 10 as follows: Each bolt shall have the shank and threads protected by means of a sleeve extending over the full length of the shank and thread. The sleeve shall be manufactured from paperboard, asphalt impregnated chipboard, or spiral wrap of kraft paper over chipboard, lined with material conforming to MIL-PRF-121. Plastic sleeve coverings may also be used.",
      },
      {
        code: "GS",
        description:
          "Preserve by Method 33 (modified) in a transparent, flexible, sealable, volatile corrosion inhibitor treated bag conforming to MIL-DTL-22020. The interleaf furnished inside each Class 2, cold sealable bag shall be withdrawn after inserting item and prior to final sealing in accordance with MIL-DTL-22020. Items with sharp edges or protrusions shall be wrapped with sufficient layers of transparent, flexible, pressure (cold) sealable volatile corrosion inhibitor barrier material conforming to MIL-PRF-22019, Type II to prevent bag puncture. The latex coated (nonprinted) side of the barrier material shall always be facing the item. Alternately, the item may be completely wrapped with transparent, flexible, pressure (cold) sealable volatile corrosion inhibitor barrier material conforming to MIL-PRF-22019, Type II as indicated above and further preserved in a transparent barrier bag conforming to Type II, Class C, Style 2 of MIL-DTL-117. Closure shall be by heat-sealing when this alternate method is used. In addition to markings required elsewhere in the contract, unit identification and caution labels shall be in accordance with MIL-STD-129.",
      },
      {
        code: "GX",
        description:
          "Preserve by Method 41 using an approved ESD control program as follows: Items subject to damage by electromagnetic and electrostatic field forces shall be initially wrapped in material conforming to MIL-PRF-81705, Type III, or bags conforming to MIL-DTL-117, Type II, Class H, Style 2, and sufficiently cushioned in material conforming to A-A-3129, Type I, Grade B or PPP-C-795, Class 2 or MIL-DTL-81997, Type II or PPP-C-1797, Type II or A-A-59136, Class 1, Grade B or MIL-PRF-26514, Type III, Class 2, to protect item and to prevent bag puncture, and unit packed in a heat-sealed bag conforming to MIL-DTL-117, Type I, Class F, Style 1. Alternately if applicable, reclosable cushioned pouches conforming to MIL-DTL-81997, Type I may be used in lieu of initial wrap and cushioning. Lead or terminal configurations for all items shall be maintained as manufactured without causing loads or stresses capable of causing damage to the item. Materials used to maintain item position and lead or terminal configuration shall permit item removal without damage to the item. Electrostatic discharge (ESD) sensitive caution labels shall be applied in accordance with MIL-STD-129.",
      },
      {
        code: "HM",
        description:
          "Packaging and marking for hazardous materials shall comply with applicable requirements for Performance Oriented Packaging contained in the International Air Transport Association (IATA) Dangerous Goods Regulations or the International Maritime Dangerous Goods Code (IMDG) and with Code of Federal Regulations (CFR) Title 29, Title 40 and Title 49. All performance test requirements shall be supported by certificates and reports attesting to the date and the results obtained from performance oriented packaging testing. The contractor, if not a self-certifier, shall be responsible for assuring that third party sources providing performance testing services are, in fact, registered with the Department of Transportation. The contractor's signed certification that the packaged configuration meets IATA or IMDG requirements shall be incorporated on the DD Form 250, Material Inspection and Receiving Report, and other related acceptance document if the DD Form 250 is not used. All certificates and reports shall be available for inspection by authorized Government representatives for a period of three years.",
      },
      {
        code: "JF",
        description:
          "Preserve by Method 10 — Items shall be preserved in a vacuum formed skin pack, formed from either cellulose acetate, cellulose butyrate or cellulose propionate. The material shall be 10 to 15 mils minimum thickness prior to draw and 2 to 4 mils thickness after draw. Class domestic fiberboard meeting the requirements of ASTM D4727/D4727M shall be used as a stiffener.",
      },
    ],
  },
  {
    key: "cleaningProcedure",
    label: "Cleaning & Drying Procedure",
    tableRef: "Table J-II",
    placeholder: "e.g. 1",
    entries: [
      { code: "1", description: "Any suitable process that is not injurious to the item." },
      { code: "Z", description: "Special requirements — see specific instructions or drawings provided." },
      { code: "0", description: "No requirement." },
    ],
  },
  {
    key: "contactPreservative",
    label: "Contact Preservative Material",
    tableRef: "Table J-III",
    placeholder: "e.g. 07",
    entries: [
      { code: "01", description: "MIL-PRF-16173, Grade 1, corrosion preventive, solvent cutback, cold application, hard film." },
      { code: "02", description: "MIL-PRF-16173, Grade 2, corrosion preventive, solvent cutback, cold application, soft film." },
      { code: "03", description: "MIL-PRF-16173, Grade 3, corrosion preventive, solvent cutback, cold application, water displacing soft film." },
      { code: "06", description: "MIL-C-11796, Class 3, light preservative compound, soft film, hot application." },
      { code: "07", description: "MIL-PRF-3150, medium preservative oil, cold application." },
      { code: "09", description: "MIL-PRF-32033, lubricating oil, general purpose preservative (water displacing, low temperature)." },
      { code: "10", description: "MIL-PRF-21260, preservative and break-in lubricating oil, internal combustion engine, Grade 10, 30 or 50." },
      { code: "11", description: "MIL-PRF-23827, grease, aircraft and instrument, gear and actuator screw." },
      { code: "12", description: "MIL-PRF-81322, grease, aircraft, general purpose." },
      { code: "13", description: "MIL-PRF-10924, grease, automotive and artillery." },
      { code: "15", description: "MIL-PRF-46170, hydraulic fluid, synthetic, rust inhibited, fire resistant." },
      { code: "17", description: "MIL-PRF-6085, lubricating oil, instrument, aircraft, low volatility." },
      { code: "19", description: "MIL-PRF-16173, Grade 4, corrosion preventive, solvent cutback, cold application, transparent, non-tacky." },
      { code: "20", description: "MIL-PRF-46002, preservative oil, contact and volatile corrosion inhibited." },
      { code: "21", description: "MIL-PRF-16173, Grade 5, corrosion preventive, solvent cutback, water displacing soft film, low pressure steam removable." },
      { code: "30", description: "MIL-PRF-46010, corrosion inhibiting lubricant, solid film, heat cured." },
      { code: "31", description: "MIL-C-6529, Type II, corrosion preventive, ready mixed, for reciprocating aircraft engines." },
      { code: "32", description: "MIL-C-6529, Type III, corrosion preventive, ready mixed, for turbojet aircraft engines." },
      { code: "33", description: "MIL-PRF-7808, lubricating oil, synthetic base, for aircraft turbine engines." },
      { code: "49", description: "Vendor's protective grease or oil coating." },
      { code: "50", description: "MIL-PRF-7870, lubricating oil, low temperature." },
      { code: "51", description: "MIL-PRF-6081, lubricating oil, jet engine, Grade 1010." },
      { code: "52", description: "MIL-PRF-8188, corrosion preventive oil, synthetic base, for aircraft gas turbine engines." },
      { code: "56", description: "MIL-PRF-23699, lubricating oil, synthetic base, for aircraft turbine engines." },
      { code: "57", description: "MIL-PRF-21260, Grade 10, light viscosity preservative and break-in lubricating oil, internal combustion engine." },
      { code: "65", description: "MIL-PRF-83282, hydraulic fluid, synthetic, fire retardant." },
      { code: "80", description: "MIL-DTL-53030, primer coating, epoxy, water reducible." },
      { code: "89", description: "Preserve with normal operating lubricant." },
      { code: "ZZ", description: "Special requirement — see specific instructions or drawings provided." },
      { code: "00", description: "No requirement." },
    ],
  },
  {
    key: "wrappingMaterial",
    label: "Wrapping Material",
    tableRef: "Table J-IV",
    placeholder: "e.g. GB",
    entries: [
      { code: "BA", description: "QQ-A-1876, aluminum foil." },
      { code: "CA", description: "A-A-203, kraft wrapping paper." },
      { code: "DA", description: "A-A-1249, paper, tissue." },
      { code: "EA", description: "MIL-DTL-17667, neutral wrapping paper." },
      { code: "EB", description: "MIL-DTL-17667, Type I, neutral wrapping paper, flat." },
      { code: "EC", description: "MIL-DTL-17667, Type II, neutral wrapping paper, creped." },
      { code: "FA", description: "MIL-P-130, laminated and creped wrapping paper." },
      { code: "GB", description: "MIL-PRF-121, greaseproof, waterproof barrier." },
      { code: "GC", description: "MIL-PRF-121, Type I, medium duty, greaseproof, waterproof barrier." },
      { code: "GH", description: "MIL-PRF-121, Type II, light duty, greaseproof, waterproof barrier." },
      { code: "JA", description: "A-A-3174, plastic sheet, polyolefin, 2 mil." },
      { code: "JL", description: "MIL-PRF-22019, transparent volatile corrosion inhibitor treated barrier material." },
      { code: "JT", description: "MIL-PRF-22191, Type II, transparent, waterproof, greaseproof barrier material." },
      { code: "JV", description: "MIL-PRF-22191, Type III, transparent, waterproof barrier material." },
      { code: "K3", description: "MIL-PRF-81705, Type III, Class 1, transparent, electrostatic protective, static shielding, barrier material or MIL-DTL-117, Type II, Class H, Style 2 bag." },
      { code: "LA", description: "A-A-50177, lens paper." },
      { code: "MB", description: "MIL-PRF-3420, volatile corrosion inhibitor treated material." },
      { code: "ZZ", description: "Special requirements — see specific instructions or drawings provided." },
      { code: "00", description: "No requirement." },
    ],
  },
  {
    key: "cushioningMaterial",
    label: "Cushioning & Dunnage Material",
    tableRef: "Table J-V",
    placeholder: "e.g. GE",
    entries: [
      { code: "AD", description: "Cushion, anchor, block or brace as required." },
      { code: "BG", description: "A-A-1898, Grade II, water resistant cellulosic cushioning." },
      { code: "BN", description: "PPP-C-850, polystyrene cushioning." },
      { code: "DA", description: "A-A-1051, paperboard cushioning." },
      { code: "FA", description: "PPP-C-1120, Class A, water resistant bound fiber." },
      { code: "FE", description: "PPP-C-1120, Type II, Class A, medium soft density, water resistant bound fiber." },
      { code: "FH", description: "PPP-C-1120, Type III, Class A, medium firm density, water resistant bound fiber." },
      { code: "FL", description: "PPP-C-1120, Type IV, Class A, firm density, water resistant bound fiber." },
      { code: "GA", description: "A-A-59136, cushioning material, closed cell, foam plank." },
      { code: "GD", description: "MIL-PRF-26514, Type I, Class 1, rigid polyurethane foam." },
      { code: "GE", description: "MIL-PRF-26514, Type I, Class 2, Grade A, flexible polyurethane foam, light load range." },
      { code: "GF", description: "MIL-PRF-26514, Type I, Class 2, Grade B, flexible polyurethane foam, medium load range." },
      { code: "GH", description: "MIL-PRF-26514, Type I, Class 2, Grade C, flexible polyurethane foam, heavy load range." },
      { code: "GK", description: "MIL-PRF-26514, Type III, Class 2, Grade A, Anti-static, flexible polyurethane foam, light load range." },
      { code: "GL", description: "MIL-PRF-26514, Type III, Class 2, Grade B, Anti-static, flexible polyurethane foam, medium load range." },
      { code: "GM", description: "A-A-59136, Type I, Class 1, Grade A, standard polyethylene, closed cell foam plank cushioning material." },
      { code: "GN", description: "A-A-59136, Type I, Class 1, Grade B, static dissipative, polyethylene, closed cell plank cushioning material." },
      { code: "GT", description: "PPP-C-1797, polypropylene foam cushioning." },
      { code: "HA", description: "A-A-1507, chipboard sheet used as a stiffener on one side of item." },
      { code: "HB", description: "A-A-1507, chipboard sheet used as a stiffener on both sides of item." },
      { code: "HD", description: "A-A-1507, chipboard sheet used as pads, cells, die cuts or sleeves." },
      { code: "JA", description: "ASTM D4727/D4727M, domestic fiberboard used as a stiffener on one side of item." },
      { code: "JB", description: "ASTM D4727/D4727M, domestic fiberboard used as a stiffener on both sides of item." },
      { code: "JC", description: "ASTM D4727/D4727M, domestic fiberboard used as pads, cells, die cuts or sleeves." },
      { code: "LC", description: "PPP-C-795, Class 1, cellular plastic film cushioning." },
      {
        code: "LK",
        description:
          "Wood blocking and bracing, fasteners, or steel strapping, for tie-down purposes. If the item has rubber tired wheels, the wheels shall be blocked clear of the floor of the crate or skid and shall not be load bearing.",
      },
      {
        code: "LN",
        description:
          "Plastic containers (vials, boxes, etc.) shall be constructed of rigid, transparent material that, if applicable, is resistant to any lubricant or preservative being used.",
      },
      { code: "LT", description: "PPP-C-795, Class 2, antistatic closed cell plastic film cushioning." },
      { code: "MA", description: "MIL-PRF-83671, Class 2, Grade A, flexible foam-in-place polyurethane." },
      { code: "MB", description: "MIL-PRF-83671, Class 1, rigid foam-in-place polyurethane." },
      { code: "MD", description: "MIL-PRF-83671, Class 2, Grade B, flexible foam-in-place polyurethane." },
      { code: "NA", description: "PPP-C-795, closed cell plastic cushioning; or A-A-3129, open cell plastic cushioning; or PPP-C-1797, polypropylene foam cushioning." },
      { code: "NB", description: "A-A-3129, Type I, Grade B, static dissipative open cell plastic cushioning." },
      { code: "NC", description: "PPP-C-1797, Type II, electrostatic protective, polypropylene foam, resilient, low density." },
      { code: "NG", description: "A-A-3129, Type I, Grade A, open cell plastic cushioning." },
      {
        code: "NS",
        description:
          "Weather resistant fiberboard meeting the requirements of ASTM D4727/D4727M used as pads, cells, die cuts or sleeves; or polyurethane foam conforming to MIL-PRF-26514.",
      },
      { code: "P4", description: "MIL-DTL-81997, Type I, cushioned pouch, electrostatic protective, transparent." },
      { code: "P5", description: "ASTM D5168, triple wall fiberboard used as pads, cells, sleeves, or die-cuts." },
      { code: "P6", description: "A-A-59135, packaging material, sheet." },
      { code: "ZZ", description: "Special requirements. See specific instructions or drawings provided." },
      { code: "00", description: "No requirement." },
    ],
  },
  {
    key: "cushioningThickness",
    label: "Cushioning Thickness",
    tableRef: "Table J-VI",
    placeholder: "e.g. H",
    entries: [
      { code: "A", description: "Minimum thickness: 1/4 inch thick." },
      { code: "B", description: "Minimum thickness: 1/2 inch thick." },
      { code: "C", description: "Minimum thickness: 3/4 inch thick." },
      { code: "D", description: "Minimum thickness: 1 inch thick." },
      { code: "E", description: "Minimum thickness: 1-1/4 inches thick." },
      { code: "F", description: "Minimum thickness: 1-1/2 inches thick." },
      { code: "G", description: "Minimum thickness: 1-3/4 inches thick." },
      { code: "H", description: "Minimum thickness: 2 inches thick." },
      { code: "J", description: "Minimum thickness: 2-1/4 inches thick." },
      { code: "K", description: "Minimum thickness: 2-1/2 inches thick." },
      { code: "L", description: "Minimum thickness: 2-3/4 inches thick." },
      { code: "M", description: "Minimum thickness: 3 inches thick." },
      { code: "N", description: "Minimum thickness: 3-1/4 inches thick." },
      { code: "P", description: "Minimum thickness: 3-1/2 inches thick." },
      { code: "Q", description: "Minimum thickness: 3-3/4 inches thick." },
      { code: "R", description: "Minimum thickness: 4 inches thick." },
      { code: "S", description: "Minimum thickness: 4-1/4 inches thick." },
      { code: "T", description: "Minimum thickness: 4-1/2 inches thick." },
      { code: "U", description: "Minimum thickness: 4-3/4 inches thick." },
      { code: "V", description: "Minimum thickness: 5 inches thick." },
      { code: "W", description: "Minimum thickness: 5-1/4 inches thick." },
      { code: "Z", description: "Special requirements — see specific instructions or drawings provided." },
      { code: "0", description: "Not applicable." },
    ],
  },
  {
    key: "unitContainer",
    label: "Unit / Intermediate Container",
    tableRef: "Table J-VII",
    placeholder: "e.g. E5",
    entries: [
      { code: "10", description: "Any suitable container included in this table may be used." },
      { code: "A1", description: "Bags made of material conforming to MIL-P-130, or any bag authorized by MIL-DTL-117. Closure may be by staples or tape." },
      { code: "A2", description: "Any bag or sack used by the vendor." },
      { code: "AN", description: "UU-B-36, bags, paper grocers." },
      { code: "B2", description: "MIL-DTL-117, Type II, Class C, Style 3, medium duty, waterproof, greaseproof, one side opaque and other side transparent bag." },
      { code: "B3", description: "MIL-DTL-117, Type I, Class E, Style 3, heavy duty, watervaporproof, greaseproof, one side opaque and other side transparent bag." },
      { code: "B9", description: "MIL-DTL-117, Type I, Class F, Style 1, heavy duty, watervaporproof, electrostatic protective, opaque bag." },
      { code: "BD", description: "MIL-DTL-117, bag." },
      { code: "BE", description: "MIL-DTL-117, Type II, Class C, Style 1, medium duty, waterproof, greaseproof, opaque bag." },
      { code: "BL", description: "MIL-DTL-117, Type III, Class B, Style 2, light duty, waterproof, transparent bag." },
      { code: "BS", description: "MIL-DTL-117, Type I, Class E, Style 1, heavy duty, watervaporproof, greaseproof, opaque bag." },
      { code: "BT", description: "MIL-DTL-22020, bag, transparent, heat sealable, VCI treated." },
      { code: "BV", description: "MIL-DTL-117, Type III, Class C, Style 1, light duty, waterproof, greaseproof, opaque bag." },
      { code: "D1", description: "PPP-B-566 or PPP-B-676, folding or setup box." },
      { code: "D3", description: "PPP-B-566, PPP-B-676, or ASTM D5118/D5118M, folding, setup or fiberboard box." },
      { code: "D4", description: "Vendor's setup or folding box." },
      { code: "DA", description: "PPP-B-566, folding paperboard box." },
      { code: "DE", description: "PPP-B-676, setup box." },
      { code: "DO", description: "Any suitable fiber box included in this table may be used." },
      { code: "DP", description: "ASTM D5168, box, triple wall, fiberboard." },
      { code: "DQ", description: "ASTM D5168, Class 1, non-weather resistant triple wall fiberboard box." },
      { code: "DR", description: "ASTM D5168, Class 2, weather resistant triple wall fiberboard box." },
      { code: "E5", description: "ASTM D5118/D5118M, fiberboard box." },
      { code: "E6", description: "Vendor's fiberboard box." },
      { code: "E7", description: "ASTM D5118/D5118M, Type CF, Class domestic, single wall, corrugated fiberboard box." },
      { code: "E8", description: "ASTM D5118/D5118M, Type CF, Class domestic, double wall, corrugated fiberboard box." },
      { code: "E9", description: "ASTM D5118/D5118M, Class weather resistant fiberboard box; or PPP-B-566, water resistant folding box; or PPP-B-676, water resistant setup box." },
      { code: "EC", description: "ASTM D5118/D5118M, Type CF, Class domestic, corrugated fiberboard box." },
      { code: "ED", description: "ASTM D5118/D5118M, Type CF, Class weather resistant, corrugated fiberboard box." },
      { code: "EE", description: "ASTM D5118/D5118M, Type CF, Class weather resistant, single wall, corrugated fiberboard box." },
      { code: "EF", description: "ASTM D5118/D5118M, Type CF, Class Weather Resistant, single wall, Full Telescoping container." },
      { code: "EG", description: "ASTM D5118/D5118M, Type CF, Class Weather Resistant, double wall, Full Telescoping container." },
      { code: "EN", description: "ASTM D5118/D5118M, Type SF, Class domestic, solid fiberboard box." },
      { code: "EP", description: "ASTM D5118/D5118M, Type SF, Class weather resistant, solid fiberboard box." },
      { code: "F2", description: "ASTM D6251, Type III, Class 2, overseas cleated plywood box or ASTM-D6880, Class 2, heavy duty nailed wood box." },
      { code: "F3", description: "ASTM D6251, Type III, Class 1, domestic cleated plywood box or ASTM D6880, Class 1, light duty nailed wood box." },
      { code: "F5", description: "Vendor's wood box." },
      { code: "F6", description: "ASTM D6251, Type III, Treatment B, Style I or J, cleated plywood box, surface treated in accordance with the requirements of the specification." },
      {
        code: "F7",
        description:
          "ASTM D6251, Type III, or ASTM D6880, heavy or light duty, determined by shipment destination. Provided with nominal 2\" x 4\" skid. Box provided with an inspection door, located for clear reading of the humidity indicator, for Method 54 only. Inspection door shall be hinged, cleated or sealed (similar to inspection door specified in ASTM D7478/D7478M). Wood and plywood boxes shall have top panels secured with wood screws and boxes banded. The top, one side, and one end of the box shall be marked \"REUSABLE CONTAINER AND CUSHIONING -USE FOR RETURN OF NRFI ASSEMBLY\" with black letters, minimum 2\" high. In addition, mark box \"TO OPEN -USE SCREWDRIVER\" with one inch minimum high letters.",
      },
      {
        code: "F9",
        description:
          "Shallow box, constructed of plywood and wood as follows: Sides and ends of one piece of lumber, 3/4 inch minimum thickness. Top and bottom of one piece standard grade 3/8 inch plywood with exterior weather-resistant glue. End cleats shall run across the grain of the ends and shall extend within 1/8 inch of the outside surface of the top and bottom. Sides shall extend over the cleats. Battens shall be applied in accordance with ASTM D6880 except exterior battens or cleats shall not be used on the top.",
      },
      { code: "FA", description: "ASTM D6880, wood box." },
      { code: "FB", description: "ASTM D6880, Class 1, light duty wood box." },
      { code: "FC", description: "ASTM D6880, Class 2, heavy duty wood box." },
      { code: "FD", description: "ASTM D6251, Type III, wood cleated plywood box." },
      { code: "FF", description: "ASTM D6251, Type III, Class 2, wood cleated plywood box, overseas." },
      { code: "FG", description: "ASTM D6251, Type III, Class 1, wood cleated plywood box, domestic." },
      { code: "FL", description: "ASTM D6251, Type II, Class 1, domestic, wood-cleated panelboard box." },
      { code: "FO", description: "Any suitable wood box included in this table may be used." },
      { code: "FU", description: "ASTM D6256/D6256M, wood-cleated skidded box, load bearing base." },
      { code: "FV", description: "ASTM D6256/D6256M, Class 1, domestic, wood-cleated skidded box." },
      { code: "FW", description: "ASTM D6256/D6256M, Class 2, overseas, wood-cleated skidded box." },
      {
        code: "GB",
        description:
          "ASTM D6256/D6256M, Class 1 or 2. Provide box with inspection door located for clear reading of the humidity indicator for Method 54 packages only. The inspection door shall be hinged, cleated and sealed (similar to inspection door specified by ASTM D7478/D7478M). The top, one side and one end of the shipping container shall be marked \"REUSABLE CONTAINER – USE FOR RETURN OF NRFI ASSEMBLY\" in black letters, minimum 2\" high.",
      },
      { code: "HA", description: "PPP-C-96, metal can." },
      { code: "K1", description: "MIL-DTL-6054 or MIL-D-6055, metal reusable drum, depending upon size or capacity limits of container." },
      { code: "KE", description: "MIL-DTL-6054, reusable metal drum." },
      { code: "KF", description: "MIL-D-6055, reusable metal drum (capacity from 88 to 510 cu. in.)." },
      { code: "MA", description: "ASTM D7478/D7478M, wood crate, lumber or plywood sheathed, nailed or bolted." },
      { code: "MB", description: "ASTM D7478/D7478M, Type I, Class 1, nailed wood crate, lumber sheathed." },
      { code: "MC", description: "ASTM D7478/D7478M, Type II, Class 1, bolted wood crate, lumber sheathed." },
      { code: "MF", description: "ASTM D7478/D7478M, Type I, Class 2, nailed wood crate, plywood sheathed." },
      { code: "MG", description: "ASTM D7478/D7478M, Type II, Class 2, bolted wood crate, plywood sheathed." },
      {
        code: "MH",
        description:
          "ASTM D7478/D7478M, Type II, Class 1 or 2, bolted wood crate, provided with lifting attachments and an inspection port (Method 54 packages only). The top, one side and one end of the crate shall be marked \"REUSABLE CONTAINER – USE FOR RETURN OF NRFI ASSEMBLY\" with black letters a minimum of two inches high.",
      },
      { code: "MO", description: "Any suitable wood crate included in this table may be used." },
      { code: "MV", description: "ASTM D6039/D6039M, open and covered wood crate." },
      { code: "MY", description: "NAVICP Drawing No. 15024, for shipping and storage of gyroscopic instruments." },
      { code: "NO", description: "ASTM-D5118/D5118M, Type CF, Class weather resistant, double wall, corrugated fiberboard box." },
      { code: "NR", description: "PPP-B-1672, Type I, vertical star cushioning in reusable box." },
      { code: "NS", description: "PPP-B-1672, Type II, folding convoluted cushioning in reusable box." },
      { code: "NV", description: "PPP-B-1672, Type III, telescoping encapsulated cushioning in reusable box." },
      { code: "NW", description: "PPP-B-1672, Type IV, horizontal star cushioning in reusable box." },
      { code: "NY", description: "NAVICP Drawing No. P069, molded reusable container for circuit cards and modules." },
      { code: "NZ", description: "NAVICP Drawing No. 13414, modular reusable container for packaging major repairables." },
      { code: "P4", description: "MIL-DTL-81997, cushioned pouch, electrostatic protective, transparent." },
      { code: "RC", description: "NAVICP Drawing No. 15450, modular reusable container for packaging depot level repairables." },
      { code: "RD", description: "PPP-B-585, wirebound wood box." },
      { code: "RH", description: "MIL-DTL-2427, ammunition box, nailed wood." },
      { code: "RJ", description: "MIL-DTL-46506, ammunition box, wirebound wood." },
      { code: "RK", description: "MIL-PRF-11264, reusable wood containers, heavy duty." },
      { code: "SD", description: "MIL-DTL-117, Type II, Class C, Style 2, medium duty, waterproof, greaseproof, transparent bag." },
      { code: "SE", description: "MIL-DTL-117, Type I, Class E, Style 2, heavy duty, watervaporproof, greaseproof, transparent bag." },
      { code: "SF", description: "MIL-DTL-117, Type II, Class E, Style 1, medium duty, watervaporproof, greaseproof, opaque bag." },
      { code: "SH", description: "MIL-DTL-6060, complex, heat sealable, watervaporproof bags." },
      { code: "SJ", description: "MIL-B-43666, Type III, box, consolidation." },
      { code: "SK", description: "MIL-DTL-117, Type IV, Class E, Style 1, extra heavy duty, watervaporproof, greaseproof, opaque bag." },
      { code: "WD", description: "Plastic containers constructed of rigid transparent material that, if applicable, is resistant to lubricant or preservative being used. Containers too small for adequate marking shall be overpackaged in envelopes for identification marking purposes." },
      { code: "WM", description: "PPP-T-495, mailing tube." },
      { code: "WY", description: "Warner-Robins Air Logistics Center Drawing Nos. 11214-5002-100, 11214-5002-200, 11214-5002-300, or 11214-50020-400 for shipping and storage of avionics instruments." },
      { code: "ZZ", description: "Special requirement — see specific instructions or drawings provided." },
      { code: "00", description: "No requirement." },
    ],
  },
  {
    key: "unitContainerLevel",
    label: "Unit Container Level",
    tableRef: "Table J-VIII",
    placeholder: "e.g. A",
    entries: [
      { code: "O", description: "Unit container is not an acceptable shipping container." },
      { code: "A", description: "Unit container provides level A packing protection." },
      { code: "B", description: "Unit container provides level B packing protection." },
      { code: "Z", description: "Unit container requires special consideration (air only, inside storage only, etc.)" },
    ],
  },
  {
    key: "optionalProcedure",
    label: "Optional Procedure Indicator",
    tableRef: "Table J-VIIIa",
    placeholder: "e.g. E",
    entries: [
      {
        code: "A",
        description:
          "Packaging is in accordance with a procedural specification or an SPI. The appropriate specification number will be shown in-the-clear in the supplemental data area.",
      },
      {
        code: "E",
        description:
          "Certain options can be exercised as to specific method of preservation or DoD approved packaging materials, but only as indicated in supplemental data. However, basic preservation method shall be retained and unit package dimensions shall not be increased by more than one inch. Equal or better protection shall be given the item and there shall be no increase in the package cost.",
      },
      {
        code: "M",
        description: "All packaging data is mandatory for compliance and no substitutions are permitted. Fast packs should be included in this category.",
      },
      {
        code: "O",
        description:
          "Options can be exercised as to specific method of preservation or DoD approved packaging materials to be used. However, basic preservation method shall be retained, supplemental data shall be complied with, and unit package dimensions shall not be increased by more than one inch. Equal or better protection shall be given the item and there shall be no increase in the package cost.",
      },
      {
        code: "P",
        description: "For SPI items, polyurethane foam-in-place is permitted as specified on the SPI only when the SPI pack is not available.",
      },
    ],
  },
  {
    key: "levelAPacking",
    label: "Level A Military Packing Requirement",
    tableRef: "Table J-IX",
    placeholder: "e.g. C",
    entries: [
      {
        code: "B",
        description:
          "Packing shall be accomplished using ASTM D6251, Type III, Class 2, overseas cleated plywood boxes or wirebound wood boxes conforming to PPP-B-585, Class 3 (military overseas).",
      },
      {
        code: "C",
        description:
          "Packing shall be accomplished using cleated-plywood wood boxes conforming to ASTM D6251, Type III, Class 2 or nailed wood boxes conforming to ASTM D6880, Class 2, heavy duty, or covered wood crates conforming to ASTM D6039/D6039M, Type V, Style B, or lumber and plywood sheathed wood crates conforming to ASTM D7478/D7478M, or load-bearing base skidded wood-cleated boxes conforming to ASTM D6256/D6256M, Type II (overseas), or steel or aluminum slotted angle crates conforming to ASTM D6255/D6255M, Type I, or open wood crates conforming to ASTM D7478/D7478M.",
      },
      { code: "E", description: "Packing shall be accomplished to meet the performance test requirements of ASTM D4169, Distribution Cycle 18, Assurance Level 1." },
      {
        code: "F",
        description:
          "Packing is not required: the unit container shall also serve as the shipping container. Closure, sealing and reinforcement shall be in accordance with applicable specification for shipping container.",
      },
      {
        code: "Q",
        description:
          "Packing shall be accomplished in accordance with table C.II for the packing level specified. Closure sealing and reinforcement shall be in accordance with applicable specification for shipping container.",
      },
      { code: "Z", description: "Special requirement. See specific instructions or drawings provided." },
      {
        code: "2",
        description:
          "Packing shall be accomplished using cleated-plywood boxes, overseas type, conforming to ASTM D6251, Type III, Class 2, or nailed wood boxes conforming to ASTM D6880, Class 2, heavy duty.",
      },
    ],
  },
  {
    key: "levelBPacking",
    label: "Level B Military Packing Requirement",
    tableRef: "Table J-IXa",
    placeholder: "e.g. H",
    entries: [
      {
        code: "A",
        description:
          "Packing shall be accomplished using fiberboard boxes, weather resistant class, fabricated in accordance with ASTM D5118/D5118M, or triplewall fiberboard boxes conforming to ASTM D5168, class weather resistant.",
      },
      {
        code: "F",
        description:
          "Packing is not required: the unit container shall also serve as the shipping container. Closure, sealing and reinforcement shall be in accordance with applicable specification for shipping container.",
      },
      { code: "H", description: "Packing shall be accomplished using boxes fabricated in accordance with ASTM D5118/D5118M, class weather-resistant." },
      {
        code: "P",
        description:
          "Packing shall be accomplished using open wood crates conforming to ASTM D6039/D6039M, Type V, Style B, or open wood crates conforming to ASTM D7478/D7478M, or open steel or aluminum slotted angle crates conforming to ASTM D6255/D6255M, Type I.",
      },
      {
        code: "Q",
        description:
          "Packing shall be accomplished in accordance with table C-II for the packing level specified. Closure sealing and reinforcement shall be in accordance with the appropriate shipping container specification.",
      },
      { code: "R", description: "Packing shall be accomplished to meet the performance test requirements of ASTM D4169, Distribution Cycle 18, Assurance Level 2." },
      {
        code: "T",
        description:
          "Packing shall be accomplished by use of fiberboard containers fabricated in accordance with ASTM D5118/D5118M, weather-resistant class, or triple wall fiberboard boxes conforming to ASTM D5168, class weather resistant; or whenever practicable, by means of shrink-film conforming to A-A-3174.",
      },
      { code: "Z", description: "Special requirement. See specific instructions or drawings provided." },
      { code: "0", description: "Packing not authorized, see next higher level of packing for requirement." },
      {
        code: "7",
        description:
          "Packing shall be accomplished using cleated-plywood boxes conforming to ASTM D6251, Type III, Class 1 (domestic), or nailed wood boxes conforming to PPP-B-621, Class 1, or wirebound boxes conforming to PPP-B-585, Class 1.",
      },
      { code: "8", description: "Packing shall be accomplished in accordance with the Level A packing requirements as specified for the item." },
    ],
  },
  {
    key: "minimalPacking",
    label: "Minimal Packing Requirement",
    tableRef: "Table J-IXb",
    placeholder: "e.g. L",
    entries: [
      {
        code: "F",
        description:
          "Packing is not required; the unit container shall also serve as the shipping container. Closure, sealing and reinforcement shall be in accordance with applicable specification for shipping container.",
      },
      {
        code: "L",
        description:
          "Packing shall be accomplished using fiberboard boxes fabricated in accordance with ASTM D5118/D5118M, Class domestic or ASTM D5168, class non-weather resistant.",
      },
      {
        code: "U",
        description:
          "Items or packages that require packing for acceptance by the carrier shall be packed in exterior type shipping containers in a manner that will ensure safe transportation at the lowest rate to the point of delivery and shall meet, as a minimum, the requirements of the following rules and regulations, as applicable to the mode(s) of transportation to be utilized: (a) Postal Regulations (b) Department of Transportation Regulations (c) Civil Air Regulations (d) Uniform Freight Classification Rules (e) National Motor Freight Classification Rules (f) American Truckers' Association Rules (g) Other applicable carriers' rules (h) Military Air Regulations for dangerous materials. Consolidation of Shipments: All exterior packs of 1.5 cubic feet or less having no single dimension (length, width, height) exceeding 40 inches (and when the total number of such containers in any individual shipment exceeds 25), shall be consolidated, using flat pallets, box pallets, or containers as the consolidating media. Dangerous goods shall be prepared for shipment according to applicable Department of Transportation (DOT) regulations and international regulations in effect at time of shipment. Shipments by parcel post must comply with Postal Regulations.",
      },
      { code: "6", description: "Packing shall be accomplished to meet the performance test requirements of ASTM D4169, Distribution Cycle 18, Assurance Level 3." },
      { code: "8", description: "Packing shall be accomplished in accordance with the Level A packing requirements as specified for the item." },
      { code: "9", description: "Packing shall be accomplished in accordance with the Level B packing requirements as specified for the item." },
      { code: "Z", description: "Special requirement — see specific instructions or drawings provided." },
      { code: "0", description: "Packing not authorized, see next higher level of packing for requirement." },
    ],
  },
  {
    key: "specialMarking",
    label: "Special Marking",
    tableRef: "Table J-X",
    placeholder: "e.g. 01",
    entries: [
      { code: "01", description: "Fragile." },
      { code: "02", description: "Arrow up." },
      { code: "03", description: "Method 50." },
      { code: "04", description: "Fragile, Arrow up and Method 50." },
      { code: "05", description: "Delicate instrument." },
      { code: "06", description: "Delicate instrument and Arrow up." },
      { code: "07", description: "Glass – do not drop." },
      { code: "12", description: "Fragile, Method 50." },
      { code: "14", description: "Center of balance." },
      { code: "17", description: "Reusable container." },
      { code: "19", description: "Method 50 reusable container." },
      { code: "20", description: "Do not bend." },
      { code: "24", description: "Open for inspection or use only." },
      { code: "32", description: "Type I, shelf life." },
      { code: "33", description: "Type II, shelf life." },
      { code: "36", description: "Fragile, arrow up, and glass." },
      { code: "37", description: "Fragile, arrow up." },
      { code: "39", description: "ESD sensitive electronic device requirements of MIL-STD-129 apply." },
      { code: "40", description: "Markings shall be omitted for sensitive, controlled or pilferable items per MIL-STD-129." },
      { code: "60", description: "Asbestos Warning Label." },
      { code: "ZZ", description: "Special requirements." },
      { code: "00", description: "No special marking." },
    ],
  },
];

// Categories not covered by a universal Appendix J code table in MIL-STD-2073-1E.
// These are governed by contract-specific data or other references (e.g. hazmat by
// DLAR 4145.41 / IATA / IMDG), so they are handled as descriptive fields rather than
// a code -> description lookup.
export const nonTabularFields = [
  {
    key: "specialMaterialContent",
    label: "Special Material Content",
    note: "Any special material declarations required for the item's construction or packaging are specified on the contract or drawing — not a universal code table.",
  },
  {
    key: "hazardousMaterial",
    label: "Hazardous Material",
    note: "Governed by IATA Dangerous Goods Regulations, the IMDG Code, and CFR Title 29/40/49 (see Specialized Preservation code HM above) — not a universal code table.",
  },
  {
    key: "shelfLife",
    label: "Shelf-Life",
    note: "The defined storage life of the item is specified on the contract; re-inspection/re-preservation triggers are contract-specific.",
  },
  {
    key: "shelfLifeAction",
    label: "Shelf-Life Action",
    note: "The action required at shelf-life expiration (inspect, re-test, re-preserve, discard) is specified on the contract.",
  },
  {
    key: "typeOfStorage",
    label: "Type of Storage",
    note: "The storage conditions the item is packaged to withstand are specified on the contract.",
  },
];
