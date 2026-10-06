"use client";

import { useMemo, useState } from "react";
import { Cloud, Cpu, Download, FlaskConical, Zap } from "lucide-react";
import { browserCanFinalize } from "@/lib/media/formats";
import { runDemoPipeline } from "@/lib/media/process-pipeline";
import { transcodeBrowserPreview } from "@/lib/media/browser-transcoder";
import { pollCloudJob, submitCloudTranscode } from "@/lib/media/cloud-client";
import { useEditorStore } from "@/store/editor-store";
import type { ProcessingMode } from "@/types/editor";

export function ExportPanel() {
  const assets = useEditorStore((s) => s.assets);
  const selectedId = useEditorStore((s) => s.selectedId);
  const exportConfig = useEditorStore((s) => s.exportConfig);
  const preset = useEditorStore((s) => s.preset);
  const processingMode = useEditorStore((s) => s.processingMode);
  const setProcessingMode = useEditorStore((s) => s.setProcessingMode);
  const setProcessing = useEditorStore((s) => s.setProcessing);
  const setProgress = useEditorStore((s) => s.setProgress);
  const setLastCloudJobId = useEditorStore((s) => s.setLastCloudJobId);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const selected = useMemo(
    () => assets.find((asset) => asset.id === selectedId) ?? null,
    [assets, selectedId]
  );

  const render = async () => {
    if (!selected) {
      setMessage("Upload and select a source clip first.");
      return;
    }

    setMessage(null);
    setDownloadUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setProcessing(true);
    setProgress(2, "Initializing render engine...");

    try {
      if (processingMode === "demo") {
        await runDemoPipeline(setProgress);
        setMessage(
          "Demo render complete. Switch to Browser mode for VP9/WebM or Cloud mode for production masters."
        );
      }

      if (processingMode === "browser") {
        if (!browserCanFinalize(exportConfig)) {
          throw new Error(
            "Browser mode is intentionally limited to WebM / VP9. Choose WebM + VP9 or use Cloud mode."
          );
        }
        setProgress(8, "Loading FFmpeg WebAssembly...");
        const blob = await transcodeBrowserPreview(
          selected.file,
          exportConfig,
          (ratio) => setProgress(Math.max(10, Math.round(ratio * 100)), "Encoding VP9 preview...")
        );
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setProgress(100, "Browser render complete");
        setMessage("Preview-grade WebM export is ready.");
      }

      if (processingMode === "cloud") {
        const job = await submitCloudTranscode(
          selected.file,
          exportConfig,
          preset,
          setProgress
        );
        if (!job.jobId) throw new Error("Cloud job did not return an id.");
        setLastCloudJobId(job.jobId);
        const finalJob = await pollCloudJob(job.jobId, setProgress);
        setMessage(
          `Cloud render completed. MediaConvert job ${finalJob.jobId} finished successfully.`
        );
      }
    } catch (error) {
      setProgress(0, "Render failed");
      setMessage(error instanceof Error ? error.message : "Render failed.");
    } finally {
      setTimeout(() => setProcessing(false), 450);
    }
  };

  const modes: Array<[ProcessingMode, typeof FlaskConical, string]> = [
    ["demo", FlaskConical, "UI demo"],
    ["browser", Cpu, "Browser"],
    ["cloud", Cloud, "Cloud"]
  ];

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="panel-title">Export engine</div>
          <div className="mt-1 text-xs text-white/45">
            Choose the processing path for this render.
          </div>
        </div>

        <div className="flex rounded-xl border border-white/[0.07] bg-black/25 p-1">
          {modes.map(([mode, Icon, label]) => (
            <button
              key={mode}
              onClick={() => setProcessingMode(mode)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider transition ${
                processingMode === mode
                  ? "bg-white/10 text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={render}
          disabled={!selected}
          className="neon-button flex-1"
        >
          <Zap size={16} fill="currentColor" />
          Render with AI
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={`redline-${exportConfig.width}x${exportConfig.height}.webm`}
            className="ghost-button"
          >
            <Download size={16} />
            Download preview
          </a>
        )}
      </div>

      {message && (
        <div className="mt-3 rounded-xl border border-white/[0.06] bg-black/25 px-3 py-2.5 text-xs leading-5 text-white/50">
          {message}
        </div>
      )}

      <div className="mt-3 text-[10px] leading-5 text-white/25">
        Browser mode is intentionally conservative. H.264/H.265, ProRes, RAW camera
        originals and large 4K jobs are routed to cloud mode.
      </div>
    </div>
  );
}
