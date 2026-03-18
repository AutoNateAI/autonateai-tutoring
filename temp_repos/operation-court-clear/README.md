# Operation: Court Clear 🏀

**BFS Stadium Evacuation for Van Andel Arena**

A production-ready BFS evacuation routing system designed for stadiums, arenas, and large venues.

---

## 🚀 Quick Start

```bash
# Run the demo
python3 orchestrator.py
```

---

## 🎭 The Mission

During a Grand Rapids Rise sellout game at Van Andel Arena, a fire alarm triggered in Section 107. The legacy DFS evacuation system tried to route all 10,000+ fans through a single exit. The solution? **BFS for shortest-path evacuation**:

- **BFS** finds the nearest exit for every section
- **Precomputation** enables O(1) route queries during emergencies
- **Load balancing** distributes crowds across all exits

---

## 📦 Features

| Feature | Description |
|---------|-------------|
| `StadiumEvacuationRouter` | Core BFS router with precomputed optimal paths |
| `CloudEvacuationController` | Cloud integration for real-time deployment |
| `optimal_stadium_evacuation` | Production function for multi-section evacuation |
| Van Andel Graph | Complete venue data with 40+ sections, 8 exits |

---

## 🏟️ Van Andel Arena Stats

- **Capacity**: 10,000+ (basketball configuration)
- **Permanent Seats**: 8,500
- **Luxury Suites**: 44
- **Club Seats**: 1,800
- **Exits**: 8 primary evacuation points
- **Sections**: 40+ in our graph model

---

## 💻 Usage Examples

### Basic Evacuation Routing

```python
from orchestrator import StadiumEvacuationRouter, VAN_ANDEL_ARENA, EXITS

router = StadiumEvacuationRouter(VAN_ANDEL_ARENA, EXITS)

# Get evacuation route for Section 107
route = router.get_evacuation_route('section_107')
print(f"Route: {' → '.join(route)}")
# Output: section_107 → concourse_d → exit_d
```

### Full Arena Evacuation

```python
# Estimate total evacuation time
time_seconds = router.estimate_evacuation_time(
    people_per_section=150,
    walk_speed=30
)
print(f"Time: {int(time_seconds // 60)}m {int(time_seconds % 60)}s")
# Output: Time: 3m 45s
```

### Cloud Deployment

```python
from orchestrator import CloudEvacuationController

controller = CloudEvacuationController(router, "https://arena-api.vanandel.com")

# Deploy evacuation protocol
success = controller.deploy_evacuation_protocol(
    auth_token="YOUR_API_TOKEN",
    priority="EMERGENCY"
)

# Trigger evacuation for specific sections
routes = controller.trigger_evacuation(['section_107', 'section_108'])
```

---

## 📊 Algorithm Showdown

| Scenario | DFS | BFS | Why BFS Wins |
|----------|-----|-----|--------------|
| Single exit, maze | ✅ Works | ✅ Works | Tie |
| **Multiple exits** | ⚠️ Bottleneck | ✅ Balanced | **Load distribution** |
| **Shortest path** | ❌ Not guaranteed | ✅ Optimal | **Level-by-level** |
| **Emergency response** | ⚠️ Slow | ✅ Fast | **Precomputable** |
| Memory usage | ✅ O(h) | ⚠️ O(w) | DFS advantage |

---

## 🎯 Your Mission

1. **Clone** this repo
2. **Run** the demo: `python3 orchestrator.py`
3. **Customize** for your venue's layout
4. **Deploy** for your local stadium/arena

---

## 🌟 Venues Ready for Integration

- **Van Andel Arena** (Grand Rapids): Basketball, concerts
- **Joe Louis Arena** (Detroit): Hockey, events
- **Little Caesars Arena** (Detroit): Multi-sport
- **Crisler Center** (Ann Arbor): College basketball
- **Breslin Center** (East Lansing): College sports

---

## 📈 Performance Metrics

From the Operation: Court Clear deployment:

| Metric | Before (DFS) | After (BFS) | Improvement |
|--------|--------------|-------------|-------------|
| Evacuation time | 6m 20s | 3m 45s | **41% faster** |
| Exit utilization | 80% through 2 exits | 100% across 8 exits | **Balanced load** |
| Bottleneck congestion | 80% | 12% | **85% reduction** |
| Route computation | O(V) per query | O(1) after precompute | **Instant** |

---

## 🧠 Key Insights

> "DFS is like following one corridor until you hit a wall. BFS scans all paths simultaneously and picks the shortest."
> — Priya Okoye, Operation Court Clear

---

## 📚 Learn More

Read the full thought experiment at [AutoNateAI](https://autonateai.com) - Operation: Court Clear in the Students/Medium section.

---

## 🙏 Credits

**Characters**:
- Dr. Nate Chen - Cool handsome genius
- Maya Patel - Indian-American systems architect
- Priya Okoye - Filipino-American computer vision specialist

**Setting**: Van Andel Arena, Grand Rapids - Grand Rapids Rise vs Chicago Sky

**Algorithm**: BFS for shortest-path evacuation

---

## 🚨 Mission Status

✅ **COMPLETE** - Van Andel Arena evacuation optimized.

---

*Built with ❤️ for deep thinkers and safety engineers everywhere.*
