"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/world-cup-2026") return null;

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-xs text-[var(--color-text-subtle)] md:flex-row md:items-center md:justify-between md:px-8">
        <div className="tracking-[0.12em]">&copy; {new Date().getFullYear()} THE HOUSE OF OROS INSTITUTE</div>
        <div className="flex gap-6 tracking-[0.18em]">
          <Link className="hover:text-[var(--color-text)]" href="/privacy">PRIVACY</Link>
          <Link className="hover:text-[var(--color-text)]" href="/terms">TERMS</Link>
        </div>
      </div>
    </footer>
  );
}
