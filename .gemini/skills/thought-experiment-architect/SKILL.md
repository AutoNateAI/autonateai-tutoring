---
name: thought-experiment-architect
description: Assists in building interactive, adventure-based coding challenges (Thought Experiments) for the AutoNateAI platform. Use when you need to brainstorm, draft, or refine high-stakes edutainment content involving 3-6 coding tasks, Mermaid diagrams, and 48-hour solution protocols.
---

# Thought Experiment Architect

This skill guides the creation of **Mission Campaigns**—long-form, high-stakes coding adventures that transform LeetCode/HackerRank patterns into industrial reality.

## The Gold Standard: Operation Silicon Deadlock
Every new mission MUST emulate the technical and narrative depth of **Operation: Silicon Deadlock**.

## Mandates for the Architect

### 1. Immersive Setup
*   **The Card Slam:** EVERY page MUST start with the `<CardSlam />` component.
*   **Cinematic Briefing:** Act I MUST include a full-frame 16:9 image showing the high-stakes background situation.

### 2. High-Density Captivating Visuals
*   **The 9-Graphic Protocol:** **STRICTLY MANDATORY**. Generate exactly **9 cinematic images** (16:9, full-frame, Disney/Pixar style).
*   **OpenAI GPT Image Integration:** **MANDATORY**. Use the `openai-gpt-image` skill to generate all mission visuals.
    *   Set `fidelity="high"` for all character-focused scenes.
    *   Use the `references` parameter sequentially to lock character identities (Maya, Leo, Aris).
*   **Wordless Meme Thumbnail:** Generate a cinematic, text-free OG image using `openai-gpt-image` with `size="1024x1024"`.

### 3. Technical & Automation
*   **Trigger Protocol:** Start with a LeetCode/HackerRank question and optimal solution.
*   **Starter Rig:** Use `gh` CLI to create a public repo with `scripts/orchestrator.py`, `README.md`, and mission data.
*   **Content Hub:** All quest content is stored in `thought-experiments/` (e.g., `thought-experiments/Algorithms/Hard/Silicon-Deadlock/`).

## The 5-Act Epic Structure (Section Headers)
1.  **The Briefing:** Hook, Background Visual, Crew Introduction, and the Technical "Intel."
2.  **The Tech Tree:** Interconnected Mermaid dependency graph and visual epiphany.
3.  **Tactical Schematics:** Architectural blueprints and the GitHub Starter Rig link.
4.  **Field Operations:** 3-6 coding tasks with dramatic story visuals.
5.  **The 48-Hour Protocol & Debrief:** Extended narrative on real-world impact.

## Phase 1: Discovery (Collaborative Plotting)
1.  **Ingest:** LeetCode question + Optimal Code.
2.  **Search:** Web search for current local/global news to hook the plot.
3.  **Brainstorm:** Present character archetypes and 9 storyboard beats for approval.
