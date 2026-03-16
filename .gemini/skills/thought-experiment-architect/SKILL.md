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
*   **Character Anchors:** Generate **3 character reference images** first (for Maya, Leo, Dr. Aris or mission-specific characters).
*   **Batch Image Generation:** **MANDATORY** - Use the `batch-image-generator` skill for ALL mission visuals.
    *   **Phase 1:** Generate 3 character anchors in parallel (~1 min)
    *   **Phase 2:** Generate 9 cinematic scenes in parallel (~2-3 mins)
    *   **Total image generation time:** ~3-5 minutes (vs 15+ min sequential)
*   **Character Consistency:** Use the `references` parameter in batch config to lock character identities across all 9 scenes.
*   **Wordless Meme Thumbnail:** Generate a cinematic, text-free OG image using `batch-image-generator` with `size="1024x1024"`.

### 3. Technical & Automation
*   **Trigger Protocol:** Start with a LeetCode/HackerRank question and optimal solution.
*   **Starter Rig:** Use `gh` CLI to create a public repo with `scripts/orchestrator.py`, `README.md`, and mission data.
*   **Content Hub:** All quest content is stored in `thought-experiments/` (e.g., `thought-experiments/Algorithms/Hard/Silicon-Deadlock/`).
*   **Batch Config Template:** Generate a `batch-config.json` for the `batch-image-generator` skill.

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

## Phase 2: Visual Production (Batch Image Generation)

### Step 1: Character Anchors (3 images, parallel)
Generate 3 character reference images FIRST. Example config:

```json
{
  "model": "gpt-image-1.5",
  "size": "1536x1024",
  "quality": "high",
  "fidelity": "high",
  "concurrency": 5,
  "images": [
    {
      "prompt": "Handsome Asian-American male genius Dr. Nate Chen, mid-30s, sharp intelligent features, confident demeanor, modern tech professional, Disney/Pixar animated 3D style, high fidelity character portrait, NO text, NO letters, NO words",
      "output": "static/img/quests/[mission]/character-nate.png",
      "references": []
    },
    {
      "prompt": "Indian-American woman Maya Patel, 28 years old, systems architect, warm brown skin, dark wavy hair, expressive intelligent eyes, Disney/Pixar animated 3D style, high fidelity character portrait, NO text, NO letters, NO words",
      "output": "static/img/quests/[mission]/character-maya.png",
      "references": []
    },
    {
      "prompt": "Filipino-American woman Priya Okoye, 26 years old, computer vision specialist, light brown skin, dark long hair, focused determined expression, Disney/Pixar animated 3D style, high fidelity character portrait, NO text, NO letters, NO words",
      "output": "static/img/quests/[mission]/character-priya.png",
      "references": []
    }
  ]
}
```

### Step 2: Cinematic Scenes (9 images, parallel)
Use character anchors as references for all 9 scenes:

```json
{
  "model": "gpt-image-1.5",
  "size": "1536x1024",
  "quality": "high",
  "fidelity": "high",
  "concurrency": 5,
  "images": [
    {
      "prompt": "Dr. Nate Chen stands on the illuminated Blue Bridge at night in Grand Rapids, phone in hand, looking urgent. Grand River glows electric blue below. Downtown skyline sparkles with ArtPrize installations. Dramatic lighting, action-movie composition, Disney/Pixar cinematic style, 16:9, high fidelity. NO text, NO letters, NO words",
      "output": "static/img/quests/[mission]/scene-01.png",
      "references": ["static/img/quests/[mission]/character-nate.png"]
    },
    ... (8 more scenes)
  ]
}
```

### Step 3: Run Batch Generator
```bash
python3 .gemini/skills/batch-image-generator/scripts/batch_generate.py \
  --config path/to/batch-config.json
```

### Expected Performance
- **3 character anchors:** ~1 minute (5 concurrent requests)
- **9 cinematic scenes:** ~2-3 minutes (5 concurrent requests)
- **Total:** 3-5 minutes for 12 images

## Phase 3: Content Assembly

### CRITICAL: First Image Placement Rule
**⚠️ MANDATORY**: The first scene image (`scene-01.png`) MUST be placed immediately after the FIRST paragraph of the narrative, NOT at the end of the introduction section.

**Correct Placement:**
```mdx
## The Tipoff

The Van Andel Arena roared as the Grand Rapids Rise tipped off against the Chicago Sky. Dr. Nate Chen leaned forward in his seat, smartphone buzzing in his hand.

<img className="quest-image" src="/img/quests/mission/scene-01.png" alt="Scene description" />

**Maya Patel**, 28, Indian-American systems architect, gasped mid-bite into her hot dog...
```

**Wrong Placement (DO NOT DO THIS):**
```mdx
## The Tipoff

The Van Andel Arena roared... Operation Court Clear had begun.

<img className="quest-image" src="/img/quests/mission/scene-01.png" alt="Scene description" />

---

## The Emergency Protocol
```

### Why This Matters
- **Visual hook**: Readers see the cinematic scene immediately after the opening line
- **Pacing**: Creates dramatic tension before character introductions
- **Gold Standard**: All AutoNateAI missions follow this pattern

### Full Image Placement Guide
1. **Scene 01**: After FIRST paragraph of Section 1
2. **Scene 02-03**: After key reveals in Section 2
3. **Scene 04-05**: Before/after code blocks in Section 3
4. **Scene 06-07**: At dramatic peaks in Section 4
5. **Scene 08-09**: Victory montage in Section 5

1.  Write MDX with `<CardSlam />` hook
2.  Place scene-01 image after the FIRST paragraph (critical!)
3.  Insert remaining 8 images at dramatic beats
4.  Add technical deep dive with complexity analysis
5.  Link GitHub starter repo
