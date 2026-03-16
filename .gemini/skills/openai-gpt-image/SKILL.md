---
name: openai-gpt-image
description: Generates high-fidelity images using OpenAI's gpt-image-1.5 model. Supports high input fidelity for faces/logos, character consistency via reference images, and custom sizing/quality. Use when creating story assets or cinematic visuals for AutoNateAI missions.
---

# OpenAI GPT Image Generator

This skill interfaces with OpenAI's most advanced image generation models (`gpt-image-1.5`, `gpt-image-1`) to produce high-stakes, cinematic visuals.

## Core Capabilities
*   **High Input Fidelity:** Set `fidelity="high"` to preserve facial geometry and logos from reference images.
*   **Sequential Consistency:** Use up to 5 reference images to maintain consistent characters and environments.
*   **Flexible Layouts:** Supports `1536x1024` (Landscape), `1024x1536` (Portrait), and `1024x1024` (Square).
*   **Premium Quality:** Defaults to `high` quality rendering.

## Workflow

To generate an image, use the provided Python script:

```bash
python3 .gemini/skills/openai-gpt-image/scripts/generate_gpt_image.py \
  --prompt "Your highly descriptive prompt" \
  --output "path/to/save.png" \
  --references "ref1.png" "ref2.png" \
  --size "1536x1024" \
  --fidelity "high"
```


## Prompting Standards
*   **Cinematic Style:** Always include keywords like "Cinematic lighting," "Disney/Pixar animated style," or "Sharp textures."
*   **No Text Mandate:** Strictly include "NO text, NO letters, NO words" in prompts to ensure clean visuals.
*   **Character Anchors:** When generating recurring characters, describe them in detail (age, clothing, physical traits) in every prompt.
