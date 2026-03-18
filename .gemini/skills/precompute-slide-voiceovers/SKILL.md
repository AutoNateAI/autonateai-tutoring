---
name: precompute-slide-voiceovers
description: Precompute narrated workshop slide audio using OpenAI expressive voices for the AutoNateAI workshop portal. Use when generating or regenerating slide voiceovers and manifests.
---

# Precompute Slide Voiceovers

Use this skill for `/home/nate/autonateai-workspace/autonateai-workshop-portal`.

## Inputs
- slide data: `src/data/tracks.js`
- narration text helper: `src/lib/voiceoverText.js`
- config: `config/voiceover.config.json`

## Outputs
- audio: `public/audio/lectures/<track>/<slide>.mp3`
- manifest: `src/data/voiceovers.js`

## Voice target
- excited research professor
- warm, sharp, clear, energetic
- instructional on activity slides

## Run
```bash
cd /home/nate/autonateai-workspace/autonateai-workshop-portal
npm run voiceovers:generate
```

Optional:
```bash
node scripts/precompute-voiceovers.mjs --track student --force
```

## Rules
- keep one file per slide
- skip existing audio unless `--force`
- rebuild the manifest after generation
- use `marin` by default unless the config changes
