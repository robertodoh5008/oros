import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "The House of OROS Institute",
  description: "Talent Management & Consulting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-black text-white">
        <header className="fixed top-0 z-50 w-full">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
            <Link href="/" className="font-serif text-[15px] tracking-[0.12em]">
              THE HOUSE OF OROS
            </Link>

            <nav className="hidden items-center gap-7 text-[12px] tracking-[0.18em] text-white/70 md:flex">
              <Link className="hover:text-white" href="/#about">ABOUT</Link>
              <Link className="hover:text-white" href="/#talent">TALENT</Link>
              <Link className="hover:text-white" href="/#institute">THE INSTITUTE</Link>
              <Link className="hover:text-white" href="/get-scouted">GET SCOUTED</Link>
            </nav>
          </div>
          <div className="h-px w-full bg-white/10" />
        </header>

        {children}

        <footer className="border-t border-white/10 bg-black">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-xs text-white/60 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="tracking-[0.12em]">© {new Date().getFullYear()} THE HOUSE OF OROS INSTITUTE</div>
            <div className="flex gap-6 tracking-[0.18em]">
              <Link className="hover:text-white" href="/privacy">PRIVACY</Link>
              <Link className="hover:text-white" href="/terms">TERMS</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
