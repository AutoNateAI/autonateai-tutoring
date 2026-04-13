---
name: workshop-weekly-refresh
description: Update the AutoNateAI weekly workshop session across the tutoring site and workshop portal. Use when the workshop date rolls forward, the OG flyer image changes, the weekly Google Meet link changes, the workshop product key must reset for a new seat counter, or the new workshop session must still unlock the student portal track.
---

# Workshop Weekly Refresh

Use this skill when refreshing the weekly `Agentic AI Workshop` session.

## Scope

Touch both repos when needed:
- `autonateai-tutoring`
- `autonateai-workshop-portal`

## Inputs

Collect these values each week:
- new workshop date in long form and short form
- new workshop product key
- new Google Meet link
- new flyer image path supplied by the user

## Required updates

1. Update the workshop date copy on the public page.
Files:
- `src/pages/workshop.tsx`
- `src/data/products.ts`
- `src/components/SquareCheckoutCard.tsx`

2. Roll the workshop product key forward to the new session date.
Pattern:
- old: `agentic-ai-workshop-apr-XX-2026`
- new: `agentic-ai-workshop-apr-YY-2026`

Update every reference in:
- `src/pages/workshop.tsx`
- `src/data/products.ts`
- `src/components/SquareCheckoutCard.tsx`
- `firebase-functions/square/products.js`
- `firebase-functions/square/email.js`
- `firebase-functions/square/createSquareCoursePayment.js`
- `/home/nate/autonateai-workspace/autonateai-workshop-portal/src/lib/auth.js`
- `/home/nate/autonateai-workspace/autonateai-workshop-portal/src/main.js`

3. Reset the seat counter by using the new product key.
Do not try to mutate old purchase counts if the new weekly session is logically a new event. The new product ID gives a clean count because purchase counting is keyed by `productId`.

4. Keep portal access mapped to the student track.
The workshop product ID must be accepted anywhere the portal decides whether a paid user gets `student` access.

5. Update the workshop email copy.
File:
- `firebase-functions/square/email.js`

Make sure the weekly email includes:
- workshop title as `Agentic AI Workshop - AutoNateAI`
- correct weekly date and time
- current Google Meet link

6. Update the workshop social image.
- Copy the user-provided flyer image into `static/img/`
- Point `src/pages/workshop.tsx` social image metadata at the new file

## Verification

Run targeted searches for stale values:
- old workshop product key
- old date string
- old Meet link

Confirm the public workshop page references:
- new date
- new OG image path
- new product key in checkout bootstrap

Confirm the portal repo references:
- new workshop product key in auth allowlist
- new workshop product key in student-track mapping

## Deploy guidance

If the user wants it live:
- push `autonateai-workshop-portal`
- push `autonateai-tutoring`
- redeploy Firebase Functions if backend files changed
- rerun or wait for GitHub Pages deploys

## Notes

- Workshop email changes live in Firebase Functions, not just the frontend.
- A new weekly product key is the cleanest seat-counter reset because availability is counted by `productId`.
- The workshop should unlock the `student` portal, not `researcher`.
- After backend changes, redeploy Firebase Functions before treating the weekly refresh as complete.
