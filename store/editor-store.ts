"use client";

import { create } from "zustand";
import type {
  EditPresetId,
  ExportConfig,
  MediaAsset,
  ProcessingMode
} from "@/types/editor";

const defaultExport: ExportConfig = {
  container: "mp4",
  codec: "h264",
  resolution: "1080p",
  width: 1920,
  height: 1080,
  bitrateMbps: 24,
  framerate: 60,
  aspectRatio: "16:9"
};

interface EditorState {
  assets: MediaAsset[];
  selectedId: string | null;
  preset: EditPresetId;
  exportConfig: ExportConfig;
  processingMode: ProcessingMode;
  processing: boolean;
  progress: number;
  statusMessage: string;
  lastCloudJobId: string | null;
  addAssets: (assets: MediaAsset[]) => void;
  removeAsset: (id: string) => void;
  selectAsset: (id: string) => void;
  setPreset: (preset: EditPresetId) => void;
  setExportConfig: (patch: Partial<ExportConfig>) => void;
  setProcessingMode: (mode: ProcessingMode) => void;
  setProcessing: (processing: boolean) => void;
  setProgress: (progress: number, statusMessage?: string) => void;
  setLastCloudJobId: (jobId: string | null) => void;
}

const envMode =
  (process.env.NEXT_PUBLIC_PROCESSING_MODE as ProcessingMode | undefined) ?? "demo";

export const useEditorStore = create<EditorState>((set) => ({
  assets: [],
  selectedId: null,
  preset: "phonk-sync",
  exportConfig: defaultExport,
  processingMode: ["demo", "browser", "cloud"].includes(envMode) ? envMode : "demo",
  processing: false,
  progress: 0,
  statusMessage: "Ready",
  lastCloudJobId: null,

  addAssets: (assets) =>
    set((state) => ({
      assets: [...state.assets, ...assets],
      selectedId: state.selectedId ?? assets[0]?.id ?? null
    })),

  removeAsset: (id) =>
    set((state) => {
      const item = state.assets.find((asset) => asset.id === id);
      if (item?.objectUrl) URL.revokeObjectURL(item.objectUrl);
      const next = state.assets.filter((asset) => asset.id !== id);
      return {
        assets: next,
        selectedId:
          state.selectedId === id ? (next[0]?.id ?? null) : state.selectedId
      };
    }),

  selectAsset: (selectedId) => set({ selectedId }),
  setPreset: (preset) => set({ preset }),
  setExportConfig: (patch) =>
    set((state) => ({ exportConfig: { ...state.exportConfig, ...patch } })),
  setProcessingMode: (processingMode) => set({ processingMode }),
  setProcessing: (processing) => set({ processing }),
  setProgress: (progress, statusMessage) =>
    set((state) => ({
      progress,
      statusMessage: statusMessage ?? state.statusMessage
    })),
  setLastCloudJobId: (lastCloudJobId) => set({ lastCloudJobId })
}));
