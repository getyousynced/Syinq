// tailwind.d.ts
import 'tailwindcss/tailwind-config';

// Declare module for the internal utility function
declare module 'tailwindcss/lib/util/flattenColorPalette' {
  const flattenColorPalette: (palette: Record<string, string>) => Record<string, string>;
  export default flattenColorPalette;
}
