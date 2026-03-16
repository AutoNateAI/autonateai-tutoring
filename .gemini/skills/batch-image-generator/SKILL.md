---
name: batch-image-generator
description: High-throughput parallel image generation using OpenAI gpt-image-1.5. Generates multiple images concurrently (up to 5 parallel requests) for rapid mission campaign visual production. Use when creating 9+ cinematic visuals for AutoNateAI quests.
---

# Batch Image Generator

This skill provides **high-throughput parallel image generation** for AutoNateAI mission campaigns. It can generate 12+ images in ~3 minutes vs 15+ minutes sequentially.

## Core Capabilities
*   **Parallel Generation:** Up to 5 concurrent API requests
*   **Character Consistency:** Supports reference images for all batch items
*   **Retry Logic:** Automatic retry on rate limit errors (429)
*   **Progress Tracking:** Real-time console output with completion status
*   **Error Isolation:** Single failure doesn't block entire batch

## Workflow

### Batch Mode (Recommended)

Create a JSON config file with all your prompts:

```json
{
  "model": "gpt-image-1.5",
  "size": "1536x1024",
  "quality": "high",
  "fidelity": "high",
  "concurrency": 5,
  "images": [
    {
      "prompt": "Handsome Asian-American male genius Dr. Nate Chen...",
      "output": "static/img/quests/circuit-breaker/character-nate.png",
      "references": []
    },
    {
      "prompt": "Indian-American woman Maya Patel, 28 years old...",
      "output": "static/img/quests/circuit-breaker/character-maya.png",
      "references": []
    },
    {
      "prompt": "Dr. Nate Chen stands on the illuminated Blue Bridge...",
      "output": "static/img/quests/circuit-breaker/scene-01.png",
      "references": ["static/img/quests/circuit-breaker/character-nate.png"]
    }
  ]
}
```

Run the batch generator:

```bash
python3 .gemini/skills/batch-image-generator/scripts/batch_generate.py \
  --config path/to/batch-config.json
```

### Single Image (Fallback)

For one-off images, use the original `openai-gpt-image` skill.

## Configuration Options

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `model` | string | `"gpt-image-1.5"` | OpenAI model to use |
| `size` | string | `"1536x1024"` | Image dimensions (16:9, square, portrait) |
| `quality` | string | `"high"` | Rendering quality (low/medium/high/auto) |
| `fidelity` | string | `"high"` | Input fidelity for references (low/high) |
| `concurrency` | int | `5` | Max parallel requests (1-10) |
| `images` | array | **required** | Array of image generation tasks |

### Image Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | **yes** | Image description (include "NO text, NO letters, NO words") |
| `output` | string | **yes** | Output file path |
| `references` | array | no | Paths to reference images for consistency |

## Retry Behavior

- **Rate Limit (429):** Exponential backoff, max 3 retries
- **Safety Block (400):** Skip and log, no retry
- **Network Error:** Exponential backoff, max 3 retries
- **Timeout:** 120 seconds per request

## Output

The script provides real-time feedback:

```
🚀 Batch Image Generator - Starting...
📊 Total images: 12 | Concurrency: 5

✅ [1/12] character-nate.png (2.3s)
✅ [2/12] character-maya.png (2.1s)
✅ [3/12] character-priya.png (2.5s)
⏳ [4/12] scene-01.png ...
⏳ [5/12] scene-02.png ...
...

🎉 Batch complete! 12/12 images generated successfully.
⏱️  Total time: 3m 12s
```

## Integration with Thought Experiment Architect

The `thought-experiment-architect` skill should:
1. Generate all 9 scene prompts + 3 character prompts
2. Write them to a `batch-config.json`
3. Call this skill to generate all images in parallel
4. Update the MDX file with generated image paths

## Best Practices

1. **Generate characters first** - Run a 3-image batch for character anchors
2. **Then generate scenes** - Run a 9-image batch using characters as references
3. **Use descriptive prompts** - Include style keywords (Disney/Pixar, cinematic lighting)
4. **NO text mandate** - Always include "NO text, NO letters, NO words" in prompts
5. **Set appropriate concurrency** - 5 is safe; increase if you have higher rate limits
