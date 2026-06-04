import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { PageTransition } from "@/components/shared/page-transition";
import { getSettings } from "@/lib/services";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RMS LADIES BOUTIQUE | Women’s Couture Tailoring",
  description: "Luxury women-only tailoring with curated appointments, design catalog access, and order tracking.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground selection:bg-amber-300/30 selection:text-foreground">
        <ThemeProvider>
          <Navbar siteTitle={settings?.siteTitle} navLinks={settings?.homepageContent?.navLinks} />
          <PageTransition>{children}</PageTransition>
          <Footer
            siteTitle={settings?.siteTitle}
            tagline={settings?.homepageContent?.footerTagline}
            phone={settings?.homepageContent?.footerPhone ?? settings?.phoneNumber}
            email={settings?.homepageContent?.footerEmail ?? settings?.contactEmail}
          />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
