"use client";

import { ThemeProvider } from "./Theme";
import AuthProvider from "./Auth";

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default ContextProvider;
