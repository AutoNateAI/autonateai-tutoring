---
name: daily-plan-logger
description: Append structured debrief notes to a specific daily schedule time block and maintain an end-of-day review table on the same sheet using the service account workflow.
---

# Daily Plan Logger

This skill updates the shared **Daily Plans** spreadsheet after work blocks are finished.

It has two jobs:
1. Append cleaned debrief notes into the notes column for a specific time block.
2. Build or update an end-of-day review table on the right side of the same sheet.

## Mandates
*   **Service Account Only:** Use `GOOGLE_APPLICATION_CREDENTIALS`, or fall back to `/home/nate/autonateai-workspace/remotion-ai-engine/service-account-key.json`.
*   **Correct Workbook:** Use `Daily Plans` workbook `100fwePKRm1qKu0ldTz9IudgvLKX2agrlz4axBnuav_o`.
*   **Correct Sheet:** Use `Schedule - [Month Day, Year]`.
*   **Append Only:** Never erase existing notes. Always append to the bottom of the existing notes cell.
*   **Clean First:** Convert the user's raw memory or voice-style debrief into concise numbered bullet points before writing.
*   **Skipped Means No Debrief:** If a time block has no debrief notes in an end-of-day review run, append `Skipped` to that block's notes cell unless it is already marked.

## Column Layout
*   Column `A`: Time Block
*   Column `B`: Phase
*   Column `C`: Objective
*   Column `D`: Strategic Rationale
*   Column `E`: Tactical Action / Notes / Debrief Log
*   Columns `G:H`: End-of-day review table

## Flow 1: Single Time Block Debrief
Use this when the user gives an unstructured memory about one completed block.

1. Rewrite the raw debrief into numbered bullets.
2. Save the bullets as JSON:

```json
{
  "bullets": [
    "Finished the mobile cleanup and tightened the navbar behavior on smaller screens.",
    "Found one analytics issue on the dashboard and documented the follow-up fix.",
    "Sent the review link and captured the next revision targets."
  ]
}
```

3. Run:

```bash
python3 .gemini/skills/daily-plan-logger/scripts/daily_plan_logger.py \
  log-block \
  --date "March 18, 2026" \
  --time-block "09:00 - 11:00" \
  --notes-file /tmp/block_debrief.json
```

## Flow 2: End-of-Day Review
Use this when the user wants a productivity and mindset review across the full day.

1. Clean the user's unstructured end-of-day reflection into concise bullets.
2. Map block-level debriefs by time block when provided.
3. Save review JSON:

```json
{
  "productivity": [
    "Protected the major build blocks and shipped the highest-leverage website updates first."
  ],
  "mindset": [
    "Energy held up better after the recovery windows than it would have in a continuous sprint."
  ],
  "wins": [
    "Got the client-facing work into a reviewable state."
  ],
  "friction": [
    "Context switching between family and deep work still needs a tighter restart ritual."
  ],
  "next_focus": [
    "Use Thursday to create and distribute more thought experiments."
  ],
  "block_notes": {
    "09:00 - 11:00": [
      "Finished the mobile and navigation pass.",
      "Verified the analytics issue list."
    ],
    "20:30 - 23:30": [
      "Outlined the payment-flow work and next implementation steps."
    ]
  }
}
```

4. Run:

```bash
python3 .gemini/skills/daily-plan-logger/scripts/daily_plan_logger.py \
  review-day \
  --date "March 18, 2026" \
  --review-file /tmp/end_of_day_review.json
```

## Output Rules
*   Block debrief bullets go into column `E` on the matching time block row.
*   If the block already has content, append below it.
*   End-of-day review table starts at `G1`.
*   Missing review sections become `Skipped`.
*   During `review-day`, any schedule block without provided debrief notes gets `Skipped` appended in column `E`.

## Verification
After each run, verify:
*   the intended time block row was updated
*   older notes were preserved
*   new bullets were appended, not overwritten
*   the end-of-day review table exists at the right side of the sheet
