# Thought Experiment: The Agent Workflow

This document provides a comprehensive guide for any AI agent tasked with creating a **Mission Campaign** (Thought Experiment) for the AutoNateAI platform.

## 🎯 Objective
Transform a LeetCode/HackerRank question into an immersive, high-stakes coding adventure with a narrative hook, cinematic visuals, and a technical "Starter Rig."

---

## 🛠 Prerequisites & Tools
The agent MUST have access to the following skills within `autonateai-tutoring/.gemini/skills/`:
1.  **`thought-experiment-architect`**: For narrative structure and act breakdown.
2.  **`openai-gpt-image`**: For generating the **9 cinematic visuals**.
3.  **`og-image-architect`**: For the wordless, high-impact social preview image.

---

## 🏗 Phase 1: Ingest & Research
1.  **Ingest:** Start with a LeetCode question and its optimal solution (optimal time/space complexity).
2.  **Context Search:** Search for current news (finance, sports, politics) to use as a narrative anchor for the mission.
3.  **Strategy:** Map the technical concepts (e.g., Dijkstra, Tries, Dynamic Programming) to a real-world industrial crisis.

---

## 🎭 Phase 2: Narrative & Visual Planning
1.  **Act Breakdown:** Plan the 5 acts following the **5-Act Epic Structure** in the `thought-experiment-architect` skill.
2.  **Visual Storyboard:** Define exactly **9 cinematic scenes** (16:9) in Disney/Pixar style.
3.  **Character Consistency:** Use **Maya**, **Leo**, and **Dr. Aris** as recurring characters. Use the `references` parameter in `openai-gpt-image` to maintain their identities.

---

## 💻 Phase 3: Technical Implementation
1.  **Content Creation:** Write the content in MDX format, ensuring it starts with the `<CardSlam />` component and includes scaled-down code blocks (`font-size: 0.65rem`) for mobile.
2.  **Technical Starter Rig:** 
    *   If you have **GitHub CLI (`gh`)** access: Create a public repository and push the `orchestrator.py` script and `README.md`.
    *   If you **DO NOT** have GitHub access:
        1.  Create a folder under `temp_repos/` named after the mission (e.g., `temp_repos/operation-route-zero/`).
        2.  Place the `orchestrator.py` and `README.md` inside that folder.
        3.  In the MDX content, leave a placeholder: `[GITHUB_REPO_LINK_PENDING]`.
        4.  Notify the user that the repo files are ready for manual creation.

---

## 📂 Phase 4: Placement & Organization
*   **Mission Content:** Save the `.mdx` file in the appropriate category under `autonateai-tutoring/thought-experiments/` (e.g., `Algorithms/Hard/`).
*   **Assets:** Store generated images in `autonateai-tutoring/static/img/quests/[quest-name]/`.

---

## ✅ Phase 5: Final Validation
1.  Check for broken links or missing images.
2.  Ensure the Mermaid diagram correctly reflects the mission's "Tech Tree."
3.  Verify the `<CardSlam />` hook is the first element on the page.
