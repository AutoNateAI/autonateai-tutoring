# Square Native Async Course Checkout Plan

Last updated: 2026-03-20

## Goal

Convert the current `autonateai-tutoring` marketing site from live cohort booking into a premium async course purchase flow with native Square checkout on-site.

Products:

- `ai-first-student`
- `ai-first-researcher`

Portal destination after purchase:

- student: `https://workshop.autonateai.com/#/tracks/student`
- researcher: `https://workshop.autonateai.com/#/tracks/researcher`

Free practice surface remains on the marketing site:

- daily thought experiments

Paid surface:

- narrated slide deck
- 6 prompt packs per track
- 3 prompts per pack
- linked Google Sheets per pack
- gated workshop portal access

## Current Site Review

The actual pages that need to change are:

- [src/pages/index.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/index.tsx)
- [src/pages/booking.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/booking.tsx)
- [src/pages/services/workshop.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/services/workshop.tsx)
- [src/pages/services/researchers.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/services/researchers.tsx)

Current state:

- homepage still frames the offer as daily thought experiments plus live cohorts
- booking page still offers:
  - `Student Workflow Cohort`
  - `Research Cohort`
  - `DevBox Setup`
- student and researcher detail pages still route users to Google Calendar booking links

So the work is not just “add payments.”
It is:

1. reframe the offer from live cohort to async premium course
2. embed native payment collection
3. grant access after payment
4. route paid users into the portal

## Product Reframe

### New offer names

Recommended:

- `AI-First Student`
- `AI-First Researcher`

These should replace cohort framing on the marketing and booking pages.

### Offer structure

Each premium course includes:

- async narrated mini-lecture deck
- 6 sheet-based workflow kits
- 3 prompts per workflow kit
- linked Google Sheet per workflow
- access to the dedicated portal
- ongoing free thought experiments on the main site for continued practice

### What stays free

- thought experiments library
- public explanation of the framework
- select practice content and marketing pages

## Preferred Payment Architecture

Because you want payment to happen on your site natively, the preferred path is:

- Square Web Payments SDK on the frontend
- backend payment function
- Square webhook verification
- Firebase/Firestore access grant

We should **not** use hosted Square payment links as the main implementation if the goal is native checkout UX.

## Recommended Architecture

### Frontend

This repo is Docusaurus/React, so the clean approach is:

- keep the marketing pages here
- build a React checkout component on the booking page
- use service/detail pages as product detail pages or collapse them into the booking experience

Suggested new frontend pieces:

- `src/components/SquareCheckoutCard.tsx`
- `src/components/ProductSelector.tsx`
- `src/components/AccessExplainer.tsx`
- optional:
  - `src/pages/checkout.tsx`

### Backend

This repo does not currently contain Firebase Functions code.
That means one of these must happen:

1. add a backend/functions workspace to this repo, or
2. point this frontend to an existing Firebase Functions backend in another repo/project

Recommended for speed:

- reuse your existing Firebase project: `autonateai-learning-hub`
- expose HTTPS functions for Square payment + webhook fulfillment

Required backend endpoints:

- `createSquarePayment`
- `onSquareWebhook`
- optional:
  - `claimPendingSquarePurchase`

### Data model

Recommended Firestore collections:

- `products/{productId}`
- `purchases/{purchaseId}`
- `users/{uid}/library/{productId}`
- `pendingPurchases/{paymentId}`

Recommended internal product IDs:

- `ai-first-student`
- `ai-first-researcher`

## Routing Plan

### Marketing site routes

Current relevant routes:

- `/`
- `/booking`
- `/services/workshop`
- `/services/researchers`

Recommended final route behavior:

- `/`
  - frames free thought experiments + premium async courses
- `/booking`
  - main checkout page with both premium products
- `/services/workshop`
  - either becomes `AI-First Student` detail page or redirects to `/booking?product=ai-first-student`
- `/services/researchers`
  - either becomes `AI-First Researcher` detail page or redirects to `/booking?product=ai-first-researcher`

### Portal routes

After purchase:

- student purchasers route to `workshop.autonateai.com/#/tracks/student`
- researcher purchasers route to `workshop.autonateai.com/#/tracks/researcher`

## UX Plan

### Homepage

Update [src/pages/index.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/index.tsx):

- replace live cohort language with async-course language
- keep thought experiments as free practice
- add stronger “premium async course” framing
- CTA path:
  - free: thought experiments
  - paid: booking / checkout page

### Booking page

Update [src/pages/booking.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/booking.tsx):

- remove live schedule-first framing
- remove Google booking CTA for student and researcher offers
- convert page into:
  - product selector
  - course comparison
  - native card checkout panel
  - secure payment explanation
  - instant access explanation

Keep `DevBox Setup` separate if you still want it as a consulting offer.

### Student detail page

Update [src/pages/services/workshop.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/services/workshop.tsx):

- rename from `Student Workflow Cohort` to `AI-First Student`
- describe the async course structure
- explain:
  - narrated lectures
  - prompt packs
  - linked sheets
  - thought experiments as practice layer
- route purchase CTA to booking page preselected for student product

### Researcher detail page

Update [src/pages/services/researchers.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/services/researchers.tsx):

- rename from `Research Cohort` to `AI-First Researcher`
- mirror the same async-course framing
- route purchase CTA to booking page preselected for researcher product

## Auth And Access Flow

### Signed-in buyer

1. user selects product
2. user pays with native Square checkout
3. backend records purchase with `uid`
4. webhook confirms payment
5. backend writes:
   - `purchases/{purchaseId}`
   - `users/{uid}/library/{productId}`
6. frontend routes to the correct portal

### Guest buyer

1. user enters email in checkout form
2. user pays
3. backend records purchase with email and no `uid`
4. webhook writes:
   - `purchases/{purchaseId}`
   - `pendingPurchases/{paymentId}`
5. user is prompted to sign in or create account
6. pending purchase is claimed and converted into `users/{uid}/library/{productId}`
7. route to portal

## What Needs To Be Built

### In this repo

- checkout UI on booking page
- product selection state
- updated marketing copy
- route params for preselecting a product
- post-purchase handoff to portal

### In backend

- Square payment creation endpoint
- Square webhook verification
- purchase/access fulfillment
- pending purchase claiming by email

## What Nate Needs To Do

These are the things you need to provide so I can build the full payment flow cleanly.

### 1. Square production app credentials

From Square Developer Console:

- `Application ID`
- `Location ID`
- `Access Token`

### 2. Square webhook setup

Create a webhook subscription and provide:

- webhook endpoint target URL
- webhook signature key

Recommended webhook coverage:

- payment completion/updated events
- refund events

### 3. Final product details

Send final values for:

- student course name
- student price
- researcher course name
- researcher price
- refund policy copy
- support email

### 4. Confirm backend location

I need to know where you want the Square payment backend to live:

- in this repo
- or in another existing Firebase/backend repo

If you already have a preferred Firebase Functions repo, tell me which one.

### 5. Confirm auth domains

In Firebase Auth, make sure these are authorized:

- `autonateai.com`
- `www.autonateai.com` if used
- `workshop.autonateai.com`

## What I Will Build After That

Once you provide the Square and backend details, I can take the rest:

- native checkout experience on `/booking`
- student and researcher product selection
- async-course copy rewrite on the current pages
- Square payment submission
- webhook fulfillment logic
- access grant in Firebase
- redirect into the correct portal track

## Implementation Notes

### Why not use the current Google booking links

Current links in:

- [src/pages/services/workshop.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/services/workshop.tsx)
- [src/pages/services/researchers.tsx](/home/nate/autonateai-workspace/autonateai-tutoring/src/pages/services/researchers.tsx)

These are for scheduling live sessions.
They do not fit the async digital course model.

### Why keep thought experiments on this site

That is the best public top-of-funnel and practice layer.

The right product ladder is:

- free thought experiments
- paid async course
- portal access
- optional higher-touch services later

### Suggested CTA structure

- homepage:
  - `Explore Thought Experiments`
  - `Get The Student Course`
  - `Get The Researcher Course`
- booking page:
  - native checkout
- service detail pages:
  - rich detail + direct purchase path

## Next Step

Once you send the Square credentials, webhook key, final prices, and tell me where the backend functions should live, I can implement the native checkout flow against the real `autonateai-tutoring` site.
