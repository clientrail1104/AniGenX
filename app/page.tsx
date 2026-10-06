import Link from "next/link";
import {
  AudioWaveform,
  CloudCog,
  Film,
  Layers3,
  ScanLine,
  Sparkles,
  WandSparkles
} from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/navigation/Navbar";

const features = [
  {
    icon: ScanLine,
    title: "Scene intelligence",
    copy: "Detect high-motion sections, usable angles and visual peaks before building the first cut."
  },
  {
    icon: AudioWaveform,
    title: "Beat-aware timing",
    copy: "Map edit points to transients and musical phrases for aggressive automotive pacing."
  },
  {
    icon: WandSparkles,
    title: "Look presets",
    copy: "Apply purpose-built night, smoke, track-day and neon grades while keeping controls editable."
  },
  {
    icon: Layers3,
    title: "Multi-format masters",
    copy: "Create vertical, widescreen and editor-friendly deliverables from one source timeline."
  }
];

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />

      <section id="engine" className="relative border-t border-white/[0.06] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 max-w-2xl">
            <div className="panel-title text-electric">The engine</div>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-.04em] sm:text-5xl">
              Built for speed footage.
            </h2>
            <p className="mt-4 max-w-xl text-white/50">
              The UI is designed around the actual decisions an automotive editor makes:
              selects, energy, color, sound design and delivery.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="glass-panel rounded-3xl p-6">
                <div className="grid size-11 place-items-center rounded-2xl border border-electric/20 bg-electric/[0.07] text-electric">
                  <Icon size={20} />
                </div>
                <h3 className="mt-8 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/45">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <div className="glass-panel rounded-3xl p-7">
            <Sparkles className="text-nitro" />
            <div className="panel-title mt-8">Editing workflow</div>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-.03em]">
              Upload → Style → Render
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/45">
              Start with local preview mode. Move heavy masters to cloud processing when
              you need H.264, HEVC, ProRes, large 4K media or camera-original files.
            </p>
            <Link href="/workspace" className="neon-button mt-8">
              Open workspace
            </Link>
          </div>

          <div id="formats" className="glass-panel rounded-3xl p-7">
            <div className="flex items-center gap-3">
              <CloudCog className="text-electric" />
              <div>
                <div className="panel-title">Hybrid media architecture</div>
                <div className="mt-1 text-sm text-white/75">
                  Browser previews + cloud-grade final encoding
                </div>
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["INPUT", "MP4 · MOV · AVI · MKV · WebM · ProRes · RAW"],
                ["MASTER", "MP4 H.264/H.265 · MOV ProRes · WebM"],
                ["SOCIAL", "9:16 Reels/TikTok · 16:9 YouTube"]
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/[0.07] bg-black/25 p-4">
                  <div className="text-[10px] font-bold tracking-[.18em] text-electric">{title}</div>
                  <div className="mt-3 text-sm leading-6 text-white/50">{copy}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-8 text-center text-xs text-white/30">
        Redline AI prototype architecture — Next.js App Router, Zustand, Tailwind CSS, Motion and hybrid transcoding.
      </footer>
    </main>
  );
}
