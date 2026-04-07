---
name: hero-video-workflow
description: Build or revise branded webpage hero videos for AutoNateAI using the proven Remotion pipeline in the sibling `remotion-ai-engine` repo. Use when a page needs a cinematic hero MP4 that combines Playwright captures, screenshots, OpenAI expressive narration, background music, deterministic scene timing, and final asset replacement in this site.
---

# Hero Video Workflow

Use this skill when a page on this site needs a hero video instead of a static image.

This workflow is built around the sibling repo:

- `/home/nate/autonateai-workspace/remotion-ai-engine`

It should be used together with the local portal-capture skill when fresh portal media is needed:

- `.codex/skills/portal-demo-capture`

## Find The Real Embed First

Before touching the Remotion repo, find the actual site asset path and component that serves the hero video.

Current examples:

- homepage embed component:
  `/home/nate/autonateai-workspace/autonateai-tutoring/src/components/HeroPromoVideo.tsx`
- homepage asset:
  `/home/nate/autonateai-workspace/autonateai-tutoring/static/video/autonateai-portal-promo.mp4`
- programs asset:
  `/home/nate/autonateai-workspace/autonateai-tutoring/static/video/programs-hero-promo.mp4`

## Reuse The Proven Pattern

The reference implementation lives here:

- composition:
  `/home/nate/autonateai-workspace/remotion-ai-engine/src/remotion/AutoNateAI/PortalPromo.tsx`
- scene copy:
  `/home/nate/autonateai-workspace/remotion-ai-engine/src/remotion/AutoNateAI/portalPromoData.js`
- voice generation:
  `/home/nate/autonateai-workspace/remotion-ai-engine/scripts/generate-autonateai-portal-voiceover.mjs`
- capture script:
  `/home/nate/autonateai-workspace/remotion-ai-engine/scripts/capture-autonateai-portal.mjs`

When building a new hero video, mirror that structure:

1. create a new scene-data file
2. create a new Remotion composition
3. add metadata with hard scene durations
4. add an OpenAI TTS generator script
5. reuse the music bed unless there is a strong reason not to
6. render to `out/`
7. copy the final MP4 into this repo’s `static/video/`

## Media Rules

Use a mix of:

- desktop screencast clips for motion and interaction
- screenshots for filled Google Sheets, dashboards, and clean static proof

Do not rely on only stills if the page benefits from showing interaction.
Do not rely on only video if a filled sheet or analytic view reads more clearly as a still.

Preferred capture sources:

- site-ready demo clips already in:
  `/home/nate/autonateai-workspace/autonateai-tutoring/static/video/portal-demos`
- authenticated portal screenshots in:
  `/home/nate/autonateai-workspace/remotion-ai-engine/public/autonateai-portal-auth`

For new portal captures, run the portal demo capture workflow first.

## Copywriting Rules

Write hero narration for the audience actually buying:

- students for student pages
- directors, schools, and workforce-development leaders for program pages
- researchers for research pages

Keep the voice smooth, direct, intelligent, and confident.
Do not write generic startup promo language.
Lead with the operating change, then the tools, then the future-state payoff.

## Voiceover Workflow

1. create the narration strings in the scene data file
2. generate MP3s with an OpenAI speech script
3. measure the real durations with:

```bash
python3 /home/nate/autonateai-workspace/remotion-ai-engine/skills/remotion-promo-workflow/scripts/voiceover_frames.py \
  /home/nate/autonateai-workspace/remotion-ai-engine/public/voiceover/<VoiceoverFolder> \
  --fps 30 \
  --hold 24
```

4. update the scene duration array with the measured values
5. render only after the real durations are locked

## Render Workflow

From `/home/nate/autonateai-workspace/remotion-ai-engine`:

```bash
node scripts/generate-<promo>-voiceover.mjs
npx remotion render <CompositionId> out/<output>.mp4
ffprobe -v error -show_entries format=duration,size -show_entries stream=codec_type,width,height -of default=noprint_wrappers=1 out/<output>.mp4
cp out/<output>.mp4 /home/nate/autonateai-workspace/autonateai-tutoring/static/video/<site-asset>.mp4
ffprobe -v error -show_entries format=duration,size -show_entries stream=codec_type,width,height -of default=noprint_wrappers=1 /home/nate/autonateai-workspace/autonateai-tutoring/static/video/<site-asset>.mp4
```

## Current Programs Reference

Use this as the starting point for future org-facing revisions:

- composition:
  `/home/nate/autonateai-workspace/remotion-ai-engine/src/remotion/AutoNateAI/ProgramsPromo.tsx`
- scene data:
  `/home/nate/autonateai-workspace/remotion-ai-engine/src/remotion/AutoNateAI/programsPromoData.js`
- metadata:
  `/home/nate/autonateai-workspace/remotion-ai-engine/src/remotion/AutoNateAI/programsMetadata.ts`
- voice generation:
  `/home/nate/autonateai-workspace/remotion-ai-engine/scripts/generate-autonateai-programs-voiceover.mjs`
- shipped site asset:
  `/home/nate/autonateai-workspace/autonateai-tutoring/static/video/programs-hero-promo.mp4`

## Final Validation

Always do all of these before calling it done:

1. `ffprobe` the rendered MP4
2. `ffprobe` the copied site asset
3. run `npm run build` in this repo
4. spot-check the page on mobile and desktop
5. confirm the hero loops cleanly, the mute toggle works, and fullscreen still works
