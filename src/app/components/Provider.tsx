import React from "react";
import { ThemeProvider } from "./theme-provider";
import { Theme } from "@radix-ui/themes";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
};

export default Provider;
