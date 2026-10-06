"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  AudioWaveform,
  Clapperboard,
  Gauge,
  Sparkles,
  WandSparkles
} from "lucide-react";

const stats = [
  ["4K / 120", "High-speed workflow"],
  ["9:16 + 16:9", "Social-ready exports"],
  ["AI SYNC", "Beat-aware edit map"]
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 bg-carbon-grid bg-[size:44px_44px] opacity-50" />
      <div className="speed-lines absolute inset-0 opacity-70" />
      <div className="absolute -left-20 top-28 size-[420px] rounded-full bg-electric/10 blur-[110px]" />
      <div className="absolute -right-36 bottom-10 size-[500px] rounded-full bg-nitro/5 blur-[130px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1500px] items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-electric"
          >
            <Sparkles size={14} />
            AI cinematic editing for automotive footage
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="max-w-4xl text-5xl font-black uppercase leading-[.92] tracking-[-.055em] sm:text-6xl lg:text-[88px]"
          >
            Raw footage.
            <br />
            <span className="bg-gradient-to-r from-electric via-white to-nitro bg-clip-text text-transparent">
              Full send.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg"
          >
            Drop in drift runs, track sessions or car-meet footage. Redline AI
            structures the edit, syncs cuts to music, applies aggressive color
            treatment and prepares platform-specific masters from one workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/workspace" className="neon-button !px-6 !py-4">
              Start an edit
              <ArrowRight size={17} />
            </Link>
            <a href="#engine" className="ghost-button !px-6 !py-4">
              <WandSparkles size={17} />
              See the engine
            </a>
          </motion.div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-2">
            {stats.map(([value, label]) => (
              <div
                key={value}
                className="rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-4"
              >
                <div className="text-lg font-black tracking-tight text-white">
                  {value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, x: 25 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative mx-auto w-full max-w-[680px]"
        >
          <div className="absolute inset-8 rounded-[42px] bg-electric/15 blur-3xl" />
          <div className="glass-panel relative overflow-hidden rounded-[30px] p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-white/10 bg-[#08090b]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(0,229,255,.22),transparent_23%),linear-gradient(135deg,#060708,#15181b_55%,#08090a)]" />
              <div className="absolute inset-x-[-10%] bottom-[18%] h-[18%] rotate-[-2deg] bg-gradient-to-r from-transparent via-white/[0.055] to-transparent blur-lg" />
              <div className="absolute bottom-[24%] left-[15%] right-[10%] h-[18%] rounded-[50%_45%_24%_22%] bg-gradient-to-b from-white/15 via-white/[0.07] to-black shadow-2xl car-silhouette">
                <div className="absolute -bottom-4 left-[12%] size-14 rounded-full border-[9px] border-[#050506] bg-[#2a2d32] shadow-[0_0_0_3px_rgba(255,255,255,.08)]" />
                <div className="absolute -bottom-4 right-[15%] size-14 rounded-full border-[9px] border-[#050506] bg-[#2a2d32] shadow-[0_0_0_3px_rgba(255,255,255,.08)]" />
                <div className="absolute -top-[45%] left-[34%] h-[65%] w-[37%] skew-x-[-22deg] rounded-t-3xl bg-gradient-to-b from-electric/20 to-white/5" />
                <div className="absolute right-[5%] top-[30%] h-2 w-10 rounded-full bg-ember shadow-[0_0_18px_rgba(255,90,31,.8)]" />
              </div>
              <div className="absolute left-6 top-6 flex gap-2">
                <span className="rounded-lg border border-electric/30 bg-black/55 px-2.5 py-1 text-[10px] font-bold text-electric">
                  AI CUT 07
                </span>
                <span className="rounded-lg border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] text-white/55">
                  01:13:24
                </span>
              </div>
              <div className="absolute inset-x-7 bottom-6">
                <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
                  <span>Phonk beat map</span>
                  <span>128 BPM</span>
                </div>
                <div className="flex h-14 items-center gap-[3px] overflow-hidden rounded-xl border border-white/10 bg-black/45 px-3">
                  {Array.from({ length: 52 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1 shrink-0 rounded-full bg-electric/65"
                      style={{ height: `${12 + ((i * 17) % 34)}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3">
              {[
                [Clapperboard, "Scene AI", "14 selects"],
                [AudioWaveform, "Beat sync", "Locked"],
                [Gauge, "Velocity", "Extreme"]
              ].map(([Icon, label, value]) => {
                const I = Icon as typeof Clapperboard;
                return (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3 py-3"
                  >
                    <I size={15} className="mb-2 text-electric" />
                    <div className="text-[10px] uppercase tracking-widest text-white/35">
                      {String(label)}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-white/80">
                      {String(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
