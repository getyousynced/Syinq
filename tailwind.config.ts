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
      backgroundImage: {
        'custom-gradient': 'linear-gradient(91.39deg, #CAF0F8 0%, #87DCED 100%)',
        'custom-background': 'linear-gradient(180deg, rgba(202, 240, 248, 0) 0%, rgba(202, 240, 248, 0.5) 15%, rgba(202, 240, 248, 0) 50%)',
      },
    },
  },
  plugins: [],
};
export default config;
