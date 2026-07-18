import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

import Navbar from "@/components/navbar";
import Preloader from "@/components/preloader";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevLaunch AI",
  description: "Validate your startup ideas in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Preloader />
            <Navbar />
            {children}
          </ThemeProvider>
          av
        </body>
      </html>
    </ClerkProvider>
  );
}
