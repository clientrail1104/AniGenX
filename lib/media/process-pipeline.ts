export const demoStages = [
  { at: 8, label: "Analyzing velocity & scene energy..." },
  { at: 22, label: "Detecting beats and musical transients..." },
  { at: 39, label: "Building hero selects..." },
  { at: 57, label: "Applying color LUT..." },
  { at: 73, label: "Processing beats..." },
  { at: 87, label: "Injecting exhaust audio effects..." },
  { at: 96, label: "Packaging social masters..." },
  { at: 100, label: "Render complete" }
];

export async function runDemoPipeline(
  onProgress: (progress: number, label: string) => void
) {
  for (const stage of demoStages) {
    await new Promise((resolve) => setTimeout(resolve, stage.at === 100 ? 450 : 550));
    onProgress(stage.at, stage.label);
  }
}
