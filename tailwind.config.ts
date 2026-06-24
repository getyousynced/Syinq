import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn semantic tokens (consumed by src/components/ui/*)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Syinq brand blue (DS: --blue-* scale, primary #099BE4)
        brand: {
          50: "#E8F6FD",
          100: "#C8EAFB",
          200: "#93D6F6",
          300: "#53C9FF",
          400: "#209DFA",
          500: "#099BE4",
          600: "#0577B0",
          700: "#1A64E4",
          800: "#045985",
          DEFAULT: "#099BE4",
        },
        // App surfaces
        page: "#F8FAFC",
        // Status (DS semantic — matches Tailwind defaults but aliased for intent)
        trust: "#16A34A",
        // Legacy `syinq-*` palette kept for not-yet-migrated pages; corrected to DS.
        syinq: {
          blue: "#099BE4",
          green: "#16A34A",
          dark: "#0F172A",
          gray: "#475569",
          background: "#F8FAFC",
          lightgray: "#F1F5F9",
          cardgray: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "18px",
        xl2: "24px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(15,23,42,0.05)",
        sm: "0 1px 3px rgba(15,23,42,0.07), 0 1px 2px rgba(15,23,42,0.04)",
        md: "0 4px 12px rgba(15,23,42,0.08)",
        lg: "0 8px 24px rgba(15,23,42,0.10)",
        xl: "0 18px 48px rgba(15,23,42,0.12)",
        fab: "0 6px 16px rgba(9,155,228,0.30)",
        focus: "0 0 0 3px rgba(9,155,228,0.22)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #53C9FF 0%, #099BE4 48%, #1A64E4 100%)",
        "brand-soft": "linear-gradient(135deg, #E8F6FD 0%, #D2ECFB 100%)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--marquee-duration, 36s) linear infinite",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
