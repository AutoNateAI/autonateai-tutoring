# Skill Updates - Batch Image Generation

## Summary
Created a new `batch-image-generator` skill and updated `thought-experiment-architect` to enable parallel image generation, reducing mission visual production time from **15+ minutes to 3-5 minutes**.

---

## New Skill: batch-image-generator

### Location
`.gemini/skills/batch-image-generator/`

### Files Created
- `SKILL.md` - Skill documentation and capabilities
- `README.md` - Quick start guide
- `scripts/batch_generate.py` - Async batch generation script
- `scripts/batch-config.example.json` - Example configuration

### Features
- ✅ **Parallel generation** - Up to 5 concurrent API requests (configurable 1-10)
- ✅ **Character consistency** - Reference images for all batch items
- ✅ **Retry logic** - Automatic retry on rate limits (429) with exponential backoff
- ✅ **Error isolation** - Single failure doesn't block entire batch
- ✅ **Progress tracking** - Real-time console output
- ✅ **Safety handling** - Gracefully skips safety-blocked prompts

### Performance
| Task | Sequential | Parallel | Speedup |
|------|------------|----------|---------|
| 3 character anchors | ~3 min | ~1 min | 3x |
| 9 cinematic scenes | ~12 min | ~2-3 min | 4-6x |
| **Total (12 images)** | **~15 min** | **~3-5 min** | **3-5x** |

---

## Updated Skill: thought-experiment-architect

### Location
`.gemini/skills/thought-experiment-architect/SKILL.md`

### Changes
1. **Updated Section 2 (Visuals)** to mandate `batch-image-generator` instead of sequential `openai-gpt-image` calls
2. **Added Phase 2: Visual Production** with:
   - Step-by-step batch config creation
   - Character anchor generation (3 images)
   - Cinematic scene generation (9 images)
   - Expected performance benchmarks
3. **Added Phase 3: Content Assembly** for MDX integration

---

## Infrastructure Updates

### Shared Requirements
Created `.gemini/skills/requirements.txt`:
```
openai>=1.50.0
aiohttp>=3.9.0
tqdm>=4.66.0
```

### Installation
```bash
pip install -r .gemini/skills/requirements.txt
```

---

## Usage Example

### 1. Create Batch Config
```json
{
  "model": "gpt-image-1.5",
  "size": "1536x1024",
  "quality": "high",
  "fidelity": "high",
  "concurrency": 5,
  "images": [
    {
      "prompt": "Handsome Asian-American male genius...",
      "output": "static/img/quests/my-mission/character-nate.png",
      "references": []
    },
    ... (11 more images)
  ]
}
```

### 2. Run Batch Generator
```bash
python3 .gemini/skills/batch-image-generator/scripts/batch_generate.py \
  --config batch-config.json
```

### 3. Output
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

---

## Migration Guide

### For Future Missions
1. Use `thought-experiment-architect` to generate the batch config
2. Run `batch-image-generator` instead of calling `openai-gpt-image` 12 times
3. Images will be generated in parallel with character consistency

### Backward Compatibility
- `openai-gpt-image` skill still works for single images
- Existing missions unchanged
- New missions automatically use batch workflow

---

## Testing Performed

✅ Circuit Breaker mission (12 images):
- 3 character anchors: Dr. Nate Chen, Maya Patel, Priya Okoye
- 9 cinematic scenes: Blue Bridge, Heritage Hill, John Ball Zoo, Meijer Gardens
- All images generated successfully
- Character consistency maintained across scenes

---

## Next Steps (Optional Enhancements)

1. **Progress bar** - Add `tqdm` for visual progress tracking
2. **Webhook notifications** - Notify on batch completion
3. **Image validation** - Verify generated images meet quality standards
4. **Cost tracking** - Log API usage per batch
5. **Cache system** - Skip regeneration if output exists

---

## Files Changed Summary

| File | Action | Purpose |
|------|--------|---------|
| `.gemini/skills/batch-image-generator/SKILL.md` | Created | Skill definition |
| `.gemini/skills/batch-image-generator/README.md` | Created | Quick start |
| `.gemini/skills/batch-image-generator/scripts/batch_generate.py` | Created | Async generator |
| `.gemini/skills/batch-image-generator/scripts/batch-config.example.json` | Created | Config template |
| `.gemini/skills/requirements.txt` | Created | Python dependencies |
| `.gemini/skills/thought-experiment-architect/SKILL.md` | Updated | Integrated batch workflow |

---

**Created:** March 16, 2026  
**Status:** ✅ Production Ready  
**First Mission:** Operation: Circuit Breaker
