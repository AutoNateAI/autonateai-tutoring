#!/usr/bin/env python3
import argparse
import json
import math
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path


DEFAULT_SPREADSHEET_ID = "100fwePKRm1qKu0ldTz9IudgvLKX2agrlz4axBnuav_o"
DEFAULT_CREDENTIALS = "/home/nate/autonateai-workspace/remotion-ai-engine/service-account-key.json"
DEFAULT_SHEET_PREFIX = "Schedule - "
DEFAULT_CLEAR_ROWS = 40

HEADER = [
    "Time Block",
    "Phase",
    "Objective",
    "Strategic Rationale (Path to $2500/wk)",
    "Tactical Action / Log",
]

HEADER_FORMAT = {
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

ROW_BASE_FORMAT = {
    "horizontalAlignment": "CENTER",
    "verticalAlignment": "MIDDLE",
    "wrapStrategy": "WRAP",
}

CATEGORY_COLORS = {
    "build": {"red": 0.6509804, "green": 0.3019608, "blue": 0.4745098},
    "outreach": {"red": 0.8352941, "green": 0.6509804, "blue": 0.7411765},
    "family": {"red": 0.84705883, "green": 1, "blue": 0.9490196},
    "relaxation": {"red": 0.9019608, "green": 0.5686275, "blue": 0.21960784},
}

TIME_FORMATS = [
    "%H:%M",
    "%I:%M %p",
    "%I %p",
]


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
    text = proc.stdout
    json_start = text.find("{")
    if json_start == -1:
        return {}
    return json.loads(text[json_start:])


def normalize_date(date_str):
    for fmt in ("%B %d, %Y", "%Y-%m-%d", "%m/%d/%Y"):
        try:
            parsed = datetime.strptime(date_str, fmt)
            return parsed.strftime("%B %d, %Y")
        except ValueError:
            continue
    raise ValueError(f"Unsupported date format: {date_str}")


def extract_schedule_date(title):
    if not title.startswith(DEFAULT_SHEET_PREFIX):
        return None
    value = title[len(DEFAULT_SHEET_PREFIX) :]
    try:
        return datetime.strptime(value, "%B %d, %Y")
    except ValueError:
        return None


def pick_template_sheet(sheets, target_title):
    dated = []
    fallback = None
    for sheet in sheets:
        title = sheet["properties"]["title"]
        if title == "Ideal Day":
            fallback = sheet
        if title == target_title:
            return sheet, True
        parsed = extract_schedule_date(title)
        if parsed is not None:
            dated.append((parsed, sheet))
    if dated:
        dated.sort(key=lambda item: item[0], reverse=True)
        return dated[0][1], False
    if fallback is not None:
        return fallback, False
    return sheets[0], False


def parse_time_value(value):
    value = value.strip().upper().replace(".", "")
    for fmt in TIME_FORMATS:
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            continue
    raise ValueError(f"Unsupported time value: {value}")


def duration_to_pixels(time_block):
    match = re.match(r"^\s*(.+?)\s*-\s*(.+?)\s*$", time_block)
    if not match:
        return 21
    start = parse_time_value(match.group(1))
    end = parse_time_value(match.group(2))
    minutes = int((end - start).total_seconds() / 60)
    if minutes <= 0:
        minutes += 24 * 60
    return max(21, int(math.ceil(minutes / 30.0) * 21))


def load_schedule(path):
    with open(path, "r", encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, list) or not data:
        raise ValueError("Schedule file must contain a non-empty JSON array.")
    rows = []
    for idx, item in enumerate(data, start=1):
        missing = [
            key
            for key in ("time_block", "phase", "objective", "rationale", "action_log", "category")
            if key not in item
        ]
        if missing:
            raise ValueError(f"Row {idx} missing required keys: {', '.join(missing)}")
        category = str(item["category"]).strip().lower()
        if category not in CATEGORY_COLORS:
            raise ValueError(f"Row {idx} has unsupported category: {category}")
        rows.append(
            {
                "time_block": str(item["time_block"]),
                "phase": str(item["phase"]),
                "objective": str(item["objective"]),
                "rationale": str(item["rationale"]),
                "action_log": str(item["action_log"]),
                "category": category,
            }
        )
    return rows


def build_value_grid(rows, clear_rows):
    grid = [HEADER]
    for row in rows:
        grid.append(
            [
                row["time_block"],
                row["phase"],
                row["objective"],
                row["rationale"],
                row["action_log"],
            ]
        )
    while len(grid) < clear_rows:
        grid.append(["", "", "", "", ""])
    return grid


def format_requests(sheet_id, rows):
    requests = []
    requests.append(
        {
            "repeatCell": {
                "range": {
                    "sheetId": sheet_id,
                    "startRowIndex": 0,
                    "endRowIndex": 1,
                    "startColumnIndex": 0,
                    "endColumnIndex": 5,
                },
                "cell": {"userEnteredFormat": HEADER_FORMAT},
                "fields": "userEnteredFormat",
            }
        }
    )
    for idx, row in enumerate(rows, start=1):
        color = CATEGORY_COLORS[row["category"]]
        requests.append(
            {
                "repeatCell": {
                    "range": {
                        "sheetId": sheet_id,
                        "startRowIndex": idx,
                        "endRowIndex": idx + 1,
                        "startColumnIndex": 0,
                        "endColumnIndex": 5,
                    },
                    "cell": {
                        "userEnteredFormat": {
                            **ROW_BASE_FORMAT,
                            "backgroundColor": color,
                            "backgroundColorStyle": {"rgbColor": color},
                        }
                    },
                    "fields": "userEnteredFormat(backgroundColor,backgroundColorStyle,horizontalAlignment,verticalAlignment,wrapStrategy)",
                }
            }
        )
    requests.extend(
        [
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "COLUMNS",
                        "startIndex": 0,
                        "endIndex": 1,
                    },
                    "properties": {"pixelSize": 200},
                    "fields": "pixelSize",
                }
            },
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "COLUMNS",
                        "startIndex": 1,
                        "endIndex": 2,
                    },
                    "properties": {"pixelSize": 200},
                    "fields": "pixelSize",
                }
            },
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "COLUMNS",
                        "startIndex": 2,
                        "endIndex": 3,
                    },
                    "properties": {"pixelSize": 200},
                    "fields": "pixelSize",
                }
            },
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "COLUMNS",
                        "startIndex": 3,
                        "endIndex": 4,
                    },
                    "properties": {"pixelSize": 203},
                    "fields": "pixelSize",
                }
            },
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "COLUMNS",
                        "startIndex": 4,
                        "endIndex": 5,
                    },
                    "properties": {"pixelSize": 300},
                    "fields": "pixelSize",
                }
            },
        ]
    )
    row_sizes = [21] + [duration_to_pixels(row["time_block"]) for row in rows]
    for idx, pixel_size in enumerate(row_sizes):
        requests.append(
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "ROWS",
                        "startIndex": idx,
                        "endIndex": idx + 1,
                    },
                    "properties": {"pixelSize": pixel_size},
                    "fields": "pixelSize",
                }
            }
        )
    return requests


def main():
    parser = argparse.ArgumentParser(description="Create or update a Daily Plans schedule tab.")
    parser.add_argument("--schedule-file", required=True, help="Path to the schedule JSON file.")
    parser.add_argument("--date", required=True, help='Tab date, for example "March 18, 2026".')
    parser.add_argument("--spreadsheet-id", default=DEFAULT_SPREADSHEET_ID)
    parser.add_argument("--credentials", default=os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", DEFAULT_CREDENTIALS))
    parser.add_argument("--clear-rows", type=int, default=DEFAULT_CLEAR_ROWS)
    args = parser.parse_args()

    schedule_path = Path(args.schedule_file)
    if not schedule_path.exists():
        raise SystemExit(f"Schedule file not found: {schedule_path}")

    if not Path(args.credentials).exists():
        raise SystemExit(f"Credentials file not found: {args.credentials}")

    env = os.environ.copy()
    env["GOOGLE_APPLICATION_CREDENTIALS"] = args.credentials

    rows = load_schedule(schedule_path)
    normalized_date = normalize_date(args.date)
    target_title = f"{DEFAULT_SHEET_PREFIX}{normalized_date}"

    spreadsheet = run_cli(
        ["sheets", "spreadsheets", "get"],
        params={"spreadsheetId": args.spreadsheet_id},
        env=env,
    )
    sheets = spreadsheet.get("sheets", [])
    if not sheets:
        raise SystemExit("Spreadsheet has no sheets.")

    template_sheet, already_exists = pick_template_sheet(sheets, target_title)
    target_sheet_id = template_sheet["properties"]["sheetId"]

    if not already_exists:
        duplicate_response = run_cli(
            ["sheets", "spreadsheets", "batchUpdate"],
            params={"spreadsheetId": args.spreadsheet_id},
            body={
                "requests": [
                    {
                        "duplicateSheet": {
                            "sourceSheetId": template_sheet["properties"]["sheetId"],
                            "newSheetName": target_title,
                            "insertSheetIndex": len(sheets),
                        }
                    }
                ]
            },
            env=env,
        )
        target_sheet_id = duplicate_response["replies"][0]["duplicateSheet"]["properties"]["sheetId"]

    values = build_value_grid(rows, args.clear_rows)
    run_cli(
        ["sheets", "spreadsheets", "values", "update"],
        params={
            "spreadsheetId": args.spreadsheet_id,
            "range": f"'{target_title}'!A1:E{args.clear_rows}",
            "valueInputOption": "USER_ENTERED",
        },
        body={"values": values},
        env=env,
    )

    run_cli(
        ["sheets", "spreadsheets", "batchUpdate"],
        params={"spreadsheetId": args.spreadsheet_id},
        body={"requests": format_requests(target_sheet_id, rows)},
        env=env,
    )

    summary = {
        "spreadsheet_id": args.spreadsheet_id,
        "sheet_title": target_title,
        "rows_written": len(rows),
        "template_sheet": template_sheet["properties"]["title"],
        "updated_existing_sheet": already_exists,
        "categories": [row["category"] for row in rows],
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
