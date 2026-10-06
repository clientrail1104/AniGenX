# Redline AI — Extreme Auto Video Editing SaaS

A production-oriented Next.js 15 starter for an automotive AI video editing platform.

## Stack

- Next.js 15.5 App Router
- React 19
- Tailwind CSS 3.4 with a custom cyberpunk automotive theme
- Motion for React
- Lucide React
- Zustand
- FFmpeg WebAssembly for controlled browser-side preview transcodes
- AWS S3 + AWS Elemental MediaConvert adapter for production cloud encoding

## What is implemented

### Landing page
- Dark obsidian / carbon grid visual system
- Neon electric blue, toxic green and nitro orange accents
- High-conversion hero
- Responsive feature and architecture sections
- Direct path into the editor

### Workspace
- Dual-pane editor layout
- Drag-and-drop multi-file ingest
- File type and size detection
- Media library
- Automotive AI style presets
- Interactive native preview for browser-playable footage
- Proxy warning for camera-original / unsupported browser formats
- AI timeline visualisation
- Output container, codec, resolution, aspect, bitrate and FPS controls
- Processing animation with staged render messaging
- Demo, browser and cloud processing modes

### Media pipeline
Three explicit modes are used:

1. **Demo mode**
   - Shows the complete UI and staged AI-processing experience
   - Does not produce a real video

2. **Browser mode**
   - Uses ffmpeg.wasm
   - Intentionally restricted to preview-grade WebM / VP9
   - Designed for smaller source clips and local proof-of-concept work

3. **Cloud mode**
   - Uploads input securely to S3 through a presigned URL
   - Submits an AWS Elemental MediaConvert job
   - Supports MP4 H.264/H.265, MOV/ProRes and WebM/VP9 job configuration
   - Polls job progress from the Next.js backend
   - Recommended for RAW/camera-original media, large files and production masters

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

Workspace:

```text
http://localhost:3000/workspace
```

## Cloud setup

Set:

```env
NEXT_PUBLIC_PROCESSING_MODE=cloud
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_INPUT_BUCKET=...
AWS_S3_OUTPUT_BUCKET=...
AWS_MEDIACONVERT_ROLE_ARN=...
AWS_MEDIACONVERT_ENDPOINT=...
```

Recommended production security:

- Prefer an IAM role on the host instead of long-lived access keys
- Restrict the S3 input bucket to upload-only prefixes
- Restrict the MediaConvert role to exact source/output buckets
- Add authentication before exposing `/api/upload-url` and `/api/jobs`
- Add user/tenant ownership to S3 keys
- Add upload size limits, malware scanning and quota enforcement
- Store job records in a database
- Deliver completed renders through signed CloudFront or S3 download URLs

## Important format note

No single browser codec stack reliably supports every professional camera format. This project therefore treats “any format” as a hybrid-ingest requirement:

- accept a broad set of source containers and camera originals
- preview natively when the browser supports it
- generate browser proxies when practical
- send production-grade or unsupported formats to cloud transcoding

That is the safer architecture for ProRes, RAW, H.264/H.265 masters and multi-gigabyte 4K footage.

## Where to add the actual AI editor

The UI already exposes the correct seam for AI edit intelligence.

Create a service such as:

```text
lib/ai/edit-plan.ts
```

It should return an edit decision list containing:

- source clip id
- in / out timecodes
- motion score
- detected scene type
- beat alignment
- transition type
- speed-ramp intent
- LUT / grade intent
- sound effect cues
- subtitle / title events

The resulting edit plan can then be converted into an FFmpeg filter graph, Remotion composition, NLE XML/EDL or a server-side render graph.

## Project structure

```text
app/
  api/
    upload-url/route.ts
    jobs/route.ts
    jobs/[id]/route.ts
  workspace/page.tsx
  globals.css
  layout.tsx
  page.tsx

components/
  editor/
  export/
  landing/
  media/
  navigation/
  processing/
  ui/
  workspace/

lib/
  aws.ts
  media/

store/
  editor-store.ts

types/
  editor.ts

docs/
  KCR-Video-Editing-Guide.md
```

## KCR alignment

The included `docs/KCR-Video-Editing-Guide.md` is structured around the required enablement areas:

- setup
- editing workflow
- audio
- subtitles
- transitions
- branding
- export settings
- troubleshooting

The web application and guide establish the enablement foundation. Your KCR still calls for **two completed video projects**, so two real source-to-final video outputs should be produced and retained as evidence in addition to this codebase.
