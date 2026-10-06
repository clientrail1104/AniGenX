"use client";

import type { CloudJobResult, ExportConfig } from "@/types/editor";

export async function submitCloudTranscode(
  file: File,
  config: ExportConfig,
  preset: string,
  onProgress?: (progress: number, label: string) => void
) {
  onProgress?.(7, "Preparing secure cloud upload...");

  const uploadResponse = await fetch("/api/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type || "application/octet-stream"
    })
  });

  if (!uploadResponse.ok) {
    throw new Error(await uploadResponse.text());
  }

  const upload = await uploadResponse.json();

  onProgress?.(18, "Uploading source media...");
  const putResponse = await fetch(upload.url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream"
    },
    body: file
  });

  if (!putResponse.ok) {
    throw new Error("Cloud upload failed.");
  }

  onProgress?.(35, "Submitting MediaConvert job...");
  const jobResponse = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputKey: upload.key,
      config,
      preset
    })
  });

  if (!jobResponse.ok) {
    throw new Error(await jobResponse.text());
  }

  const job = (await jobResponse.json()) as CloudJobResult;
  onProgress?.(42, "Cloud render queued...");

  return job;
}

export async function pollCloudJob(
  jobId: string,
  onProgress?: (progress: number, label: string) => void
): Promise<CloudJobResult> {
  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const response = await fetch(`/api/jobs/${jobId}`, { cache: "no-store" });
    if (!response.ok) throw new Error(await response.text());

    const job = (await response.json()) as CloudJobResult;
    const pct = Math.max(42, Math.min(99, job.percentComplete ?? 42));
    onProgress?.(pct, `Cloud render: ${job.status.toLowerCase()}...`);

    if (job.status === "COMPLETE") {
      onProgress?.(100, "Cloud render complete");
      return job;
    }

    if (["ERROR", "CANCELED"].includes(job.status)) {
      throw new Error(`MediaConvert job ended with status: ${job.status}`);
    }
  }
}
