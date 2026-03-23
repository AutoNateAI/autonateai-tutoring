# AutoNate CRM System Guide

This workbook is a field-ops CRM plus insight engine.

The core idea:
- You engage in the community.
- Your coding agents help research, normalize, and enter data.
- The sheets stay linked by stable IDs.
- Metrics and summaries turn raw activity into insight.

## System Map

### Core CRM
- `Pipeline`: master org/entity list and opportunity tracking.
- `Interactions`: interaction history with pipeline orgs.
- `Today's Tasks`: dashboard view of urgent and high-value work.
- `Market Summary`: high-level CRM and context coverage summary.

### Org Context
- `Programs`: programs tied to pipeline orgs by `Linked Pipeline Org`.
- `Events`: events tied to pipeline orgs by `Linked Pipeline Org`.
- `Funding Intel`: funding and sponsorship intel tied to pipeline orgs by `Linked Pipeline Org`.

### Library / Community Ops
- `Library Nodes`: physical engagement locations. Primary key is `Library ID`.
- `Daily Log`: daily in-person activity log. Uses `Library ID` and auto-fills `Library Name`.
- `Outreach CRM`: lead-level contact CRM. Primary key is `Lead ID`. Can tie leads to `Library ID`.
- `Conversions`: completed or pending conversions. Uses both `Lead ID` and `Library ID`.
- `Rotation`: planning sheet for where to be and when. Uses `Library ID` and auto-fills `Primary Location`.
- `Scripts`: message scripts, openers, hooks, and objection handling.
- `Metrics`: activity and revenue rollups from `Daily Log` and `Conversions`.

## Key Relationships

These links matter. Do not break them.

- `Pipeline.Organization` is the anchor for org intelligence sheets.
- `Programs.Linked Pipeline Org` -> `Pipeline.Organization`
- `Events.Linked Pipeline Org` -> `Pipeline.Organization`
- `Funding Intel.Linked Pipeline Org` -> `Pipeline.Organization`

- `Library Nodes.Library ID` is the anchor for field ops sheets.
- `Daily Log.Library ID` -> `Library Nodes.Library ID`
- `Outreach CRM.Library ID` -> `Library Nodes.Library ID`
- `Conversions.Library ID` -> `Library Nodes.Library ID`
- `Rotation.Library ID` -> `Library Nodes.Library ID`

- `Outreach CRM.Lead ID` is the lead-level anchor.
- `Conversions.Lead ID` -> `Outreach CRM.Lead ID`

## Daily Workflow

### 1. Plan Your Day
- Open `Today's Tasks` for CRM follow-up priorities.
- Open `Rotation` to decide where you will work in person.
- Pick a `Library ID` in `Rotation`.
- Let `Primary Location` auto-fill.
- Review `Expected Interactions` and `Expected Convos`.
- Use `Scripts` to prepare your opener and objection handling.

### 2. Engage in the Community
- Work the selected library or node.
- Track what happened in `Daily Log`.
- Always use the `Library ID` dropdown instead of typing a location manually.
- Let `Library Name` fill itself from the ID.

Best practice for `Daily Log`:
- One row per shift or session.
- Fill `Date`, `Library ID`, `Start Time`, `End Time`, `Interactions`, `Convos`, `Strong Prospects`, `Sales`.
- Use `Notes` for what changed on the ground.
- Use `Lead IDs` if specific leads were generated during that shift.

### 3. Capture Leads
- Add each new real lead to `Outreach CRM`.
- The `Lead ID` is auto-generated from the `Name`.
- Pick the correct `Library ID`.
- Use `Status` consistently: `New`, `Contacted`, `Interested`, `Converted`, `No Reply`, `Lost`.
- Use `Interested Product` so `Value` can auto-calculate.

### 4. Record Sales or Conversions
- Add each conversion to `Conversions`.
- Use the `Lead ID` dropdown from `Outreach CRM`.
- Use the `Library ID` dropdown from `Library Nodes`.
- Set `Status` carefully: `Pending`, `Completed`, `Refunded`, `Failed`.
- Revenue metrics only count `Completed`.

### 5. Update Org Intelligence
- If you learn something about a school, nonprofit, university, or org:
- add or update it in `Pipeline`
- add program-level detail in `Programs`
- add recurring or one-off engagement opportunities in `Events`
- add grants, sponsorships, or funding signals in `Funding Intel`

## How To Use Coding Agents

Think of your coding agents as:
- research analysts
- data-entry operators
- cleanup specialists
- reporting assistants

### Good Agent Tasks
- `Research this org and add funding intel tied to the existing pipeline row.`
- `Take these 10 field notes and normalize them into Daily Log rows.`
- `Fill Outreach CRM from this text dump and preserve foreign keys.`
- `Research events for these 5 orgs and add them to Events.`
- `Review Metrics and tell me what changed in the last 7 and 30 days.`

### Rules For Agents
- Always use IDs and dropdown-backed columns where available.
- Never replace a key column with free text.
- Never overwrite headers.
- Never paste over formula columns without checking.
- Preserve the workbook structure and linked relationships.

### Best Prompt Pattern
- Name the target sheet.
- State the source material.
- State the foreign key to preserve.
- State whether this is append, update, or review work.

Example:

```text
Update `Outreach CRM` from these leads.
Use existing `Library ID` values from `Library Nodes`.
Do not overwrite headers or formulas.
Append only new leads.
If a product is mentioned, fill `Interested Product`.
```

## Page-By-Page Usage

### `Pipeline`
Use for org-level opportunity tracking.

Update when:
- you identify a new org
- stage changes
- deal size changes
- probability changes
- next action changes

### `Interactions`
Use for direct relationship history with orgs in `Pipeline`.

Update when:
- you email, text, call, meet, or follow up with org contacts
- an org-level conversation changes your next move

### `Programs`
Use when an org has multiple programs, cohorts, or operating units.

One row per program.

### `Events`
Use when an org has:
- annual events
- info sessions
- summer academies
- cycles worth showing up to or sponsoring

One row per event or recurring event stream.

### `Funding Intel`
Use when you identify:
- grant programs
- state or federal awards
- sponsorship opportunities
- donor programs
- investment or funding signals

One row per funding opportunity or funding signal.

### `Library Nodes`
Use as the master list of physical engagement nodes.

Do not type library names elsewhere if you can use `Library ID`.

### `Daily Log`
Use as the operational ledger of in-person activity.

This is the raw input for `Metrics`.

### `Outreach CRM`
Use for person-level lead management.

If a real person is involved, this is usually the right home.

### `Conversions`
Use for money movement and conversion outcomes.

This is the raw input for revenue and conversion-rate reporting.

### `Rotation`
Use to schedule where you work and compare expected vs actual outcomes.

Use `Library ID`, not free text, whenever possible.

### `Scripts`
Use as the message bank before active engagement.

Best maintained as:
- one row per situation
- one row per objection
- one row per close or follow-up pattern

### `Metrics`
Use to review:
- activity volume
- conversation volume
- strong prospect generation
- sales
- revenue
- conversion performance

## Review Loops

### End of Day
- fill `Daily Log`
- add new leads to `Outreach CRM`
- add new conversions to `Conversions`
- update `Interactions` if any org conversations happened
- review `Metrics`

### End of Week
- review `Metrics`
- compare `Rotation` expectations vs actual `Daily Log`
- refine `Library Nodes` priorities
- refine `Scripts` based on objections and wins
- move leads in `Outreach CRM` to accurate statuses

### End of Month
- review `Market Summary`
- review `Pipeline`
- add missing org context into `Programs`, `Events`, and `Funding Intel`
- identify which orgs, locations, and products are producing the best outcomes

## Common Failure Modes

### Broken keys
Cause:
- typing names instead of using IDs
- overwriting formula cells

Fix:
- restore the ID column formula
- use dropdown-backed fields
- repair lookup formulas before adding more data

### Metrics not moving
Cause:
- activity logged in the wrong sheet
- wrong date column
- conversion status not set to `Completed`

Fix:
- check `Daily Log` dates
- check `Conversions.Status`
- check `Library ID` and `Lead ID` are valid

### Duplicate records
Cause:
- agents appending without checking existing rows

Fix:
- ask agents to append only missing rows
- have them check by org name, library ID, or lead ID first

## Operating Principle

The workbook works best when:
- IDs are stable
- raw activity is entered quickly
- context is added continuously
- agents do research and cleanup
- you review insights on a rhythm

This is not just a spreadsheet.
It is a field-ops system, a CRM, and an intelligence layer.
