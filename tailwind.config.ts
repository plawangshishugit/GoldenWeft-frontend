import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F3EE",
        charcoal: "#1F1F1F",
        gold: "#C6A15B",

        maroon: "#5B1E1E",
        indigo: "#2E3A59",
        sage: "#9BAF9B",
        taupe: "#8B7E74",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        section: "6rem",
      },
      borderRadius: {
        soft: "10px",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
