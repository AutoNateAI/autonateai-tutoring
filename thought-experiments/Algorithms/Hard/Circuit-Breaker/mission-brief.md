# Operation: Circuit Breaker
Starter rig for optimal event routing using Hybrid DFS+BFS algorithms.

## The Mission
Build a dual-algorithm routing system that:
1. Uses **DFS** to explore connected components (venue clusters)
2. Uses **BFS** to find shortest paths within components
3. Handles **dynamic updates** (venue closures, new installations)

## Grand Rapids Testbed
- **ArtPrize** (September): 200+ venues across downtown
- **Lantern Festival** (April-June): John Ball Zoo
- **World of Winter** (January): Ice sculpture tours
- **Butterflies Are Blooming** (March): Frederik Meijer Gardens

## Algorithm Showdown

| Scenario | DFS | BFS |
|----------|-----|-----|
| Find any path | ✅ Fast | ⚠️ Overkill |
| Find shortest path | ⚠️ Not guaranteed | ✅ Optimal |
| Memory usage | O(h) - height | O(w) - width |
| Connected components | ✅ Elegant | ⚠️ Awkward |
| Level-order processing | ⚠️ No | ✅ Natural |

## Your Starter Code
See `index.mdx` for the complete implementation including:
- `ArtPrizeRouter` class
- `DynamicArtPrizeRouter` with live updates
- `hybrid_dfs_bfs_router` production function

## Next Steps
1. Clone the starter repo (or copy from `index.mdx`)
2. Run simulations on your city's venue graph
3. Optimize for your specific constraints (time, distance, capacity)
4. Deploy for your local events

**Remember**: DFS gives you courage to explore deep. BFS gives you wisdom to find what's closest. Together, they see the forest *and* the trees.
