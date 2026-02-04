import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { MobileNav } from "./components/MobileNav";

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
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
              <Link href="/" className="font-serif text-[15px] tracking-[0.12em]">
                THE HOUSE OF OROS
              </Link>

              <nav className="hidden items-center gap-7 text-[12px] tracking-[0.18em] text-[var(--color-text-muted)] md:flex">
                <Link className="hover:text-[var(--color-text)]" href="/#about">ABOUT</Link>
                <Link className="hover:text-[var(--color-text)]" href="/#talent">TALENT</Link>
                <Link className="hover:text-[var(--color-text)]" href="/#institute">THE INSTITUTE</Link>
                <Link className="hover:text-[var(--color-text)]" href="/get-scouted">GET SCOUTED</Link>
                <ThemeToggle />
              </nav>

              <div className="flex items-center gap-4 md:hidden">
                <ThemeToggle />
                <MobileNav />
              </div>
            </div>
            <div className="h-px w-full bg-[var(--color-border)]" />
          </header>

          {children}

          <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-xs text-[var(--color-text-subtle)] md:flex-row md:items-center md:justify-between md:px-8">
              <div className="tracking-[0.12em]">&copy; {new Date().getFullYear()} THE HOUSE OF OROS INSTITUTE</div>
              <div className="flex gap-6 tracking-[0.18em]">
                <Link className="hover:text-[var(--color-text)]" href="/privacy">PRIVACY</Link>
                <Link className="hover:text-[var(--color-text)]" href="/terms">TERMS</Link>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
