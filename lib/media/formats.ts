import type {
  AspectRatio,
  ExportConfig,
  MediaKind,
  OutputCodec,
  OutputContainer
} from "@/types/editor";

const RAW_EXTENSIONS = new Set([
  "r3d",
  "braw",
  "ari",
  "arx",
  "cin",
  "dng",
  "crm",
  "mxf"
]);

const VIDEO_EXTENSIONS = new Set([
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  "m4v",
  "mts",
  "m2ts",
  "mpg",
  "mpeg",
  "prores"
]);

const BROWSER_PREVIEW_EXTENSIONS = new Set(["mp4", "webm", "m4v"]);

export function extensionOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function classifyMedia(name: string): MediaKind {
  const ext = extensionOf(name);
  if (RAW_EXTENSIONS.has(ext)) return "raw";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  return "unknown";
}

export function isPreviewable(name: string) {
  return BROWSER_PREVIEW_EXTENSIONS.has(extensionOf(name));
}

export function prettyBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(i >= 2 ? 2 : 1)} ${units[i]}`;
}

export function codecOptions(container: OutputContainer): OutputCodec[] {
  if (container === "mov") return ["prores", "h264", "h265"];
  if (container === "webm") return ["vp9"];
  return ["h264", "h265"];
}

export function dimensionsFor(
  resolution: ExportConfig["resolution"],
  aspectRatio: AspectRatio
) {
  const longEdge = resolution === "2160p" ? 3840 : resolution === "1080p" ? 1920 : 1280;
  const shortEdge = resolution === "2160p" ? 2160 : resolution === "1080p" ? 1080 : 720;

  if (aspectRatio === "9:16") return { width: shortEdge, height: longEdge };
  if (aspectRatio === "1:1") return { width: shortEdge, height: shortEdge };
  return { width: longEdge, height: shortEdge };
}

export function browserCanFinalize(config: ExportConfig) {
  return config.container === "webm" && config.codec === "vp9";
}

export const INPUT_ACCEPT =
  "video/*,.mkv,.avi,.mov,.mp4,.webm,.mxf,.r3d,.braw,.ari,.arx,.cin,.dng,.crm,.m2ts,.mts";
