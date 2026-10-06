"use client";

import { useMemo } from "react";
import { Ratio, SlidersHorizontal } from "lucide-react";
import { codecOptions, dimensionsFor } from "@/lib/media/formats";
import { useEditorStore } from "@/store/editor-store";
import type {
  AspectRatio,
  ExportConfig,
  OutputCodec,
  OutputContainer
} from "@/types/editor";

export function FormatConverter() {
  const exportConfig = useEditorStore((s) => s.exportConfig);
  const setExportConfig = useEditorStore((s) => s.setExportConfig);
  const assets = useEditorStore((s) => s.assets);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selected = useMemo(
    () => assets.find((a) => a.id === selectedId),
    [assets, selectedId]
  );

  const updateGeometry = (
    resolution: ExportConfig["resolution"],
    aspectRatio: AspectRatio
  ) => {
    const dims = dimensionsFor(resolution, aspectRatio);
    setExportConfig({ resolution, aspectRatio, ...dims });
  };

  const setContainer = (container: OutputContainer) => {
    const codecs = codecOptions(container);
    const codec = codecs.includes(exportConfig.codec)
      ? exportConfig.codec
      : codecs[0];
    setExportConfig({ container, codec });
  };

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="panel-title flex items-center gap-2">
          <SlidersHorizontal size={13} />
          Format converter
        </div>
        <div className="text-[10px] uppercase tracking-wider text-white/30">
          {selected?.ext ?? "—"} → {exportConfig.container.toUpperCase()}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <label>
          <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/30">
            Container
          </span>
          <select
            className="input-shell"
            value={exportConfig.container}
            onChange={(e) => setContainer(e.target.value as OutputContainer)}
          >
            <option value="mp4">MP4</option>
            <option value="mov">MOV</option>
            <option value="webm">WebM</option>
          </select>
        </label>

        <label>
          <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/30">
            Codec
          </span>
          <select
            className="input-shell"
            value={exportConfig.codec}
            onChange={(e) => setExportConfig({ codec: e.target.value as OutputCodec })}
          >
            {codecOptions(exportConfig.container).map((codec) => (
              <option key={codec} value={codec}>
                {codec.toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/30">
            Resolution
          </span>
          <select
            className="input-shell"
            value={exportConfig.resolution}
            onChange={(e) =>
              updateGeometry(
                e.target.value as ExportConfig["resolution"],
                exportConfig.aspectRatio
              )
            }
          >
            <option value="2160p">4K / 2160p</option>
            <option value="1080p">Full HD / 1080p</option>
            <option value="720p">HD / 720p</option>
          </select>
        </label>

        <label>
          <span className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/30">
            <Ratio size={12} />
            Aspect
          </span>
          <select
            className="input-shell"
            value={exportConfig.aspectRatio}
            onChange={(e) =>
              updateGeometry(
                exportConfig.resolution,
                e.target.value as AspectRatio
              )
            }
          >
            <option value="16:9">16:9 YouTube</option>
            <option value="9:16">9:16 Reels / TikTok</option>
            <option value="1:1">1:1 Square</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <label className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
          <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-white/35">
            <span>Bitrate</span>
            <span className="text-electric">{exportConfig.bitrateMbps} Mbps</span>
          </div>
          <input
            className="range-accent w-full"
            type="range"
            min={4}
            max={120}
            step={1}
            value={exportConfig.bitrateMbps}
            onChange={(e) =>
              setExportConfig({ bitrateMbps: Number(e.target.value) })
            }
          />
        </label>

        <label className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
          <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-white/35">
            <span>Framerate</span>
            <span className="text-nitro">{exportConfig.framerate} fps</span>
          </div>
          <select
            className="w-full bg-transparent text-xs text-white/75 outline-none"
            value={exportConfig.framerate}
            onChange={(e) =>
              setExportConfig({
                framerate: Number(e.target.value) as ExportConfig["framerate"]
              })
            }
          >
            {[24, 25, 30, 50, 60, 120].map((fps) => (
              <option key={fps} value={fps} className="bg-carbon-900">
                {fps} fps {fps === 120 ? "· extreme slow-mo source" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[10px] uppercase tracking-wider text-white/30">
        <span>Output canvas</span>
        <span className="text-white/60">
          {exportConfig.width} × {exportConfig.height}
        </span>
      </div>
    </div>
  );
}
