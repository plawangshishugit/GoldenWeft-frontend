export const STYLES = {
  traditional: {
    label: "Traditional",
    dbValue: "Traditional",
    description: "Timeless handwoven classics",
  },
  modern: {
    label: "Modern",
    dbValue: "Contemporary",
    description: "Contemporary silk expressions",
  },
  genz: {
    label: "Gen Z",
    dbValue: "Elegant",
    description: "Light, expressive modern silks",
  },
} as const;

export type StyleKey = keyof typeof STYLES;
