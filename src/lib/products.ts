export type Product = {
  id: string;
  name: string;
  description?: string;
  fabric: "Tussar" | "Ghicha" | "Mulberry";
  weight: "Light" | "Medium" | "Heavy";
  style: "Traditional" | "Contemporary" | "Elegant";
  tier: "Everyday" | "Occasion" | "Heirloom";
  tones: string[];
  occasion: string[];
  isNew?: boolean;
};

export const PRODUCTS: Product[] = [
  /* =========================
     WEDDING / FESTIVAL
  ========================== */
  {
    id: "tussar-wedding-gold",
    name: "Handwoven Tussar Silk – Warm Gold",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Warm", "Gold"],
    occasion: ["Wedding", "Festival"],
    isNew: true,
    price:30000,
  },
  {
    id: "tussar-maroon-bridal",
    name: "Tussar Silk – Deep Maroon Bridal",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Warm", "Deep"],
    occasion: ["Wedding"],
    price:40000,
  },

  /* =========================
     FESTIVE / EVERYDAY
  ========================== */
  {
    id: "ghicha-festive-natural",
    name: "Bhagalpuri Ghicha Silk – Natural Texture",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Neutral"],
    occasion: ["Festival", "Everyday"],
    isNew: true,
    price:50000,
  },
  {
    id: "ghicha-olive-festive",
    name: "Ghicha Silk – Olive Festive Drape",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Earthy"],
    occasion: ["Festival"],
    price:30600,
  },

  /* =========================
     MODERN / CONTEMPORARY
  ========================== */
  {
    id: "mulberry-modern-light",
    name: "Mulberry Silk – Contemporary Drape",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Neutral", "Cool"],
    occasion: ["Everyday", "Gift"],
    isNew: true,
    price:30450,
  },
  {
    id: "mulberry-pastel-office",
    name: "Mulberry Silk – Pastel Office Wear",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Soft", "Cool"],
    occasion: ["Everyday"],
    price:28900,
  },

  /* =========================
     GEN Z / LIGHTWEIGHT
  ========================== */
  {
    id: "mulberry-genz-blush",
    name: "Mulberry Silk – Blush Pink",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Warm"],
    occasion: ["Gift", "Everyday"],
    isNew: true,
    price:27500,
  },

  /* =========================
     GIFTS / SPECIAL
  ========================== */
  {
    id: "ghicha-gift-sand",
    name: "Ghicha Silk – Sand Beige Gift Edition",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Neutral"],
    occasion: ["Gift"],
    price:32000,
  },
];
