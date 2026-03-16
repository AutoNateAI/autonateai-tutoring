---
name: daily-scheduler
description: Architect and deploy a high-stakes 18-hour "Battle Rhythm" based on daily priorities, recovery needs, and lead generation targets. Use when the user needs to rework their schedule or log specific activities.
---

# Daily Scheduler

This skill transforms your high-level mission goals into a tactical timeline in your **Master Battle Rhythm** sheet.

## Mandates for the Scheduler
*   **Human-First Architecture:** Always account for recovery (meditation), nutrition, and physical regulation (YMCA/sauna).
*   **Lead Generation Priority:** Ensure daily blocks for "Hunt" (Finding students), "Build" (Thought Experiments), and "Surge" (Community engagement).
*   **Intelligence Integration:** Use the `gws-sheets` skill to write the daily schedule to the workbook `10B-LL-0E6BAauiQLfWVYRuIaKEqQpifcDw_mBvva9Tc`.
*   **Dynamic Reworking:** If priorities shift (e.g., a high-value meeting with Alvin), rework the remaining blocks to maintain the $2,500/wk momentum.

## The Standard 18-Hour Template
1. **The Forge (05:30-07:00):** Workout & Sauna.
2. **Human Recovery (07:00-08:00):** Shower & Breakfast.
3. **Deep Build (08:00-09:30):** Thought Experiment Architecture.
4. **Surge (09:30-11:30):** Distribution and Public Triage.
5. **Refuel (11:30-12:30):** Lunch.
6. **Strategic Outreach (12:30-13:30):** Partnerships/Investors.
7. **Mission Control (13:30-18:30):** Peak Tutoring.
8. **Reputation Compounding (20:00-22:30):** Engagement.
9. **Intelligence Log (22:30-23:30):** CRM and Prep.

## Phase 1: Intake (The Morning Brief)
When triggered, ask the user:
1.  "What are your top 3 mission priorities today?"
2.  "Are there any specific high-value calls or meetings (e.g., Alvin)?"
3.  "How is your mental/physical state (Need more meditation/sauna time)?"

## Phase 2: Deployment
1. Generate the updated tactical timeline.
2. Create a new sheet in the workbook named `Schedule - [Date]`.
3. Apply color-coding and proportional heights (30m = 21px).
