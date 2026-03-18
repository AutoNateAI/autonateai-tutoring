---
name: daily-scheduler
description: Build and deploy a color-coded daily schedule into the shared Daily Plans spreadsheet using the service account workflow. Use when the user needs a new daily plan, a reworked schedule, or updates to an existing day tab.
---

# Daily Scheduler

This skill transforms a user's high-level goals into a tactical daily schedule inside the shared **Daily Plans** spreadsheet.

## Mandates for the Scheduler
*   **Human-First Architecture:** Always account for recovery (meditation), nutrition, and physical regulation (YMCA/sauna).
*   **Operational Priority:** Preserve blocks for build work, outreach/marketing, family responsibilities, and relaxation/recovery.
*   **Service Account Only:** Do not rely on user OAuth scopes. Use the service account credentials path from `GOOGLE_APPLICATION_CREDENTIALS`, or fall back to `/home/nate/autonateai-workspace/remotion-ai-engine/service-account-key.json`.
*   **Correct Destination:** Write schedules into the `Daily Plans` workbook `100fwePKRm1qKu0ldTz9IudgvLKX2agrlz4axBnuav_o`.
*   **Template Preservation:** Duplicate the latest `Schedule - ...` tab to preserve formatting, column widths, and general structure. If no dated schedule exists, fall back to `Ideal Day`.
*   **Explicit Styling:** Always apply category-based row colors directly. Do not assume formatting will inherit correctly for newly added rows.
*   **Dynamic Reworking:** If priorities shift mid-day, rework the remaining blocks while preserving family and recovery commitments.

## Category Rules
Each schedule row must include one category:

1. **`build`**: Deep work, product work, website work, thought experiments, workshop creation, payment infrastructure.
2. **`outreach`**: Email, Reddit, LinkedIn, foundations, university targeting, lead generation, distribution.
3. **`family`**: Daughter pickup/dropoff, lunch or dinner with family, bedtime, home transitions.
4. **`relaxation`**: YMCA, sauna, shower, breakfast, decompression, reset, debrief.

Use the existing palette already present in the workbook:

*   **Build:** deep purple
*   **Outreach:** lavender
*   **Family:** soft green
*   **Relaxation:** warm amber

## Intake
If the user already provided a detailed freeform day description, do not ask the full morning brief again. Extract the schedule directly and only ask follow-ups if a hard constraint is missing.

When follow-up is needed, ask only for the missing pieces:
1.  Start and end anchors that are fixed.
2.  Any must-happen meetings, pickups, meals, or recovery windows.
3.  The top priorities that must get protected.

## Deployment Workflow
1. Translate the user's request into rows with:
   * `time_block`
   * `phase`
   * `objective`
   * `rationale`
   * `action_log`
   * `category`
2. Name the tab `Schedule - [Month Day, Year]`, for example `Schedule - March 18, 2026`.
3. Run the helper script:

```bash
python3 .gemini/skills/daily-scheduler/scripts/create_daily_schedule.py \
  --date "March 18, 2026" \
  --schedule-file /tmp/daily_schedule.json
```

4. Verify the sheet after writing:
   * rows exist in the expected tab
   * the last populated row is styled like the others
   * category colors are present
   * row heights roughly match block duration at `30m = 21px`

## Schedule JSON Shape
The helper script expects a JSON array of row objects like this:

```json
[
  {
    "time_block": "09:00 - 11:00",
    "phase": "Deep Build I",
    "objective": "Client Website Mobile + QA Cleanup",
    "rationale": "Make the web app review-ready before the Friday in-person meeting.",
    "action_log": "Improve mobile layout, verify nav links, validate analytics, send review link.",
    "category": "build"
  }
]
```

## Notes
*   In this workspace, "daily notes spreadsheet" refers to the `Daily Plans` workbook.
*   The helper script duplicates the latest dated schedule tab first so the page remains shareable with family in a consistent layout.
*   If a same-day tab already exists, the helper updates that tab instead of creating a duplicate.
