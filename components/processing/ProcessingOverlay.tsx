"use client";

import { Activity, AudioWaveform, Palette, Sparkles } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";

export function ProcessingOverlay() {
  const processing = useEditorStore((s) => s.processing);
  const progress = useEditorStore((s) => s.progress);
  const statusMessage = useEditorStore((s) => s.statusMessage);

  if (!processing) return null;

  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-black/72 p-5 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-3xl border border-electric/20 bg-[#0a0c0e]/95 p-6 shadow-neon">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-electric/10 text-electric">
            <Activity size={19} className="animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-black uppercase tracking-[.12em]">
              AI Render Engine
            </div>
            <div className="mt-1 text-xs text-white/38">{statusMessage}</div>
          </div>
          <div className="ml-auto text-2xl font-black tabular-nums text-electric">
            {Math.round(progress)}%
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full border border-white/[0.06] bg-black/55">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric via-cyan-300 to-nitro transition-all duration-500 shadow-[0_0_24px_rgba(0,229,255,.55)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            [AudioWaveform, "Processing beats"],
            [Palette, "Applying LUT"],
            [Sparkles, "Audio FX"]
          ].map(([Icon, label]) => {
            const I = Icon as typeof AudioWaveform;
            return (
              <div key={String(label)} className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                <I size={15} className="text-white/45" />
                <div className="mt-2 text-[9px] uppercase tracking-wider text-white/28">
                  {String(label)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
