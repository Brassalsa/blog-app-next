import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Container from "@/components/ui/container";
import TopLoader from "@/components/TopLoader";
import { ThemeProvider } from "@/components/context/Theme";
import ContextProvider from "@/components/context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App next",
  description: "Share your thoughts and ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <TopLoader />
          <Header />
          <Container>{children}</Container>
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
