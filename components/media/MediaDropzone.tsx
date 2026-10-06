"use client";

import { useRef, useState } from "react";
import { FileVideo2, HardDriveUpload, ScanSearch } from "lucide-react";
import { classifyMedia, extensionOf, INPUT_ACCEPT, isPreviewable, prettyBytes } from "@/lib/media/formats";
import { useEditorStore } from "@/store/editor-store";
import type { MediaAsset } from "@/types/editor";

export function MediaDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const addAssets = useEditorStore((s) => s.addAssets);

  const ingest = (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList).slice(0, 12);
    const assets: MediaAsset[] = incoming.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      ext: extensionOf(file.name).toUpperCase() || "FILE",
      size: file.size,
      mime: file.type || "application/octet-stream",
      kind: classifyMedia(file.name),
      previewable: isPreviewable(file.name),
      objectUrl: URL.createObjectURL(file)
    }));
    addAssets(assets);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-dashed p-5 transition ${
        dragging
          ? "border-electric bg-electric/[0.08] shadow-neon"
          : "border-white/15 bg-black/20 hover:border-electric/35 hover:bg-electric/[0.025]"
      }`}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        e.preventDefault();
        if (e.currentTarget === e.target) setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        ingest(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={INPUT_ACCEPT}
        className="hidden"
        onChange={(e) => e.target.files && ingest(e.target.files)}
      />

      <div className="flex items-start gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-electric/20 bg-electric/[0.07] text-electric">
          <HardDriveUpload size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">Drop raw footage</div>
          <p className="mt-1 text-xs leading-5 text-white/38">
            MP4, MOV, AVI, MKV, WebM, MXF, ProRes and camera-original formats.
          </p>
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-3 text-xs font-bold uppercase tracking-wider text-electric"
          >
            Browse files
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
          <FileVideo2 size={14} className="text-white/45" />
          <div className="mt-2 text-[10px] uppercase tracking-wider text-white/30">
            Smart type detect
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
          <ScanSearch size={14} className="text-white/45" />
          <div className="mt-2 text-[10px] uppercase tracking-wider text-white/30">
            Size calculated
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-electric/5 blur-2xl transition group-hover:bg-electric/10" />
    </div>
  );
}
