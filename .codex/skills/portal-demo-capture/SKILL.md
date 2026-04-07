---
name: portal-demo-capture
description: Capture polished AutoNateAI portal demos for landing pages, program pages, and product walkthroughs using Playwright on mobile or desktop viewports. Use when building or refreshing demo media that should show real portal interactions such as narrated slides, prompt entry, copy actions, and Google Sheet launch flows.
---

# Portal Demo Capture

Use this skill when a page needs real portal walkthrough media instead of generated mockups.

## What this skill does

- records the standard student portal demo flows with Playwright
- supports `mobile` and `desktop` capture modes, defaulting to `desktop`
- trims the first second off the exported clip to skip load-in
- grants clipboard permissions so copy demos show the real success path
- outputs H.264 MP4 files ready for the tutoring site

## Prereqs

- `ffmpeg` installed
- Playwright available in the current workspace
- Chromium installed for Playwright

If Playwright is missing in the workspace:

```bash
npm install -D playwright
npx playwright install chromium
```

## Standard capture command

```bash
node .codex/skills/portal-demo-capture/scripts/capture-portal-demo.mjs --device desktop --output-dir static/video/portal-demos
```

Mobile version:

```bash
node .codex/skills/portal-demo-capture/scripts/capture-portal-demo.mjs --device mobile --output-dir static/video/portal-demos
```

## Useful flags

- `--flows lecture,sheet-copy,daily-time-grid`
- `--base https://portal.autonateai.com`
- `--email demo-student-portal@autonateai.com`
- `--password '...'`
- `--trim-start 1`

## Expected outputs

The script emits files named like:

- `student-lecture-mobile.mp4`
- `student-sheet-copy-mobile.mp4`
- `daily-time-grid-mobile.mp4`
- `assignment-sprint-mobile.mp4`
- `reading-capture-mobile.mp4`
- `study-heatmap-mobile.mp4`
- `paper-source-mobile.mp4`
- `day-debrief-mobile.mp4`

Desktop mode uses the same names with `-desktop`.

## Workflow

1. Capture the flows you need with this script.
2. Review the clips on the target page and trim the list if the section feels crowded.
3. Prefer phone-framed recordings inside cards for student-facing pages.
4. Prefer wider desktop captures for director, program, or ops pages.
5. Rebuild and check responsive layout after swapping assets.
