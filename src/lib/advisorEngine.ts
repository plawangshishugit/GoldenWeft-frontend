import { Product } from "./products";

export function scoreProduct(
  product: Product,
  answers: Record<string, string>
) {
  let score = 0;
  const reasons: string[] = [];

  const occasions = product.occasion ?? []; // ✅ normalize
  const tones = product.tones ?? [];

  // Occasion
  if (occasions.includes(answers.occasion)) {
    score += 3;
    reasons.push("Suitable for your occasion");
  }

  // Drape
  if (
    (answers.drape === "Light & breathable" && product.weight === "Light") ||
    (answers.drape === "Rich & heavy" && product.weight === "Heavy")
  ) {
    score += 2;
    reasons.push("Matches your drape preference");
  }

  // Style
  if (product.style === answers.style) {
    score += 2;
    reasons.push("Aligns with your style");
  }

  // Tone
  if (tones.includes(answers.tone)) {
    score += 2;
    reasons.push("Complements your undertone");
  }

  // Investment
  if (product.tier === answers.investment) {
    score += 1;
    reasons.push("Fits your investment preference");
  }

  return { score, reasons };
}
