export type ProcessingMode = "demo" | "browser" | "cloud";
export type EditPresetId = "drift-night" | "hyper-speed" | "phonk-sync";
export type OutputContainer = "mp4" | "mov" | "webm";
export type OutputCodec = "h264" | "h265" | "prores" | "vp9";
export type AspectRatio = "16:9" | "9:16" | "1:1";

export type MediaKind = "video" | "raw" | "unknown";

export interface MediaAsset {
  id: string;
  file: File;
  name: string;
  ext: string;
  size: number;
  mime: string;
  kind: MediaKind;
  previewable: boolean;
  objectUrl: string;
}

export interface ExportConfig {
  container: OutputContainer;
  codec: OutputCodec;
  resolution: "2160p" | "1080p" | "720p";
  width: number;
  height: number;
  bitrateMbps: number;
  framerate: 24 | 25 | 30 | 50 | 60 | 120;
  aspectRatio: AspectRatio;
}

export interface CloudJobResult {
  jobId: string;
  status: string;
  percentComplete?: number;
  outputPath?: string;
}
