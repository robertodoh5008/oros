"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HorizontalGallery } from "./components/HorizontalGallery";

const videos = ["/videos/home2.mov", "/videos/Toronto.mov", "/videos/home4.mov", "/videos/home3.mov"];

// swap these filenames to match what you placed in /public/images
const gallery = [
  { src: "/images/Talent/Lifestyle,%20Culture%20%26%20Influence/IMG_1620.JPG", position: "center 60%" },
  { src: "/images/Talent/Entertainment%20%26%20Performance/IMG_1622.JPG", position: "center 20%" },
  { src: "/images/Talent/Literary%20%26%20Narrative%20Arts/IMG_1630.JPG", position: "center" },
  { src: "/images/Talent/Tech,%20Innovation%20%26%20Media/IMG_1633.JPG", position: "center" },
  { src: "/images/Talent/Education%20%26%20Knowledge%20Arts/IMG_1642.JPG", position: "center" },
  { src: "/images/gallery/01.png", position: "center" },
];

const rotatingImages = [
  "/images/Rotating/05.png",
  "/images/Rotating/06.png",
  "/images/Rotating/IMG_1415.jpg.png",
  "/images/Rotating/IMG_1416.jpg.png",
  "/images/Rotating/IMG_1497%202.JPG",
  "/images/Rotating/IMG_1498%202.JPG",
  "/images/Rotating/IMG_1499%202.JPG",
  "/images/Rotating/IMG_1500%202.JPG",
  "/images/Rotating/IMG_1573%202.JPG",
  "/images/Rotating/IMG_1574%202.JPG",
  "/images/Rotating/IMG_1575%202.JPG",
  "/images/Rotating/IMG_1576%202.JPG",
  "/images/Rotating/IMG_1577%202.JPG",
  "/images/Rotating/IMG_1578%202.JPG",
  "/images/Rotating/IMG_1580%202.JPG",
  "/images/Rotating/IMG_1581%202.JPG",
  "/images/Rotating/IMG_1582%202.JPG",
  "/images/Rotating/IMG_1586%202.JPG",
  "/images/Rotating/IMG_1587%202.JPG",
  "/images/Rotating/IMG_4699.png",
  "/images/Rotating/IMG_5930.JPG.png",
  "/images/Rotating/IMG_6160.JPG.png",
  "/images/Rotating/IMG_7067.png",
  "/images/Rotating/IMG_7634.PNG",
  "/images/Rotating/IMG_9726.JPG.png",
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const galleryImages = [
  "/images/gallery/01.png",
  "/images/gallery/02.png",
  "/images/gallery/03.png",
  "/images/gallery/04.png",
];

const divisions = [
  { slug: "lifestyle-culture-influence", title: "Lifestyle, Culture & Influence" },
  { slug: "entertainment-performance", title: "Entertainment and Performance" },
  { slug: "literary-narrative-arts", title: "Literary & Narrative Arts" },
  { slug: "tech-innovation-media", title: "Tech, Innovation & Media" },
  { slug: "education-knowledge-arts", title: "Education & Knowledge Arts" },
  { slug: "multi-disciplinary-experimental", title: "Multi-Disciplinary & Experimental" },
];

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <div className="typo-eyebrow mb-2 text-[var(--color-text-subtle)]">{eyebrow}</div>
      ) : null}
      <h2 className="typo-h2">{title}</h2>
    </div>
  );
}

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  // Deterministic initial state to avoid hydration mismatch
  const displayCount = Math.min(4, rotatingImages.length);
  const [visibleImages, setVisibleImages] = useState<string[]>(
    rotatingImages.slice(0, displayCount)
  );
  const imageQueueRef = useRef<string[]>(rotatingImages.slice(displayCount));
  const slotIndexRef = useRef(0);
  const hasShuffledRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % videos.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Shuffle on mount (client-only) to avoid SSR hydration mismatch
  useEffect(() => {
    if (!hasShuffledRef.current && rotatingImages.length > 0) {
      hasShuffledRef.current = true;
      const shuffled = shuffleArray(rotatingImages);
      setVisibleImages(shuffled.slice(0, displayCount));
      imageQueueRef.current = shuffled.slice(displayCount);
    }
  }, [displayCount]);

  // Timed rotation: swap one image every 5 seconds
  useEffect(() => {
    if (rotatingImages.length <= displayCount) return;

    const interval = setInterval(() => {
      setVisibleImages((prev) => {
        const queue = imageQueueRef.current;
        if (queue.length === 0) return prev;

        const slotToSwap = slotIndexRef.current % prev.length;
        slotIndexRef.current += 1;

        const nextImage = queue.shift()!;
        const displaced = prev[slotToSwap];
        queue.push(displaced);

        const updated = [...prev];
        updated[slotToSwap] = nextImage;
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [displayCount]);

  return (
    <main className="bg-[var(--color-bg)]">
      {/* HERO */}
      <section className="relative h-[100svh] overflow-hidden">
        {/* Video crossfade */}
        <AnimatePresence mode="wait">
          <motion.video
            key={videos[active]}
            src={videos[active]}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover ${
              active >= 2 ? "md:object-[center_30%]" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* overlay - keep dark for video readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/65 to-black" />

        {/* content - centered editorial typography */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="text-center text-white"
          >
            {/* THE HOUSE OF */}
            <div className="text-[12px] uppercase tracking-[0.3em] text-white/80 md:text-[14px]">
              THE HOUSE OF
            </div>

            {/* OROS */}
            <h1 className="font-serif text-[80px] leading-[0.85] tracking-[0.02em] md:text-[160px]">
              OROS
            </h1>

            {/* INSTITUTE with lines */}
            <div className="mt-2 flex items-center justify-center gap-4 md:mt-4">
              <span className="h-px w-10 bg-white/40 md:w-16" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/90 md:text-[13px]">
                INSTITUTE
              </span>
              <span className="h-px w-10 bg-white/40 md:w-16" />
            </div>

            {/* Tagline */}
            <div className="mt-4 font-serif text-[16px] tracking-[0.08em] text-white/85 md:mt-6 md:text-[20px]">
              Talent Management & Consulting
            </div>

            {/* CTA Button */}
            <div className="mt-10 md:mt-14">
              <Link
                href="/get-scouted"
                className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-[12px] tracking-[0.22em] text-white hover:border-white/60"
              >
                GET SCOUTED NOW
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-24">
          <div className="md:col-span-6">
            <SectionTitle title="About the House" />
            <div className="typo-body space-y-5 text-[var(--color-text-muted)]">
              <p>
                The House of OROS Institute is a private management and consulting institute dedicated to creatives
                navigating complex global industries.
              </p>
              <p>
                We were founded to address the absence of real guidance in creative fields, where talent is often visible,
                but structure is frequently lacking.
              </p>
              <p>
                Our work is rooted in discernment. We focus on preparation, positioning, and long-term development rather
                than speed or exposure.
              </p>
              <p className="text-[var(--color-text)]">The House of OROS is not a marketplace.</p>
              <p className="text-[var(--color-text)]">It is a container built for those ready to take their craft seriously.</p>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="grid grid-cols-2 gap-3">
              {visibleImages.length > 0 ? (
                visibleImages.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setModalSrc(src)}
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
                  >
                    <AnimatePresence mode="sync">
                      <motion.div
                        key={src}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.0, ease: "easeInOut" }}
                      >
                        <Image
                          src={src}
                          alt="OROS editorial"
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </button>
                ))
              ) : (
                <div className="col-span-2 flex aspect-[3/4] items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
                  <span className="typo-eyebrow text-[var(--color-text-subtle)]">NO IMAGES AVAILABLE</span>
                </div>
              )}
            </div>

            <div className="typo-eyebrow mt-6 text-[var(--color-text-subtle)]">
              EDITORIAL SELECTION • CLICK TO EXPAND
            </div>
          </div>
        </div>
      </section>

      {/* TALENT */}
      <section id="talent" className="scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <SectionTitle title="Talent Divisions" />
          <p className="typo-body max-w-3xl text-[var(--color-text-muted)]">
            The House of OROS Institute works across multiple creative disciplines. Applicants may explore the division that aligns most closely with their work.
          </p>
          <p className="typo-body mt-4 max-w-3xl text-[var(--color-text-muted)]">
            Choose the path that resonates with your craft:
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {divisions.map((d, i) => (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={gallery[i % gallery.length].src}
                    alt={d.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: gallery[i % gallery.length].position }}
                  />
                  {/* Keep dark overlay for image readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/65 to-black" />
                </div>

                {/* Text over image always white */}
                <div className="relative z-10 p-8">
                  <div className="typo-eyebrow text-white/55">DIVISION</div>
                  <div className="typo-h3 text-white">{d.title}</div>

                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      href={`/talent/${d.slug}`}
                      className="text-[12px] tracking-[0.22em] text-white/80 hover:text-white"
                    >
                      VIEW
                    </Link>
                    <span className="h-px w-10 bg-white/25" />
                    <Link
                      href="/get-scouted"
                      className="text-[12px] tracking-[0.22em] text-white/80 hover:text-white"
                    >
                      GET SCOUTED
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-0 ring-0 transition group-hover:ring-1 group-hover:ring-white/30" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <HorizontalGallery images={galleryImages} />

      {/* THE INSTITUTE */}
      <section id="institute" className="scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <SectionTitle title="The Institute" />
          <div className="typo-eyebrow mb-10 text-[var(--color-text-subtle)]">HOW WE WORK</div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Development",
                body: "We support the refinement of talent through discipline, direction, and intentional growth. Development is tailored, not templated.",
              },
              {
                title: "Positioning",
                body: "We help talent understand where they belong, and where they do not. Positioning is strategic, not aspirational.",
              },
              {
                title: "Advisory & Access",
                body: "Through experience and network, we provide advisory guidance and introductions when alignment exists. Opportunities are assessed individually. Nothing is guaranteed.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8">
                <div className="typo-h3 text-[var(--color-text)]">{card.title}</div>
                <p className="typo-body mt-4 text-[var(--color-text-muted)]">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 md:p-10">
            <div className="typo-h3 text-[var(--color-text)]">
              The Institute exists to build longevity, not visibility.
            </div>
            <p className="typo-body mt-4 text-[var(--color-text-muted)]">
              Our mission is to identify, develop, and position creative talent through intentional management, consulting, and professional development.
            </p>

            <div className="mt-6 grid gap-2 text-[14px] text-[var(--color-text-muted)] md:grid-cols-2">
              <div>• Protect talent from exploitation and misinformation</div>
              <div>• Provide structure where there is often chaos</div>
              <div>• Offer strategic guidance instead of empty promises</div>
              <div>• Build long-term careers, not short-term exposure</div>
            </div>

            <p className="typo-body mt-6 text-[var(--color-text-muted)]">
              We believe talent flourishes when paired with clarity, preparation, and aligned opportunity. The House of OROS Institute was created to be a container where that process can unfold with integrity.
            </p>

            <div className="mt-8">
              <Link
                href="/get-scouted"
                className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-6 py-3 text-[12px] tracking-[0.22em] text-[var(--color-text)] hover:border-[var(--color-text-muted)]"
              >
                GET SCOUTED NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal - keep dark backdrop */}
      <AnimatePresence>
        {modalSrc ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalSrc(null)}
          >
            <motion.div
              className="relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-black"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={modalSrc} alt="Expanded" fill className="object-contain" />
              <button
                onClick={() => setModalSrc(null)}
                className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-[11px] tracking-[0.22em] text-white/80 hover:text-white"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
