---
name: research-article-builder
description: Build or revise AutoNateAI research landing pages and long-form research articles in the existing site brand. Use when creating a new research node, updating a published research article, adding charts, tables, diagrams, source rails, responsive media, or regenerating matching widescreen research images for the article and research hub.
---

# Research Article Builder

Use this skill for `/research` work inside the AutoNateAI tutoring site.

## Scope

- Research landing page updates in `src/pages/research/index.tsx`
- Research article metadata in `src/data/researchArticles.ts`
- Research article pages in `src/pages/research/*.tsx`
- Shared research layout and styles in:
  - `src/components/research/ResearchArticleLayout.tsx`
  - `src/components/research/research.module.css`
- Widescreen research image generation in:
  - `scripts/generate-research-images.js`
  - `scripts/research-image-batch.json`

## Required output standard

- Match the landing-page brand: dark editorial, premium, cinematic, not sterile academic
- Write like a smooth, high-agency research narrator with strong point of view
- Heavy on sources, clear data storytelling, and strong connective tissue
- Use charts, tables, metric cards, and diagrams where they clarify the argument
- Keep mobile first: every dense section should be broken by a visual, chart, or strong component before fatigue sets in

## Default workflow

1. Read the existing research layout, article page, article metadata, and `research.module.css`.
2. Map the article into blocks:
   - hero thesis
   - evidence / source framing
   - data story
   - interpretation
   - bridge back to AutoNateAI or the larger thesis
   - closing node
3. For each block, decide the best support component:
   - short narrative section
   - comparison chart
   - timeline
   - table
   - framework diagram
   - widescreen research image
4. Keep the rhythm clean on mobile:
   - avoid stacking multiple dense text sections without a visual break
   - use full-width cards and wide images
   - replace large tables with card stacks on small screens when needed
5. If new raster visuals are needed, update `scripts/research-image-batch.json` and run `node scripts/generate-research-images.js`.
6. Run `npm run typecheck` and `npm run build`.

## Research image rules

- Use the repo’s `.gemini` `gpt-image-1.5` workflow, not the old DALL-E path
- Generate widescreen editorial images only
- Prefer node maps, interconnected systems, translational research pathways, lab-data atmospheres, and premium scientific interfaces
- Images should support the nearby argument, not decorate it
- Prompts should explicitly forbid text, labels, captions, and faux UI typography
- Store final images in `static/img/research/`

## Article composition rules

- Lead with a strong thesis and why the node matters
- Make the evidence stack visible instead of burying it
- Use real source links in `researchArticles.ts`
- Tables must be readable on mobile; provide a card fallback if the table is too dense
- Captions should explain why the visual is there
- When adding images inside articles, use responsive wide frames and lazy loading

## Implementation notes

- Reuse existing components and class patterns before inventing new ones
- Prefer surgical CSS additions in `research.module.css`
- Keep article images and OG images visually related but not identical
- Do not update unrelated top-level tabs unless the request explicitly says to

## Final check

- Desktop, tablet, and mobile layouts all read cleanly
- The article feels like a data-driven story, not a text dump
- Sources, visuals, and claims align
- Build passes
