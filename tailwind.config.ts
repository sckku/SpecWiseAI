import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        kku: {
          50: "#fdf4f2",
          100: "#fbe8e4",
          200: "#f6d5cc",
          300: "#eeb5a6",
          400: "#e18b76",
          500: "#d1634b",
          600: "#bc4730",
          700: "#9c3724", // Primary KKU Rust Maroon
          800: "#823021",
          900: "#6d2b1f",
          950: "#3b130c",
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        brand: {
          primary: "#9c3724",
          accent: "#0ea5e9",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
          dark: "#0f172a",
          card: "#ffffff",
        }
      },
      fontFamily: {
        sans: [
          "var(--font-sarabun)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        heading: [
          "var(--font-sarabun)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
        glow: "0 0 20px -5px rgba(156, 55, 36, 0.3)",
      }
    },
  },
  plugins: [],
};
export default config;
