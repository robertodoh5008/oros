import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { MobileNav } from "./components/MobileNav";
import { SiteFooter } from "./components/SiteFooter";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "The House of OROS Institute",
  description: "Talent Management & Consulting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <ThemeProvider>
          <header className="fixed top-0 z-50 w-full bg-[var(--color-bg-header)] backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 xl:px-8">
              <Link href="/" className="font-serif text-[15px] tracking-[0.12em]">
                THE HOUSE OF OROS
              </Link>

              <nav className="hidden items-center gap-7 text-[12px] tracking-[0.18em] text-[var(--color-text-muted)] xl:flex">
                <Link className="hover:text-[var(--color-text)]" href="/#about">ABOUT</Link>
                <Link className="hover:text-[var(--color-text)]" href="/#talent">TALENT</Link>
                <Link className="hover:text-[var(--color-text)]" href="/#institute">THE INSTITUTE</Link>
                <Link className="hover:text-[var(--color-text)]" href="/get-scouted">GET SCOUTED</Link>
                <Link className="hover:text-[var(--color-text)]" href="/world-cup-2026">WORLD CUP 2026</Link>
                <ThemeToggle />
              </nav>

              <div className="flex items-center gap-4 xl:hidden">
                <ThemeToggle />
                <MobileNav />
              </div>
            </div>
            <div className="h-px w-full bg-[var(--color-border)]" />
          </header>

          {children}

          <SiteFooter />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
