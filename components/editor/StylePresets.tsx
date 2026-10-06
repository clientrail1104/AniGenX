"use client";

import { Flame, MoonStar, Music2 } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import type { EditPresetId } from "@/types/editor";

const presets: Array<{
  id: EditPresetId;
  title: string;
  subtitle: string;
  icon: typeof Flame;
  accent: string;
}> = [
  {
    id: "drift-night",
    title: "Drift Night Smoke",
    subtitle: "Cool shadows · hot tail lights",
    icon: MoonStar,
    accent: "text-electric"
  },
  {
    id: "hyper-speed",
    title: "Hyper-Speed Cuts",
    subtitle: "Impact edits · velocity ramps",
    icon: Flame,
    accent: "text-ember"
  },
  {
    id: "phonk-sync",
    title: "Phonk Beat-Sync",
    subtitle: "Bass cuts · exhaust accents",
    icon: Music2,
    accent: "text-nitro"
  }
];

export function StylePresets() {
  const preset = useEditorStore((s) => s.preset);
  const setPreset = useEditorStore((s) => s.setPreset);

  return (
    <div className="space-y-2">
      {presets.map(({ id, title, subtitle, icon: Icon, accent }) => {
        const active = preset === id;
        return (
          <button
            key={id}
            onClick={() => setPreset(id)}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
              active
                ? "border-white/20 bg-white/[0.07]"
                : "border-white/[0.055] bg-white/[0.018] hover:bg-white/[0.04]"
            }`}
          >
            <div className={`grid size-9 place-items-center rounded-xl bg-black/25 ${accent}`}>
              <Icon size={17} />
            </div>
            <div>
              <div className="text-xs font-bold text-white/78">{title}</div>
              <div className="mt-0.5 text-[10px] text-white/30">{subtitle}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
