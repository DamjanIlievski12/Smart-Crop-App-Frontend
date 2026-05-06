import type { ImpactLevel } from "../../../api/types/weather";

export default function toImpactLevel(level: string): ImpactLevel {
  switch (level) {
    case "Excellent":
    case "Good":
    case "Moderate":
    case "Poor":
      return level;
    default:
      return "Unknown";
  }
}
