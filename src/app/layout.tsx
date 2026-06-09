import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { PageTransition } from "@/components/shared/page-transition";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { BackToTop } from "@/components/shared/back-to-top";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { getSettings } from "@/lib/services";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      <body className="min-h-full bg-background text-foreground selection:bg-[#B8864A]/20 selection:text-foreground">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar siteTitle={settings?.siteTitle} navLinks={settings?.homepageContent?.navLinks} />
          <PageTransition>{children}</PageTransition>
          <Footer
            siteTitle={settings?.siteTitle}
            tagline={settings?.homepageContent?.footerTagline}
            phone={settings?.homepageContent?.footerPhone ?? settings?.phoneNumber}
            email={settings?.homepageContent?.footerEmail ?? settings?.contactEmail}
          />
          <div className="bg-background py-4 text-center text-[0.72rem] uppercase tracking-[0.24em] text-[#6B7280]">
            This website was professionally developed by EGB Developers.
          </div>
          <FloatingWhatsApp phoneNumber={settings?.phoneNumber || "971509715097"} />
          <BackToTop />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
