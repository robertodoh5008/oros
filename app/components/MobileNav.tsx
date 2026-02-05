"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/#about", label: "ABOUT" },
  { href: "/#talent", label: "TALENT" },
  { href: "/#institute", label: "THE INSTITUTE" },
  { href: "/world-cup-2026", label: "WORLD CUP 2026" },
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-50 flex h-6 w-6 flex-col items-center justify-center"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="absolute h-[1.5px] w-5 bg-[var(--color-text)]"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute h-[1.5px] w-5 bg-[var(--color-text)]"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="absolute h-[1.5px] w-5 bg-[var(--color-text)]"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60vh] bottom-0 z-40 flex flex-col items-center pt-8"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-sm tracking-[0.15em] text-white transition-colors hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
