"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import type { ExportConfig } from "@/types/editor";

let ffmpeg: FFmpeg | null = null;
let loaded = false;

async function getFFmpeg(onProgress?: (ratio: number) => void) {
  if (!ffmpeg) {
    ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress }) => onProgress?.(progress));
  }

  if (!loaded) {
    const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm")
    });
    loaded = true;
  }

  return ffmpeg;
}

/**
 * Browser mode is deliberately limited to preview-grade VP9/WebM.
 * Production H.264, HEVC, ProRes, RAW and large 4K jobs should use cloud mode.
 */
export async function transcodeBrowserPreview(
  file: File,
  config: ExportConfig,
  onProgress?: (ratio: number) => void
) {
  if (config.container !== "webm" || config.codec !== "vp9") {
    throw new Error(
      "Browser mode finalizes WebM/VP9 only. Use cloud mode for H.264, H.265 or ProRes."
    );
  }

  const worker = await getFFmpeg(onProgress);
  const inputName = `input-${Date.now()}.${file.name.split(".").pop() || "bin"}`;
  const outputName = `redline-preview-${Date.now()}.webm`;

  await worker.writeFile(inputName, await fetchFile(file));

  const targetBitrate = `${Math.max(1, config.bitrateMbps)}M`;
  const vf = `scale=${config.width}:${config.height}:force_original_aspect_ratio=decrease,pad=${config.width}:${config.height}:(ow-iw)/2:(oh-ih)/2`;

  await worker.exec([
    "-i",
    inputName,
    "-vf",
    vf,
    "-r",
    String(config.framerate),
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    targetBitrate,
    "-c:a",
    "libopus",
    outputName
  ]);

  const data = await worker.readFile(outputName);
  await worker.deleteFile(inputName);
  await worker.deleteFile(outputName);

  return new Blob([data], { type: "video/webm" });
}
