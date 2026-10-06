"use client";

import { Maximize2, Play, SlidersHorizontal, Volume2 } from "lucide-react";
import { useMemo, useRef } from "react";
import { useEditorStore } from "@/store/editor-store";

export function VideoPreview() {
  const assets = useEditorStore((s) => s.assets);
  const selectedId = useEditorStore((s) => s.selectedId);
  const preset = useEditorStore((s) => s.preset);
  const videoRef = useRef<HTMLVideoElement>(null);

  const selected = useMemo(
    () => assets.find((asset) => asset.id === selectedId) ?? null,
    [assets, selectedId]
  );

  return (
    <div className="glass-panel overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div>
          <div className="panel-title">Realtime preview</div>
          <div className="mt-1 max-w-[52vw] truncate text-xs text-white/65">
            {selected?.name ?? "No media selected"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-electric/20 bg-electric/[0.06] px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-electric">
            {preset.replace("-", " ")}
          </span>
          <button className="grid size-8 place-items-center rounded-lg border border-white/[0.07] text-white/40 hover:text-white">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden bg-[#050607]">
        {selected?.previewable ? (
          <video
            ref={videoRef}
            src={selected.objectUrl}
            controls
            playsInline
            className="h-full w-full object-contain"
          />
        ) : selected ? (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(0,229,255,.08),transparent_36%)]">
            <div className="max-w-md px-6 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-electric/20 bg-electric/[0.07] text-electric">
                <Play size={22} fill="currentColor" />
              </div>
              <div className="mt-5 text-sm font-bold">Cloud proxy required</div>
              <p className="mt-2 text-xs leading-5 text-white/35">
                {selected.ext} is accepted for the production pipeline but is not
                guaranteed to preview natively in the browser. Generate a proxy or
                process it in cloud mode.
              </p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <Play size={28} className="mx-auto text-white/15" />
              <div className="mt-4 text-sm text-white/35">Upload footage to begin.</div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      </div>

      <div className="flex items-center justify-between px-4 py-3 text-white/35">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider">
          <span>Viewer</span>
          <span className="text-white/15">/</span>
          <span>Fit</span>
          <span className="text-white/15">/</span>
          <span>100%</span>
        </div>
        <div className="flex items-center gap-3">
          <Volume2 size={14} />
          <SlidersHorizontal size={14} />
        </div>
      </div>
    </div>
  );
}
