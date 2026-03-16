---
name: tutoring-scheduler
description: Schedule and manage tutoring sessions on Google Calendar using a service account. Use when the user wants to create recurring tutoring blocks, check availability, or list upcoming sessions for AutoNateAI tutoring.
---

# Tutoring Scheduler

This skill manages Google Calendar events for the AutoNateAI tutoring business. It uses a dedicated Service Account to bypass OAuth blocks and ensure persistent access.

## Prerequisites

- **Service Account Email**: `firebase-adminsdk-fbsvc@autonateai-learning-hub.iam.gserviceaccount.com`
- **Key File**: Located at `remotion-ai-engine/service-account-key.json`
- **Target Calendar**: `Autonate.ai@gmail.com` (must be shared with the service account with "Make changes to events" permission)

## Workflows

### 1. Create Recurring Tutoring Blocks
Use the `scripts/manage_slots.ts` script to insert new recurring blocks.
Required parameters:
- `summary`: Catchy title (e.g., "🔥 Recursion Rescue")
- `description`: Details + Price (e.g., "1:1 Intensive. $50/hr")
- `start`: ISO string (e.g., "2026-03-15T18:00:00")
- `end`: ISO string (e.g., "2026-03-15T22:00:00")
- `recurrence`: RRULE string (e.g., "RRULE:FREQ=WEEKLY;BYDAY=SU")

### 2. List Upcoming Sessions
Run `scripts/list_events.ts` to show the next 10-20 events on the calendar to check for conflicts or confirm bookings.

### 3. Clear/Cancel Slots
Use `scripts/clear_slots.ts` if the user needs to wipe specific recurring series.

## Technical Details
- **TimeZone**: Always use `America/Detroit` for GVSU-related events.
- **Dependencies**: Requires `googleapis` and `tsx` installed in `remotion-ai-engine`.
