import Link from "next/link";
import Image from "next/image";

const divisionContent: Record<string, { title: string; body: string; images: string[] }> = {
  "models": {
    title: "Models",
    body:
      "We work with models who demonstrate presence, discipline, and long-term potential beyond surface visibility.\n\nDevelopment may include portfolio direction, industry readiness, and strategic positioning within global markets.",
    images: ["/images/01.png", "/images/02.png", "/images/03.png"],
  },
  "artists-musicians": {
    title: "Artists & Musicians",
    body:
      "We work with artists who are ready for structure, refinement, and long-term direction.\n\nDevelopment may include positioning, creative clarity, and professional readiness.",
    images: ["/images/04.png", "/images/05.png", "/images/06.png"],
  },
  photographers: {
    title: "Photographers",
    body:
      "We work with photographers who demonstrate vision, consistency, and an editorial standard.\n\nDevelopment may include portfolio direction, industry positioning, and brand alignment.",
    images: ["/images/02.png", "/images/03.png", "/images/04.png"],
  },
  videographers: {
    title: "Videographers",
    body:
      "We work with videographers who understand pacing, story, and visual discipline.\n\nDevelopment may include reel curation, client alignment, and strategic positioning.",
    images: ["/images/03.png", "/images/04.png", "/images/05.png"],
  },
  creators: {
    title: "Creators",
    body:
      "We work with creators who are building something intentional, not viral.\n\nDevelopment may include positioning, clarity, and long-term strategy.",
    images: ["/images/04.png", "/images/01.png", "/images/06.png"],
  },
  performers: {
    title: "Performers",
    body:
      "We work with performers who demonstrate presence, discipline, and professional readiness.\n\nDevelopment may include strategy, positioning, and access when alignment exists.",
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
    <main className="min-h-screen bg-black pt-28">
      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <div className="mb-2 text-[11px] tracking-[0.28em] text-white/55">TALENT DIVISION</div>
        <h1 className="font-serif text-[44px] leading-[1.06] md:text-[60px]">{data.title}</h1>

        <p className="mt-6 max-w-3xl whitespace-pre-line text-[15px] leading-[1.9] text-white/70">
          {data.body}
        </p>

        <div className="mt-8">
          <Link
            href="/get-scouted"
            className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-[12px] tracking-[0.22em] text-white hover:border-white/60"
          >
            GET SCOUTED NOW
          </Link>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {data.images.map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image src={src} alt={data.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
