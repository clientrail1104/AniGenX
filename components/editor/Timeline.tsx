"use client";

import { AudioWaveform, Scissors } from "lucide-react";

export function Timeline() {
  const clips = [14, 22, 11, 18, 9, 26, 13, 17];

  return (
    <div className="glass-panel rounded-2xl p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="panel-title flex items-center gap-2">
          <Scissors size={13} />
          AI Timeline
        </div>
        <div className="text-[10px] uppercase tracking-wider text-white/30">
          00:00:00:00 — 00:00:28:14
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-black/35 p-2">
        <div className="flex h-11 gap-1">
          {clips.map((width, i) => (
            <div
              key={i}
              className={`relative min-w-[42px] rounded-md border ${
                i % 3 === 0
                  ? "border-electric/30 bg-electric/10"
                  : i % 3 === 1
                    ? "border-nitro/20 bg-nitro/[0.06]"
                    : "border-white/10 bg-white/[0.04]"
              }`}
              style={{ flex: width }}
            >
              <span className="absolute left-2 top-1.5 text-[8px] font-bold uppercase tracking-wider text-white/35">
                C{i + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-1 flex h-9 items-center gap-[2px] rounded-md bg-[#0d1114] px-2">
          <AudioWaveform size={13} className="mr-2 shrink-0 text-electric" />
          {Array.from({ length: 74 }).map((_, i) => (
            <span
              key={i}
              className="w-[2px] shrink-0 rounded-full bg-electric/45"
              style={{ height: `${4 + ((i * 13) % 22)}px` }}
            />
          ))}
        </div>

        <div className="absolute bottom-2 left-[43%] top-2 w-px bg-ember shadow-[0_0_10px_rgba(255,90,31,.8)]" />
      </div>
    </div>
  );
}
