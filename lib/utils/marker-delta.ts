export type DeltaVariant = "up-bad" | "down-bad" | "stable" | "new";

const INVERTED_MARKERS = [
  "Vitamin D",
  "HDL Cholesterol",
  "Ferritin",
  "Vitamin B12",
  "Magnesium",
  "Hemoglobin",
  "Hematocrit",
  "eGFR",
  "Platelets",
];

export function getDeltaVariant(
  markerName: string,
  direction: string | null
): DeltaVariant {
  if (!direction) return "new";
  if (direction === "stable") return "stable";
  const isInverted = INVERTED_MARKERS.includes(markerName);
  if (direction === "up") return isInverted ? "stable" : "up-bad";
  if (direction === "down") return isInverted ? "down-bad" : "stable";
  return "stable";
}

export function getDeltaIcon(variant: DeltaVariant): string {
  switch (variant) {
    case "up-bad": return "↑";
    case "down-bad": return "↓";
    case "stable": return "→";
    case "new": return "—";
  }
}
