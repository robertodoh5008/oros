"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

interface HorizontalGalleryProps {
  images: string[];
}

export function HorizontalGallery({ images }: HorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (images.length === 0) return null;

  return (
    <section className="relative hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] py-16 md:block xl:py-24">
      {/* Arrow buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] text-[var(--color-text-muted)] transition hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)] xl:left-6"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L5 8L10 13" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] text-[var(--color-text-muted)] transition hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)] xl:right-6"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3L11 8L6 13" />
          </svg>
        </button>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto pl-[max(1.25rem,calc((100vw-72rem)/2))] pr-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="group relative aspect-[3/4] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] xl:w-[320px]"
          >
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="320px"
              loading="lazy"
              className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
