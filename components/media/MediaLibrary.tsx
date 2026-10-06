"use client";

import { Film, Trash2 } from "lucide-react";
import { prettyBytes } from "@/lib/media/formats";
import { useEditorStore } from "@/store/editor-store";

export function MediaLibrary() {
  const assets = useEditorStore((s) => s.assets);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectAsset = useEditorStore((s) => s.selectAsset);
  const removeAsset = useEditorStore((s) => s.removeAsset);

  if (!assets.length) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-black/15 p-5 text-center">
        <Film size={18} className="mx-auto text-white/25" />
        <p className="mt-3 text-xs text-white/30">Your media library is empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {assets.map((asset, index) => {
        const active = asset.id === selectedId;
        return (
          <button
            key={asset.id}
            onClick={() => selectAsset(asset.id)}
            className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
              active
                ? "border-electric/40 bg-electric/[0.07]"
                : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <div
              className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                active ? "bg-electric/15 text-electric" : "bg-black/30 text-white/35"
              }`}
            >
              <span className="text-[10px] font-black">{asset.ext.slice(0, 5)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold text-white/75">
                {index + 1}. {asset.name}
              </div>
              <div className="mt-1 flex gap-2 text-[10px] uppercase tracking-wider text-white/30">
                <span>{prettyBytes(asset.size)}</span>
                <span>•</span>
                <span>{asset.kind}</span>
              </div>
            </div>
            <span
              role="button"
              tabIndex={0}
              aria-label={`Remove ${asset.name}`}
              onClick={(e) => {
                e.stopPropagation();
                removeAsset(asset.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  removeAsset(asset.id);
                }
              }}
              className="grid size-8 place-items-center rounded-lg text-white/20 opacity-0 transition hover:bg-white/[0.05] hover:text-ember group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
