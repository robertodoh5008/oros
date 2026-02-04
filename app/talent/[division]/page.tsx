import Link from "next/link";
import Image from "next/image";

const divisionContent: Record<string, { title: string; body: string; images: string[] }> = {
  "lifestyle-culture-influence": {
    title: "Lifestyle, Culture & Influence",
    body: "Design culture, influence movements, and craft the aesthetic of living.\n\nIncludes: Spiritual & Wellness Arts, Culinary Arts, Cultural Leadership, Personal Branding, Fashion & Style Curation, Modeling & Creative Representation.",
    images: ["/images/01.png", "/images/02.png", "/images/03.png"],
  },
  "entertainment-performance": {
    title: "Entertainment and Performance",
    body: "Bring ideas to life through stage, sound, movement, and immersive experiences.\n\nIncludes: Music, Dance, Theater, Film, Performance Art, Live & Experiential Events.",
    images: ["/images/04.png", "/images/05.png", "/images/06.png"],
  },
  "literary-narrative-arts": {
    title: "Literary & Narrative Arts",
    body: "Shape ideas, culture, and society through story, word, and narrative.\n\nIncludes: Writing, Poetry, Scriptwriting, Comics, Storyboarding, Storytelling, Cultural Narratives.",
    images: ["/images/02.png", "/images/03.png", "/images/04.png"],
  },
  "tech-innovation-media": {
    title: "Tech, Innovation & Media",
    body: "Push the boundaries of creation through technology, digital platforms, and new media.\n\nIncludes: Game Design, VR/AR Experiences, Interactive Media, App & Software Development, Generative AI Projects.",
    images: ["/images/03.png", "/images/04.png", "/images/05.png"],
  },
  "education-knowledge-arts": {
    title: "Education & Knowledge Arts",
    body: "Illuminate minds, preserve wisdom, and guide transformation.\n\nIncludes: Curriculum Design, Workshops & Coaching, Thought Leadership, Research & Cultural Documentation.",
    images: ["/images/04.png", "/images/01.png", "/images/06.png"],
  },
  "multi-disciplinary-experimental": {
    title: "Multi-Disciplinary & Experimental",
    body: "For creators whose vision transcends categories, breaking boundaries to redefine creative expression.\n\nIncludes: Hybrid Media, Conceptual Projects, Interdisciplinary Innovation, Experimental Work.",
    images: ["/images/06.png", "/images/05.png", "/images/01.png"],
  },
};

export default async function DivisionPage({ params }: { params: Promise<{ division: string }> }) {
  const { division } = await params;
  const data = divisionContent[division] ?? {
    title: "Talent Division",
    body: "This division will be populated with editorial examples and development direction.",
    images: ["/images/01.png"],
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-28">
      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <div className="typo-eyebrow mb-2 text-[var(--color-text-subtle)]">TALENT DIVISION</div>
        <h1 className="typo-h1">{data.title}</h1>

        <p className="typo-body mt-6 max-w-3xl whitespace-pre-line text-[var(--color-text-muted)]">
          {data.body}
        </p>

        <div className="mt-8">
          <Link
            href="/get-scouted"
            className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-6 py-3 text-[12px] tracking-[0.22em] text-[var(--color-text)] hover:border-[var(--color-text-muted)]"
          >
            GET SCOUTED NOW
          </Link>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {data.images.map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
              <Image src={src} alt={data.title} fill className="object-cover" />
            </div>
          ))}
        </div>

        <p className="mt-10 text-[14px] text-[var(--color-text-muted)]">
          Unsure where you belong? Submit your portfolio, and we'll match your work with the division that will amplify your impact and prestige.
        </p>
      </div>
    </main>
  );
}
