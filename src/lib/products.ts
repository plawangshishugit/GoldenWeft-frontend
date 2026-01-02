export type Product = {
  id: string;
  name: string;
  description?: string;
  fabric: "Tussar" | "Ghicha" | "Mulberry";
  weight: "Light" | "Medium" | "Heavy";
  style: "Traditional" | "Contemporary" | "Elegant";
  tier: "Everyday" | "Occasion" | "Heirloom";
  tones: string[];
  occasions: string[];
  price?: number;
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
    occasions: ["Wedding", "Festival"],
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
    occasions: ["Wedding"],
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
    occasions: ["Festival", "Everyday"],
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
    occasions: ["Festival"],
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
    occasions: ["Everyday", "Gift"],
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
    occasions: ["Everyday"],
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
    occasions: ["Gift", "Everyday"],
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
    occasions: ["Gift"],
    price:32000,
  },

    /* =========================
     WEDDING / HEIRLOOM
  ========================== */
  {
    id: "tussar-royal-red-wedding",
    name: "Tussar Silk – Royal Red Wedding Edit",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Warm", "Red"],
    occasions: ["Wedding"],
    price: 52000,
  },
  {
    id: "tussar-temple-border-gold",
    name: "Tussar Silk – Temple Border Gold",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Gold"],
    occasions: ["Wedding", "Festival"],
    price: 48000,
  },
  {
    id: "tussar-bronze-heritage",
    name: "Tussar Silk – Bronze Heritage Weave",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Bronze", "Warm"],
    occasions: ["Wedding"],
    price: 56000,
  },

  /* =========================
     FESTIVE / TRADITIONAL
  ========================== */
  {
    id: "ghicha-deep-indigo-festive",
    name: "Ghicha Silk – Deep Indigo Festive",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Cool", "Indigo"],
    occasions: ["Festival"],
    price: 34500,
  },
  {
    id: "ghicha-rust-orange-festive",
    name: "Ghicha Silk – Rust Orange Festive",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Warm", "Earthy"],
    occasions: ["Festival"],
    price: 33000,
  },
  {
    id: "ghicha-charcoal-grey-festive",
    name: "Ghicha Silk – Charcoal Grey Festive",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Neutral"],
    occasions: ["Festival", "Evening"],
    price: 36000,
  },

  /* =========================
     CONTEMPORARY / OFFICE
  ========================== */
  {
    id: "mulberry-slate-office",
    name: "Mulberry Silk – Slate Grey Office Wear",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Cool", "Neutral"],
    occasions: ["Everyday", "Office"],
    price: 26000,
  },
  {
    id: "mulberry-ivory-minimal",
    name: "Mulberry Silk – Ivory Minimal Edit",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Neutral"],
    occasions: ["Office", "Everyday"],
    price: 24500,
  },
  {
    id: "mulberry-steel-blue-office",
    name: "Mulberry Silk – Steel Blue Office",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Cool"],
    occasions: ["Office"],
    price: 25500,
  },

  /* =========================
     GEN Z / MODERN
  ========================== */
  {
    id: "mulberry-lilac-genz",
    name: "Mulberry Silk – Lilac Gen-Z Edit",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Cool", "Soft"],
    occasions: ["Everyday", "Gift"],
    price: 24000,
  },
  {
    id: "mulberry-mint-green",
    name: "Mulberry Silk – Mint Green Modern",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Cool"],
    occasions: ["Everyday"],
    price: 23500,
  },
  {
    id: "mulberry-coral-soft",
    name: "Mulberry Silk – Coral Soft Drapes",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Warm"],
    occasions: ["Gift", "Everyday"],
    price: 25000,
  },

  /* =========================
     LUXURY / LIMITED
  ========================== */
  {
    id: "tussar-midnight-black-luxe",
    name: "Tussar Silk – Midnight Black Luxe",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Elegant",
    tier: "Heirloom",
    tones: ["Black"],
    occasions: ["Evening", "Wedding"],
    price: 65000,
  },
  {
    id: "tussar-emerald-royal",
    name: "Tussar Silk – Emerald Royal Edition",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Elegant",
    tier: "Heirloom",
    tones: ["Green"],
    occasions: ["Wedding", "Reception"],
    price: 62000,
  },

  /* =========================
     GIFT / SPECIAL
  ========================== */
  {
    id: "ghicha-pearl-white-gift",
    name: "Ghicha Silk – Pearl White Gift",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Neutral"],
    occasions: ["Gift"],
    price: 31000,
  },
  {
    id: "ghicha-rosewood-gift",
    name: "Ghicha Silk – Rosewood Gift Edition",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Warm"],
    occasions: ["Gift"],
    price: 32500,
  },

  /* =========================
     DAILY / COMFORT
  ========================== */
  {
    id: "mulberry-soft-beige-daily",
    name: "Mulberry Silk – Soft Beige Daily",
    fabric: "Mulberry",
    weight: "Light",
    style: "Elegant",
    tier: "Everyday",
    tones: ["Neutral"],
    occasions: ["Everyday"],
    price: 22500,
  },
  {
    id: "mulberry-warm-taupe",
    name: "Mulberry Silk – Warm Taupe",
    fabric: "Mulberry",
    weight: "Light",
    style: "Elegant",
    tier: "Everyday",
    tones: ["Warm"],
    occasions: ["Everyday"],
    price: 23000,
  },
  {
    id: "mulberry-soft-grey-daily",
    name: "Mulberry Silk – Soft Grey Daily",
    fabric: "Mulberry",
    weight: "Light",
    style: "Elegant",
    tier: "Everyday",
    tones: ["Cool"],
    occasions: ["Everyday"],
    price: 22800,
  },
  /* =========================
     WEDDING / GRAND
  ========================== */
  {
    id: "tussar-crimson-zari-wedding",
    name: "Tussar Silk – Crimson Zari Wedding",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Warm", "Red"],
    occasions: ["Wedding"],
    price: 58000,
  },
  {
    id: "tussar-antique-gold-bridal",
    name: "Tussar Silk – Antique Gold Bridal",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Gold", "Warm"],
    occasions: ["Wedding"],
    price: 61000,
  },
  {
    id: "tussar-maroon-temple",
    name: "Tussar Silk – Maroon Temple Border",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Traditional",
    tier: "Heirloom",
    tones: ["Deep", "Warm"],
    occasions: ["Wedding", "Festival"],
    price: 54500,
  },

  /* =========================
     FESTIVE / ETHNIC
  ========================== */
  {
    id: "ghicha-saffron-festive",
    name: "Ghicha Silk – Saffron Festive Drape",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Warm"],
    occasions: ["Festival"],
    price: 34000,
  },
  {
    id: "ghicha-teal-festive",
    name: "Ghicha Silk – Teal Festive Weave",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Cool"],
    occasions: ["Festival"],
    price: 35500,
  },
  {
    id: "ghicha-plum-evening",
    name: "Ghicha Silk – Plum Evening Edit",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Deep"],
    occasions: ["Festival", "Evening"],
    price: 36500,
  },

  /* =========================
     CONTEMPORARY / URBAN
  ========================== */
  {
    id: "mulberry-ash-grey-modern",
    name: "Mulberry Silk – Ash Grey Modern",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Neutral"],
    occasions: ["Office", "Everyday"],
    price: 24800,
  },
  {
    id: "mulberry-denim-blue",
    name: "Mulberry Silk – Denim Blue Contemporary",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Cool"],
    occasions: ["Office", "Everyday"],
    price: 26500,
  },
  {
    id: "mulberry-soft-olive",
    name: "Mulberry Silk – Soft Olive Modern",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Earthy"],
    occasions: ["Everyday"],
    price: 25200,
  },

  /* =========================
     GEN Z / TREND
  ========================== */
  {
    id: "mulberry-sky-blue-genz",
    name: "Mulberry Silk – Sky Blue Gen-Z",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Cool"],
    occasions: ["Everyday", "Gift"],
    price: 23800,
  },
  {
    id: "mulberry-peach-soft",
    name: "Mulberry Silk – Peach Soft Edit",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Warm"],
    occasions: ["Gift", "Everyday"],
    price: 24200,
  },
  {
    id: "mulberry-lavender-mist",
    name: "Mulberry Silk – Lavender Mist",
    fabric: "Mulberry",
    weight: "Light",
    style: "Contemporary",
    tier: "Everyday",
    tones: ["Soft", "Cool"],
    occasions: ["Everyday"],
    price: 24500,
  },

  /* =========================
     PREMIUM / LUXE
  ========================== */
  {
    id: "tussar-royal-blue-luxe",
    name: "Tussar Silk – Royal Blue Luxe",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Elegant",
    tier: "Heirloom",
    tones: ["Cool", "Blue"],
    occasions: ["Reception", "Evening"],
    price: 67000,
  },
  {
    id: "tussar-ivory-gold-luxe",
    name: "Tussar Silk – Ivory Gold Luxe",
    fabric: "Tussar",
    weight: "Heavy",
    style: "Elegant",
    tier: "Heirloom",
    tones: ["Neutral", "Gold"],
    occasions: ["Wedding"],
    price: 69000,
  },

  /* =========================
     GIFT / CLASSIC
  ========================== */
  {
    id: "ghicha-powder-blue-gift",
    name: "Ghicha Silk – Powder Blue Gift",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Cool"],
    occasions: ["Gift"],
    price: 30500,
  },
  {
    id: "ghicha-warm-beige-gift",
    name: "Ghicha Silk – Warm Beige Gift",
    fabric: "Ghicha",
    weight: "Medium",
    style: "Elegant",
    tier: "Occasion",
    tones: ["Neutral"],
    occasions: ["Gift"],
    price: 31500,
  },

  /* =========================
     DAILY COMFORT
  ========================== */
  {
    id: "mulberry-soft-sand",
    name: "Mulberry Silk – Soft Sand Daily",
    fabric: "Mulberry",
    weight: "Light",
    style: "Elegant",
    tier: "Everyday",
    tones: ["Neutral"],
    occasions: ["Everyday"],
    price: 22000,
  },
  {
    id: "mulberry-mushroom-grey",
    name: "Mulberry Silk – Mushroom Grey",
    fabric: "Mulberry",
    weight: "Light",
    style: "Elegant",
    tier: "Everyday",
    tones: ["Neutral"],
    occasions: ["Everyday"],
    price: 22500,
  },
  {
    id: "mulberry-warm-caramel",
    name: "Mulberry Silk – Warm Caramel",
    fabric: "Mulberry",
    weight: "Light",
    style: "Elegant",
    tier: "Everyday",
    tones: ["Warm"],
    occasions: ["Everyday"],
    price: 23200,
  }


];
