import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f2f2f2",
          dark: "#1a1a1a",
        },
        text: { // defining text colors for light and dark themes
          light: "#1a1a1a", // dark text for light background
          dark: "#f2f2f2", // light text for dark background
        }
      },
    },
  },
  plugins: [],
};
export default config;