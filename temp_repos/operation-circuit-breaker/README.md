# Operation: Circuit Breaker 🎯

**Dual-Algorithm Event Routing for Grand Rapids**

A production-ready hybrid DFS+BFS routing system designed for large-scale events like ArtPrize, Lantern Festival, and World of Winter.

---

## 🚀 Quick Start

```bash
# Run the demo
python orchestrator.py
```

---

## 🎭 The Mission

When ArtPrize 2026 brought half a million visitors to Grand Rapids, the navigation system crashed. DFS-only routing sent people on wild goose chases through Heritage Hill. The solution? **Hybrid DFS+BFS**:

- **DFS** explores connected components (venue clusters)
- **BFS** finds optimal paths within components
- **Dynamic updates** handle real-world chaos (weather closures, new installations)

---

## 📦 Features

| Feature | Description |
|---------|-------------|
| `ArtPrizeRouter` | Core hybrid router with precomputed optimal paths |
| `DynamicArtPrizeRouter` | Extended router with live graph updates |
| `hybrid_dfs_bfs_router` | Production function for multi-stop tours |
| Grand Rapids Graph | Sample venue data with 10+ landmarks |

---

## 🏛️ Grand Rapids Landmarks Included

- **John Ball Zoo** (135 years historic)
- **Frederik Meijer Gardens & Sculpture Park**
- **Heritage Hill** (135+ historic homes)
- **Blue Bridge** (pedestrian landmark)
- **ArtPrize Hub** (downtown core)
- **Fulton Street** (historic district)
- **1892 Railroad Bridge** (Grand Rapids & Indiana)
- **Pearl Street** (historic corridor)

---

## 💻 Usage Examples

### Basic Routing

```python
from orchestrator import ArtPrizeRouter, GRAND_RAPIDS_VENUES

router = ArtPrizeRouter(GRAND_RAPIDS_VENUES)

# Find optimal route
route = router.get_optimal_route('john_ball_zoo', 'artprize_hub')
print(f"Route: {' → '.join(route)}")
# Output: john_ball_zoo → downtown_core → artprize_hub
```

### Dynamic Updates

```python
from orchestrator import DynamicArtPrizeRouter

router = DynamicArtPrizeRouter(GRAND_RAPIDS_VENUES)

# Blue Bridge closed for maintenance
router.remove_venue('blue_bridge')

# System auto-reroutes
new_route = router.get_optimal_route('john_ball_zoo', 'artprize_hub')
print(f"Rerouted: {' → '.join(new_route)}")
```

### Multi-Stop Tour

```python
from orchestrator import hybrid_dfs_bfs_router, GRAND_RAPIDS_VENUES

tour = hybrid_dfs_bfs_router(
    GRAND_RAPIDS_VENUES,
    start='john_ball_zoo',
    targets=['artprize_hub', 'blue_bridge', 'heritage_hill']
)
print(f"Complete Tour: {' → '.join(tour)}")
```

---

## 📊 Algorithm Showdown

| Scenario | DFS | BFS | Hybrid |
|----------|-----|-----|--------|
| Find *any* path | ✅ Fast | ⚠️ Overkill | ✅ Smart |
| Find *shortest* path | ⚠️ Not guaranteed | ✅ Optimal | ✅ Best of both |
| Memory usage | O(h) | O(w) | O(V²) precomputed |
| Connected components | ✅ Elegant | ⚠️ Awkward | ✅ DFS exploration |
| Dynamic updates | ⚠️ Rebuild needed | ⚠️ Rebuild needed | ✅ Auto-rebuild |

---

## 🎯 Your Mission

1. **Clone** this repo
2. **Run** the demo: `python orchestrator.py`
3. **Customize** for your city's venues
4. **Deploy** for your local events

---

## 🌟 Events Ready for Integration

- **ArtPrize** (September): 200+ venues
- **Grand Rapids Lantern Festival** (April-June): John Ball Zoo
- **World of Winter Festival** (January): Ice sculpture tours
- **Butterflies Are Blooming** (March): Meijer Gardens
- **Oddities & Curiousities Expo**: Year-round

---

## 📈 Performance Metrics

From the Operation: Circuit Breaker deployment:

| Metric | Before (DFS-only) | After (Hybrid) | Improvement |
|--------|-------------------|----------------|-------------|
| Avg route length | 7.2 hops | 2.8 hops | **61% reduction** |
| Visitor satisfaction | Baseline | +43% | **Major win** |
| Venue coverage (5+) | 61% | 94% | **54% increase** |
| System uptime | 97.2% | 99.97% | **Production-ready** |

---

## 🧠 Key Insights

> "DFS alone is like exploring without a map. BFS alone is efficient but blind to the bigger structure. Together, they see the forest *and* the trees."
> — Dr. Nate Chen, Operation Circuit Breaker

---

## 📚 Learn More

Read the full thought experiment at [AutoNateAI](https://autonateai.com) - Operation: Circuit Breaker in the Students/Hard section.

---

## 🙏 Credits

**Characters**:
- Dr. Nate Chen - Cool handsome genius
- Maya Patel - Indian-American systems architect
- Priya Okoye - Filipino-American computer vision specialist

**Setting**: Grand Rapids, Michigan - ArtPrize 2026

**Algorithms**: DFS + BFS hybrid approach

---

## 🚨 Mission Status

✅ **COMPLETE** - Grand Rapids flows smoothly.

---

*Built with ❤️ for deep thinkers everywhere.*
