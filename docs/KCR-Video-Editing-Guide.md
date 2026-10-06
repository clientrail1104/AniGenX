# Video Editing Enablement — Step-by-Step Guide

## Purpose

This guide establishes a repeatable in-house workflow for creating professional automotive video content using the Redline AI workspace and a standard editing pipeline. It supports the KCR requirement for practical video editing enablement and team documentation.

---

## 1. Setup

### Minimum working setup
- Modern workstation with at least 16 GB RAM
- Recommended 32 GB RAM for 4K workflows
- Fast SSD for source footage and cache
- Chrome, Edge or Safari for the web workspace
- Cloud mode enabled for heavy camera-original or production encoding work

### Project folder structure

```text
PROJECT_NAME/
  01_SOURCE/
  02_AUDIO/
  03_GRAPHICS/
  04_PROXY/
  05_PROJECT/
  06_EXPORT/
  07_ARCHIVE/
```

### Before editing
1. Copy camera cards into `01_SOURCE`
2. Never edit directly from an SD card
3. Keep original file names or apply a consistent naming standard
4. Back up the project before deleting camera media
5. Identify target platforms before editing:
   - TikTok / Instagram Reels: 9:16
   - YouTube: 16:9
   - Multi-platform: create one master timeline and separate delivery versions

---

## 2. Editing Workflow

### Step 1 — Ingest
Upload or register all source clips.

Review:
- resolution
- framerate
- codec/container
- orientation
- file size
- whether browser proxy generation is required

### Step 2 — Select
Identify:
- clean hero shots
- launch / acceleration moments
- drifting / smoke moments
- close-up details
- crowd reaction
- wheel / brake / exhaust details
- entry and exit shots

Reject:
- unusable focus
- accidental camera movement
- duplicated angles
- exposure failures that cannot be recovered

### Step 3 — Choose AI editing style
Use one preset as a starting point:

**Drift Night Smoke**
- cooler shadows
- stronger tail-light separation
- slower hero openings
- smoke texture emphasis

**Hyper-Speed Cuts**
- fast impact cuts
- aggressive speed ramps
- quick angle changes
- high-energy sound design

**Phonk Beat-Sync**
- cut points follow kick/snare/transient structure
- stronger low-end rhythm
- exhaust pops used as punctuation
- short visual holds before major drops

### Step 4 — Build rough cut
Create the story before visual effects.

Suggested structure:
1. Hook: 0–2 seconds
2. Context: 2–5 seconds
3. Build: 5–10 seconds
4. Peak sequence: 10–20 seconds
5. Hero close: final 2–4 seconds

### Step 5 — Fine cut
Trim every shot to its strongest movement.

Check:
- no dead frames
- no accidental black frames
- motion direction feels intentional
- cut rhythm matches the soundtrack
- visual continuity is understandable

---

## 3. Audio Workflow

### Music
Use properly licensed music.

Before cutting:
1. identify BPM
2. identify intro, build, drop and break sections
3. place markers on strong transients
4. cut picture to musical phrases, not every beat

### Automotive sound design
Useful layers:
- engine start
- idle
- rev rise
- turbo spool
- blow-off
- gear shift
- tire scrub
- drift squeal
- exhaust pop
- launch impact
- crowd / atmosphere

### Mixing target
Keep music dominant enough for energy while retaining vehicle identity.

Practical starting point:
- dialogue if any: front and clear
- engine layer: strong but controlled
- music: below critical dialogue
- effects: short peaks, no constant overload
- final limiter: prevent clipping

Avoid:
- distorted low end
- stacking too many exhaust effects
- fake effects that do not match visible action

---

## 4. Subtitles and On-Screen Text

For short-form automotive content:
- keep text short
- use large type
- preserve safe margins
- avoid covering the car
- use 1–2 brand fonts
- animate only when movement supports the cut

Recommended subtitle hierarchy:
- title / hook
- vehicle or event name
- optional specification
- CTA / brand close

For 9:16:
- keep critical text away from top/bottom platform UI zones

---

## 5. Transitions

Use transitions to support motion.

Preferred:
- straight cut
- match cut
- whip transition
- speed ramp
- light flash
- motion blur bridge
- sound-led cut

Use sparingly:
- glitch
- zoom tunnel
- excessive spin
- unrelated preset transitions

Rule:
If the transition draws more attention than the car, simplify it.

---

## 6. Branding

Create a simple brand kit:
- logo
- primary typeface
- secondary typeface
- electric blue accent
- optional toxic green / nitro orange highlight
- standard end card
- approved CTA

Brand consistency checklist:
- same logo treatment
- same text margins
- same LUT family
- same intro/outro logic
- same sound tag if used

---

## 7. Color Workflow

Suggested order:
1. exposure
2. white balance
3. contrast
4. highlight recovery
5. shadow control
6. saturation
7. selective color
8. creative LUT
9. final legal/output check

Automotive checks:
- paint color remains believable
- brake lights are not clipped
- black paint still has detail
- smoke retains texture
- neon lighting does not destroy skin tone when people appear

---

## 8. Export Settings

### Instagram Reels / TikTok
- Canvas: 1080 × 1920
- Aspect: 9:16
- Codec: H.264
- FPS: match source or delivery requirement
- Audio: AAC
- Use a high-quality bitrate appropriate to platform limits

### YouTube 1080p
- Canvas: 1920 × 1080
- Aspect: 16:9
- Codec: H.264 or H.265 where supported
- FPS: match source / creative intent

### YouTube 4K
- Canvas: 3840 × 2160
- Codec: H.264 or H.265
- Use cloud rendering for reliability

### Editor master
- Container: MOV
- Codec: ProRes 422 / 422 HQ depending workflow
- Keep as archive or handoff master

### Web preview
- Container: WebM
- Codec: VP9
- Suitable for browser review and lightweight preview delivery

---

## 9. Quality Control

Before delivery watch the full render once without stopping.

Check:
- correct aspect ratio
- no missing media
- no black frames
- audio sync
- no clipped music
- readable titles
- no spelling errors
- no watermark or temp graphic
- correct logo
- correct final frame
- correct export filename

Filename example:

```text
CLIENT_EVENT_PLATFORM_VERSION_YYYYMMDD.ext
```

Example:

```text
REDLINE_DRIFTNIGHT_REELS_V03_20261005.mp4
```

---

## 10. Troubleshooting

### File uploads but does not preview
Cause:
Browser does not support the source container or codec.

Action:
- generate a proxy
- use cloud mode
- keep the source as the master

### Browser render fails
Cause:
File is too large, memory pressure, unsupported encoder or browser security limitations.

Action:
- reduce source duration
- render WebM/VP9 only in browser mode
- use cloud mode for production encoding

### H.264/H.265 or ProRes required
Action:
Use cloud mode.

### RAW camera media is slow
Action:
- upload original to cloud storage
- generate 1080p proxies
- edit against proxies
- relink to original for final render

### Audio is out of sync
Check:
- variable frame rate phone footage
- incorrect timeline FPS
- resampling
- source corruption

Convert variable-frame-rate media to constant frame rate before final edit when necessary.

### Colors look different after export
Check:
- source gamma
- display profile
- HDR/SDR mismatch
- color metadata
- platform recompression

Use a consistent SDR Rec.709 delivery workflow unless HDR is explicitly required.

---

## 11. KCR Evidence Checklist

To close the KCR, retain:

- [ ] Redline AI editing enablement source code / deployed prototype
- [ ] This comprehensive step-by-step guide
- [ ] Completed Video Project 1
- [ ] Completed Video Project 2
- [ ] Source files for both projects
- [ ] Final exports
- [ ] Screenshots or screen recording of editing workflow
- [ ] Export settings used
- [ ] Issues encountered and troubleshooting notes
- [ ] Internal knowledge-sharing / training evidence

The two completed video projects should be real end-to-end outputs, not only project templates.
