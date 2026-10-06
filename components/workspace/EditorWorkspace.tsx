"use client";

import Link from "next/link";
import {
  ChevronLeft,
  CircleDot,
  Gauge,
  Library,
  PanelsTopLeft,
  Settings2
} from "lucide-react";
import { MediaDropzone } from "@/components/media/MediaDropzone";
import { MediaLibrary } from "@/components/media/MediaLibrary";
import { StylePresets } from "@/components/editor/StylePresets";
import { VideoPreview } from "@/components/editor/VideoPreview";
import { Timeline } from "@/components/editor/Timeline";
import { FormatConverter } from "@/components/export/FormatConverter";
import { ExportPanel } from "@/components/export/ExportPanel";
import { ProcessingOverlay } from "@/components/processing/ProcessingOverlay";

export function EditorWorkspace() {
  return (
    <main className="min-h-screen bg-carbon-950 text-white">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/[0.06] bg-carbon-950/90 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="grid size-8 place-items-center rounded-lg border border-white/[0.07] text-white/40 hover:text-white"
          >
            <ChevronLeft size={16} />
          </Link>
          <div className="flex items-center gap-2">
            <Gauge size={17} className="text-electric" />
            <span className="text-xs font-black uppercase tracking-[.16em]">
              Redline AI <span className="text-white/25">/ Workspace</span>
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-[10px] uppercase tracking-wider text-white/30 sm:flex">
          <CircleDot size={10} className="text-nitro" fill="currentColor" />
          Autosave active
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-3.5rem)] lg:grid-cols-[345px_minmax(0,1fr)]">
        <aside className="border-r border-white/[0.06] bg-[#090a0b] p-4">
          <div className="panel-title flex items-center gap-2">
            <PanelsTopLeft size={13} />
            Media ingest
          </div>
          <div className="mt-3">
            <MediaDropzone />
          </div>

          <div className="mt-6">
            <div className="panel-title mb-3 flex items-center gap-2">
              <Library size={13} />
              Media library
            </div>
            <MediaLibrary />
          </div>

          <div className="mt-6">
            <div className="panel-title mb-3 flex items-center gap-2">
              <Settings2 size={13} />
              AI editing style
            </div>
            <StylePresets />
          </div>
        </aside>

        <section className="relative min-w-0 bg-[radial-gradient(circle_at_75%_0%,rgba(0,229,255,.06),transparent_30%)] p-3 sm:p-4 xl:p-5">
          <ProcessingOverlay />
          <div className="mx-auto grid max-w-[1500px] gap-4">
            <VideoPreview />
            <Timeline />
            <div className="grid gap-4 xl:grid-cols-[1.45fr_.55fr]">
              <FormatConverter />
              <ExportPanel />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
