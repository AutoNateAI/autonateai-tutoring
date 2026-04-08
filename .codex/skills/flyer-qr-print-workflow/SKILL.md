---
name: flyer-qr-print-workflow
description: Place a live QR code into a flyer artwork, export a single scannable flyer image, build a 4-up landscape print sheet, and publish the result into Google Docs or Slides for printing. Use when updating workshop flyers, event flyers, or any square social flyer that needs a printable QR and paper-saving layout.
---

# Flyer QR Print Workflow

Use this skill when a user has a flyer image and wants:

- a QR code placed into a designated placeholder or scan box
- a new single-flyer asset saved in the repo
- a 4-up print sheet for landscape letter paper
- a Google Doc or Google Slides print version

## Workflow

1. Inspect the uploaded flyer image with `view_image`.
2. Find or estimate the QR placement bounds.
   - For simple placeholder boxes, use a manual visual placement.
   - Prefer covering placeholder text like `SCAN QR` if needed for better scannability.
3. Run `scripts/build_flyer_qr_sheet.py` to create:
   - a single flyer with QR
   - a 4-up landscape print sheet
4. Commit and push the generated assets so Google Docs/Slides can fetch them from a stable raw GitHub URL.
5. Create or update a Google Doc or Slides file using the pushed asset URL.
   - Use Docs when the user wants a simple printable document.
   - Use Slides when the user wants tighter layout control.

## Script

Run:

```bash
.venv-tools/bin/python .codex/skills/flyer-qr-print-workflow/scripts/build_flyer_qr_sheet.py \
  --input .ccgram-uploads/source.jpg \
  --single-output static/img/flyer-with-qr.png \
  --sheet-output static/img/flyer-4up.png \
  --url https://autonateai.com/workshop \
  --qr-x 955 --qr-y 947 --qr-size 238 --qr-pad 6
```

Optional layout flags:

- `--sheet-width 3300 --sheet-height 2550`
- `--margin-x 390 --margin-y 15`
- `--col-gap 40 --row-gap 20`
- `--flyer-size 1240`

## Notes

- Keep the QR large enough to survive message compression and cheap print jobs.
- For Google Docs, use landscape letter proportions and insert the 4-up image near full-page width.
- Use a new filename when the user reports stale Drive or chat previews.
