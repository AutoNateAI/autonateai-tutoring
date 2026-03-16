import json
import sys
import subprocess

def upload():
    results = json.load(open('analytics_results.json'))
    # Chunking into 50 rows per request to avoid CLI argument length limits
    chunk_size = 50
    for i in range(0, len(results), chunk_size):
        chunk = results[i:i + chunk_size]
        range_str = f"'Demand Analytics'!A{i + 2}"
        json_data = json.dumps({"values": chunk})
        cmd = [
            "npx", "@googleworkspace/cli", "sheets", "spreadsheets", "values", "update",
            "--params", json.dumps({"spreadsheetId": sys.argv[1], "range": range_str, "valueInputOption": "USER_ENTERED"}),
            "--json", json_data
        ]
        subprocess.run(cmd)

if __name__ == "__main__":
    upload()
