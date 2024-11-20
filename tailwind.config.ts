import type { Config } from "tailwindcss";
// import flattenColorPalette from './node_modules/tailwindcss/lib/util/flattenColorPalette';

// const addVariablesForColors = ({ addBase, theme }: { addBase: any; theme: any }) => {
//   const allColors = flattenColorPalette(theme('colors'));
//   const newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   );

//   addBase({
//     ':root': newVars,
//   });
// };

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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    // addVariablesForColors,
  ],
};
export default config;