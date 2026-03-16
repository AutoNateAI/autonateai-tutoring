import json
import sys
import subprocess

def upload():
    results = json.load(open('vibe_results.json'))
    chunk_size = 50
    for i in range(0, len(results), chunk_size):
        chunk = results[i:i + chunk_size]
        range_str = f"'Vibe Learning Library'!A{i + 2}"
        json_data = json.dumps({"values": chunk})
        cmd = [
            "npx", "@googleworkspace/cli", "sheets", "spreadsheets", "values", "update",
            "--params", json.dumps({"spreadsheetId": sys.argv[1], "range": range_str, "valueInputOption": "USER_ENTERED"}),
            "--json", json_data
        ]
        subprocess.run(cmd)

if __name__ == "__main__":
    upload()
