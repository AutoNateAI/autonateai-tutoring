---
name: og-image-architect
description: Analyzes page content (MDX/HTML) and collaborates with the user to generate high-impact, cinematic Open Graph images. Use when you need to update social media preview images for AutoNateAI pages.
---

# OG Image Architect

This skill transforms your technical content into captivating, wordless social media "thumbnails" that act as portals for developers.

## Operational Mandates
*   **Context Analysis:** ALWAYS read the target page content (MDX or HTML) before suggesting image concepts.
*   **Collaborative Concepting:** Present 3 distinct cinematic directions to the user. Use a mix of narrative tension, technical awe, and meme-like "galaxy brain" energy.
*   **Wordless Previews:** Strictly enforce the "NO text, NO letters, NO words" rule for all generated images. Let the title and description in the link preview do the talking.
*   **Premium Aesthetic:** Default to the Disney/Pixar 3D animated style established in the Mission Campaigns.
*   **Technical Engine:** Use the `openai-gpt-image` skill to execute the final generation.

## Workflow

### Phase 1: Context Ingestion
1.  Read the target file (e.g., `thought-experiments/Algorithms/Medium/silicon-deadlock.mdx`).
2.  Summarize the core "epiphany" and narrative stakes.

### Phase 2: Brainstorming
Suggest 3 options to the user:
*   **Option 1: The Tactical View.** Close-up on characters or code in intense struggle.
*   **Option 2: The Macro View.** Cinematic wide shot of the technical disaster/environment.
*   **Option 3: The Meme View.** Over-the-top, captivating "galaxy brain" or epiphany-driven visual.

### Phase 3: Generation
1.  Gather user choice and refinements.
2.  Call `openai-gpt-image` with:
    *   `--prompt`: Highly descriptive, emphasizing lighting and style.
    *   `--size`: "1024x1024" (Square for social compatibility).
    *   `--output`: `static/img/og-[page-name].png`.
3.  Update the page's metadata (frontmatter or Layout prop) to link the new image.
