import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210 16% 93%)",
        background: "#ffffff",
        foreground: "#0f172a",
        muted: "#475569",
        primary: {
          DEFAULT: "#2B8BFB",
          foreground: "#ffffff",
        },
        success: "#16a34a",
        danger: "#dc2626",
        warn: "#f59e0b",
      },
      borderRadius: {
        xl: "14px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(2,8,23,.06)",
      },
    },
  },
  plugins: [],
};
export default config;
