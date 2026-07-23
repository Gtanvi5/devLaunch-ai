import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import Navbar from "@/components/navbar";
import Preloader from "@/components/preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://devlaunch.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevLaunch AI | Validate your startup ideas in seconds",
    template: "%s | DevLaunch AI",
  },
  description:
    "Stop guessing. Look at the data. Get real competitor insights, actionable frameworks, and deterministic growth projections in seconds.",
  keywords: [
    "startup validation",
    "AI business planner",
    "competitor analysis",
    "SaaS ideas",
    "DevLaunch",
  ],
  authors: [{ name: "DevLaunch" }],
  creator: "DevLaunch",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "DevLaunch AI | Validate your startup ideas in seconds",
    description:
      "Get real competitor insights, actionable frameworks, and deterministic growth projections.",
    siteName: "DevLaunch AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLaunch AI",
    description: "Validate your startup ideas in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <body
          className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Preloader />
            <Navbar />

            <main className="flex-1 flex flex-col">{children}</main>

            <Toaster
              position="bottom-right"
              richColors
              closeButton
              toastOptions={{
                className:
                  "font-sans border border-zinc-200 dark:border-white/10 shadow-xl rounded-xl",
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
