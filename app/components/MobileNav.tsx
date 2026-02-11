"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#talent", label: "Talent" },
  { href: "/#institute", label: "The Institute" },
  { href: "/get-scouted", label: "Get Scouted" },
  { href: "/world-cup-2026", label: "World Cup 2026" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="relative z-50 flex h-6 w-6 flex-col items-center justify-center"
      >
        <span className="absolute h-[1.5px] w-5 -translate-y-[4px] bg-[var(--color-text)]" />
        <span className="absolute h-[1.5px] w-5 bg-[var(--color-text)]" />
        <span className="absolute h-[1.5px] w-5 translate-y-[4px] bg-[var(--color-text)]" />
      </button>

      {/* Full-screen overlay — portaled to body to escape header's backdrop-blur stacking context */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[60] bg-[var(--color-bg)]"
              >
                {/* Top bar: logo + close button */}
                <div className="flex items-center justify-between px-5 py-5 xl:px-8">
                  <span className="font-serif text-[15px] tracking-[0.12em] text-[var(--color-text)]">
                    THE HOUSE OF OROS
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="flex h-6 w-6 items-center justify-center text-[var(--color-text)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Divider under top bar */}
                <div className="h-px w-full bg-[var(--color-border)]" />

                {/* Nav links */}
                <nav className="px-5 xl:px-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-5 font-serif text-2xl font-medium text-[var(--color-text)] transition-colors hover:opacity-70"
                      >
                        {link.label}
                      </Link>
                      <div className="h-px w-full bg-[var(--color-border)]" />
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
