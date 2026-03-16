# Batch Image Generator

High-throughput parallel image generation for AutoNateAI mission campaigns.

## Quick Start

### 1. Install Dependencies

```bash
pip install -r ../requirements.txt
```

### 2. Create Batch Config

Copy the example and customize:

```bash
cp scripts/batch-config.example.json batch-config.json
```

Edit `batch-config.json` with your prompts and output paths.

### 3. Set API Key

```bash
export OPENAI_API_KEY="sk-..."
```

### 4. Run Batch Generation

```bash
python3 scripts/batch_generate.py --config batch-config.json
```

## Configuration

See `../SKILL.md` for full configuration options and examples.

## Performance

- **3 character anchors:** ~1 minute
- **9 cinematic scenes:** ~2-3 minutes
- **Total for 12 images:** 3-5 minutes (vs 15+ min sequential)

## Concurrency Guidelines

- Default: 5 concurrent requests
- Safe range: 3-10 depending on your API rate limit
- Adjust with `--concurrency` flag or `concurrency` in config

## Error Handling

- **Rate limits (429):** Automatic retry with exponential backoff
- **Safety blocks (400):** Skipped and logged
- **Network errors:** 3 retries with backoff
- **Timeouts:** 120s per request, 3 retries

## Example Output

```
🚀 Batch Image Generator - Starting...
📊 Total images: 12 | Concurrency: 5

✅ [1/12] character-nate.png
✅ [2/12] character-maya.png
✅ [3/12] character-priya.png
✅ [4/12] scene-01.png
...

🎉 Batch complete! 12/12 images generated successfully.
⏱️  Total time: 3m 12s
```
