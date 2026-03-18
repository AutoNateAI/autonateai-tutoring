#!/usr/bin/env python3
import argparse
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path


DEFAULT_SPREADSHEET_ID = "100fwePKRm1qKu0ldTz9IudgvLKX2agrlz4axBnuav_o"
DEFAULT_CREDENTIALS = "/home/nate/autonateai-workspace/remotion-ai-engine/service-account-key.json"
SHEET_PREFIX = "Schedule - "
REVIEW_TABLE_RANGE = "G1:H7"


def run_cli(args, params=None, body=None, env=None):
    cmd = ["npx", "@googleworkspace/cli", *args]
    if params is not None:
        cmd.extend(["--params", json.dumps(params)])
    if body is not None:
        cmd.extend(["--json", json.dumps(body)])
    cmd.extend(["--format", "json"])
    proc = subprocess.run(cmd, capture_output=True, text=True, env=env)
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr or proc.stdout)
        raise SystemExit(proc.returncode)
    output = proc.stdout
    start = output.find("{")
    if start == -1:
        return {}
    return json.loads(output[start:])


def normalize_date(date_str):
    for fmt in ("%B %d, %Y", "%Y-%m-%d", "%m/%d/%Y"):
        try:
            parsed = datetime.strptime(date_str, fmt)
            return parsed.strftime("%B %d, %Y")
        except ValueError:
            continue
    raise ValueError(f"Unsupported date format: {date_str}")


def append_text(existing, new_text):
    existing = (existing or "").strip()
    new_text = (new_text or "").strip()
    if not new_text:
        return existing
    if not existing:
        return new_text
    return f"{existing}\n\n{new_text}"


def format_numbered_bullets(bullets):
    items = [str(item).strip() for item in bullets if str(item).strip()]
    return "\n".join(f"{idx}. {item}" for idx, item in enumerate(items, start=1))


def append_skipped(existing):
    existing = (existing or "").strip()
    if not existing:
        return "Skipped"
    if "skipped" in existing.lower():
        return existing
    return f"{existing}\n\nSkipped"


def load_json(path):
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def get_sheet_values(env, spreadsheet_id, sheet_title):
    return run_cli(
        ["sheets", "spreadsheets", "values", "get"],
        params={"spreadsheetId": spreadsheet_id, "range": f"'{sheet_title}'!A1:H100"},
        env=env,
    ).get("values", [])


def get_review_values(env, spreadsheet_id, sheet_title):
    return run_cli(
        ["sheets", "spreadsheets", "values", "get"],
        params={"spreadsheetId": spreadsheet_id, "range": f"'{sheet_title}'!{REVIEW_TABLE_RANGE}"},
        env=env,
    ).get("values", [])


def find_time_block_row(values, time_block):
    for idx, row in enumerate(values[1:], start=2):
        if row and row[0].strip() == time_block:
            return idx
    raise ValueError(f"Time block not found: {time_block}")


def get_cell(values, row_idx, col_idx):
    row_zero = row_idx - 1
    col_zero = col_idx - 1
    if row_zero >= len(values):
        return ""
    row = values[row_zero]
    if col_zero >= len(row):
        return ""
    return row[col_zero]


def update_single_cell(env, spreadsheet_id, sheet_title, cell_ref, value):
    run_cli(
        ["sheets", "spreadsheets", "values", "update"],
        params={
            "spreadsheetId": spreadsheet_id,
            "range": f"'{sheet_title}'!{cell_ref}",
            "valueInputOption": "USER_ENTERED",
        },
        body={"values": [[value]]},
        env=env,
    )


def update_range(env, spreadsheet_id, sheet_title, range_ref, values):
    run_cli(
        ["sheets", "spreadsheets", "values", "update"],
        params={
            "spreadsheetId": spreadsheet_id,
            "range": f"'{sheet_title}'!{range_ref}",
            "valueInputOption": "USER_ENTERED",
        },
        body={"values": values},
        env=env,
    )


def apply_review_table_format(env, spreadsheet_id, sheet_id):
    requests = [
        {
            "repeatCell": {
                "range": {
                    "sheetId": sheet_id,
                    "startRowIndex": 0,
                    "endRowIndex": 1,
                    "startColumnIndex": 6,
                    "endColumnIndex": 8,
                },
                "cell": {
                    "userEnteredFormat": {
                        "backgroundColor": {"red": 0.047058824, "green": 0.078431375, "blue": 0.14901961},
                        "backgroundColorStyle": {
                            "rgbColor": {"red": 0.047058824, "green": 0.078431375, "blue": 0.14901961}
                        },
                        "horizontalAlignment": "CENTER",
                        "verticalAlignment": "MIDDLE",
                        "wrapStrategy": "WRAP",
                        "textFormat": {
                            "bold": True,
                            "foregroundColor": {"red": 1, "green": 1, "blue": 1},
                            "foregroundColorStyle": {"rgbColor": {"red": 1, "green": 1, "blue": 1}},
                        },
                    }
                },
                "fields": "userEnteredFormat",
            }
        },
        {
            "repeatCell": {
                "range": {
                    "sheetId": sheet_id,
                    "startRowIndex": 1,
                    "endRowIndex": 2,
                    "startColumnIndex": 6,
                    "endColumnIndex": 8,
                },
                "cell": {
                    "userEnteredFormat": {
                        "backgroundColor": {"red": 0.6509804, "green": 0.3019608, "blue": 0.4745098},
                        "backgroundColorStyle": {
                            "rgbColor": {"red": 0.6509804, "green": 0.3019608, "blue": 0.4745098}
                        },
                        "horizontalAlignment": "CENTER",
                        "verticalAlignment": "MIDDLE",
                        "wrapStrategy": "WRAP",
                    }
                },
                "fields": "userEnteredFormat(backgroundColor,backgroundColorStyle,horizontalAlignment,verticalAlignment,wrapStrategy)",
            }
        },
        {
            "repeatCell": {
                "range": {
                    "sheetId": sheet_id,
                    "startRowIndex": 2,
                    "endRowIndex": 7,
                    "startColumnIndex": 6,
                    "endColumnIndex": 8,
                },
                "cell": {
                    "userEnteredFormat": {
                        "backgroundColor": {"red": 1, "green": 1, "blue": 1},
                        "backgroundColorStyle": {"rgbColor": {"red": 1, "green": 1, "blue": 1}},
                        "horizontalAlignment": "LEFT",
                        "verticalAlignment": "MIDDLE",
                        "wrapStrategy": "WRAP",
                    }
                },
                "fields": "userEnteredFormat(backgroundColor,backgroundColorStyle,horizontalAlignment,verticalAlignment,wrapStrategy)",
            }
        },
        {
            "updateDimensionProperties": {
                "range": {"sheetId": sheet_id, "dimension": "COLUMNS", "startIndex": 6, "endIndex": 7},
                "properties": {"pixelSize": 170},
                "fields": "pixelSize",
            }
        },
        {
            "updateDimensionProperties": {
                "range": {"sheetId": sheet_id, "dimension": "COLUMNS", "startIndex": 7, "endIndex": 8},
                "properties": {"pixelSize": 420},
                "fields": "pixelSize",
            }
        },
    ]
    run_cli(
        ["sheets", "spreadsheets", "batchUpdate"],
        params={"spreadsheetId": spreadsheet_id},
        body={"requests": requests},
        env=env,
    )


def get_sheet_id(env, spreadsheet_id, sheet_title):
    metadata = run_cli(
        ["sheets", "spreadsheets", "get"],
        params={"spreadsheetId": spreadsheet_id},
        env=env,
    )
    for sheet in metadata.get("sheets", []):
        if sheet["properties"]["title"] == sheet_title:
            return sheet["properties"]["sheetId"]
    raise ValueError(f"Sheet not found: {sheet_title}")


def command_log_block(args, env, sheet_title):
    payload = load_json(args.notes_file)
    bullets = payload.get("bullets", [])
    if not isinstance(bullets, list) or not bullets:
        raise ValueError("notes-file must contain a non-empty 'bullets' array.")

    values = get_sheet_values(env, args.spreadsheet_id, sheet_title)
    row_idx = find_time_block_row(values, args.time_block)
    current_notes = get_cell(values, row_idx, 5)
    updated_notes = append_text(current_notes, format_numbered_bullets(bullets))
    update_single_cell(env, args.spreadsheet_id, sheet_title, f"E{row_idx}", updated_notes)
    print(json.dumps({"sheet_title": sheet_title, "time_block": args.time_block, "updated_row": row_idx}, indent=2))


def build_review_table(existing_review, date_label, payload):
    current_notes = {}
    for row in existing_review[2:]:
        if row and len(row) >= 2:
            current_notes[row[0]] = row[1]

    def section_value(label, key):
        existing = current_notes.get(label, "")
        bullets = payload.get(key, [])
        if isinstance(bullets, list) and bullets:
            return append_text(existing, format_numbered_bullets(bullets))
        return append_skipped(existing)

    return [
        ["End of Day Review", date_label],
        ["Category", "Review Notes"],
        ["Productivity", section_value("Productivity", "productivity")],
        ["Mindset", section_value("Mindset", "mindset")],
        ["Wins", section_value("Wins", "wins")],
        ["Friction", section_value("Friction", "friction")],
        ["Next Focus", section_value("Next Focus", "next_focus")],
    ]


def command_review_day(args, env, sheet_title):
    payload = load_json(args.review_file)
    block_notes = payload.get("block_notes", {})
    if block_notes is None:
        block_notes = {}
    if not isinstance(block_notes, dict):
        raise ValueError("'block_notes' must be an object keyed by time block.")

    values = get_sheet_values(env, args.spreadsheet_id, sheet_title)

    updated_blocks = []
    for row_idx, row in enumerate(values[1:], start=2):
        if not row or not row[0].strip():
            continue
        time_block = row[0].strip()
        current_notes = get_cell(values, row_idx, 5)
        bullets = block_notes.get(time_block, [])
        if isinstance(bullets, list) and bullets:
            new_text = format_numbered_bullets(bullets)
            updated = append_text(current_notes, new_text)
        else:
            updated = append_skipped(current_notes)
        update_single_cell(env, args.spreadsheet_id, sheet_title, f"E{row_idx}", updated)
        updated_blocks.append(time_block)

    existing_review = get_review_values(env, args.spreadsheet_id, sheet_title)
    table_values = build_review_table(existing_review, normalize_date(args.date), payload)
    update_range(env, args.spreadsheet_id, sheet_title, REVIEW_TABLE_RANGE, table_values)
    apply_review_table_format(env, args.spreadsheet_id, get_sheet_id(env, args.spreadsheet_id, sheet_title))

    print(
        json.dumps(
            {
                "sheet_title": sheet_title,
                "updated_blocks": updated_blocks,
                "review_table_range": REVIEW_TABLE_RANGE,
            },
            indent=2,
        )
    )


def main():
    parser = argparse.ArgumentParser(description="Append block debriefs and end-of-day reviews into Daily Plans.")
    parser.add_argument("--spreadsheet-id", default=DEFAULT_SPREADSHEET_ID)
    parser.add_argument("--credentials", default=os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", DEFAULT_CREDENTIALS))
    subparsers = parser.add_subparsers(dest="command", required=True)

    log_block = subparsers.add_parser("log-block")
    log_block.add_argument("--date", required=True)
    log_block.add_argument("--time-block", required=True)
    log_block.add_argument("--notes-file", required=True)

    review_day = subparsers.add_parser("review-day")
    review_day.add_argument("--date", required=True)
    review_day.add_argument("--review-file", required=True)

    args = parser.parse_args()

    if not Path(args.credentials).exists():
        raise SystemExit(f"Credentials file not found: {args.credentials}")

    env = os.environ.copy()
    env["GOOGLE_APPLICATION_CREDENTIALS"] = args.credentials
    sheet_title = f"{SHEET_PREFIX}{normalize_date(args.date)}"

    if args.command == "log-block":
        command_log_block(args, env, sheet_title)
        return
    if args.command == "review-day":
        command_review_day(args, env, sheet_title)
        return
    raise SystemExit(f"Unsupported command: {args.command}")


if __name__ == "__main__":
    main()
