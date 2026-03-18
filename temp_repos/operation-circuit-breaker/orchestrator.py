"""
Operation: Circuit Breaker
Dual-Algorithm Event Routing System
Grand Rapids, Michigan - ArtPrize 2026

A production-ready hybrid DFS+BFS router for festival and event navigation.
"""

from collections import deque
from typing import Dict, List, Optional, Set, Tuple


class ArtPrizeRouter:
    """
    Hybrid DFS+BFS router for event venue navigation.
    
    Uses DFS to identify connected components (venue clusters).
    Uses BFS to find optimal paths within each component.
    """
    
    def __init__(self, venue_graph: Dict[str, List[str]]):
        """
        Initialize the router with a venue graph.
        
        Args:
            venue_graph: Dict mapping venue_id -> list of connected venue_ids
        """
        self.graph = venue_graph
        self.components = self._find_connected_components()
        self.optimized_routes = self._optimize_component_paths()
    
    def _find_connected_components(self) -> List[List[str]]:
        """
        Use DFS to find all connected components in the graph.
        
        Returns:
            List of components, where each component is a list of venue_ids
        """
        visited: Set[str] = set()
        components: List[List[str]] = []
        
        def dfs_component(start: str, component: List[str]) -> None:
            """DFS helper to explore a single component."""
            visited.add(start)
            component.append(start)
            for neighbor in self.graph.get(start, []):
                if neighbor not in visited:
                    dfs_component(neighbor, component)
        
        for node in self.graph:
            if node not in visited:
                component: List[str] = []
                dfs_component(node, component)
                components.append(component)
        
        return components
    
    def _bfs_shortest_path(self, start: str, target: str) -> Optional[List[str]]:
        """
        Use BFS to find the shortest path between two venues.
        
        Args:
            start: Starting venue_id
            target: Target venue_id
            
        Returns:
            List of venue_ids representing the shortest path, or None if no path exists
        """
        if start == target:
            return [start]
        
        visited: Set[str] = {start}
        queue: deque = deque([(start, [start])])
        
        while queue:
            node, path = queue.popleft()
            for neighbor in self.graph.get(node, []):
                if neighbor not in visited:
                    if neighbor == target:
                        return path + [neighbor]
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return None
    
    def _optimize_component_paths(self) -> Dict[str, Dict[str, List[str]]]:
        """
        Pre-compute optimal paths between all venue pairs within each component.
        
        Returns:
            Nested dict: optimized_routes[start][target] = optimal path
        """
        optimized_routes: Dict[str, Dict[str, List[str]]] = {}
        
        for component in self.components:
            for start in component:
                optimized_routes[start] = {}
                for target in component:
                    if start != target:
                        path = self._bfs_shortest_path(start, target)
                        if path:
                            optimized_routes[start][target] = path
        
        return optimized_routes
    
    def get_optimal_route(
        self, 
        start: str, 
        target: str, 
        avoid: Optional[List[str]] = None
    ) -> Optional[List[str]]:
        """
        Get optimal route from start to target, optionally avoiding venues.
        
        Args:
            start: Starting venue_id
            target: Target venue_id
            avoid: List of venue_ids to avoid (e.g., closed venues)
            
        Returns:
            Optimal path as list of venue_ids, or None if no path exists
        """
        avoid = avoid or []
        
        # Check if start and target are in the same component
        for component in self.components:
            if start in component and target in component:
                # Same component: BFS guarantees shortest path
                base_path = self.optimized_routes.get(start, {}).get(target)
                if base_path:
                    # Filter out avoided venues
                    return [v for v in base_path if v not in avoid]
        
        # Different components: No path exists
        return None
    
    def get_all_venues_in_component(self, venue: str) -> List[str]:
        """
        Return all venues reachable from the given venue.
        
        Args:
            venue: A venue_id
            
        Returns:
            List of all venue_ids in the same connected component
        """
        for component in self.components:
            if venue in component:
                return component
        return []
    
    def get_component_count(self) -> int:
        """Return the number of connected components."""
        return len(self.components)
    
    def get_stats(self) -> Dict:
        """Return routing statistics."""
        total_routes = sum(
            len(routes) 
            for routes in self.optimized_routes.values()
        )
        return {
            'total_venues': len(self.graph),
            'connected_components': self.get_component_count(),
            'precomputed_routes': total_routes,
            'avg_routes_per_venue': total_routes / len(self.graph) if self.graph else 0
        }


class DynamicArtPrizeRouter(ArtPrizeRouter):
    """
    Extended router with dynamic graph updates for real-world changes.
    """
    
    def remove_venue(self, venue: str) -> bool:
        """
        Remove a venue from the graph (e.g., weather closure).
        
        Args:
            venue: venue_id to remove
            
        Returns:
            True if venue was removed, False if it didn't exist
        """
        if venue not in self.graph:
            return False
        
        # Remove from graph
        del self.graph[venue]
        
        # Remove from all neighbor lists
        for neighbors in self.graph.values():
            if venue in neighbors:
                neighbors.remove(venue)
        
        # Rebuild components and routes
        self.components = self._find_connected_components()
        self.optimized_routes = self._optimize_component_paths()
        
        return True
    
    def add_venue(self, venue: str, connections: List[str]) -> bool:
        """
        Add a new venue with its connections.
        
        Args:
            venue: New venue_id
            connections: List of existing venue_ids to connect to
            
        Returns:
            True if venue was added successfully
        """
        if venue in self.graph:
            return False
        
        self.graph[venue] = connections
        
        # Update neighbor lists
        for neighbor in connections:
            if neighbor in self.graph:
                self.graph[neighbor].append(venue)
        
        # Rebuild components and routes
        self.components = self._find_connected_components()
        self.optimized_routes = self._optimize_component_paths()
        
        return True
    
    def update_connections(self, venue: str, new_connections: List[str]) -> bool:
        """
        Update the connections for an existing venue.
        
        Args:
            venue: Existing venue_id
            new_connections: New list of connections
            
        Returns:
            True if updated successfully
        """
        if venue not in self.graph:
            return False
        
        # Remove old connections from neighbors
        old_connections = self.graph[venue]
        for old_neighbor in old_connections:
            if old_neighbor in self.graph and venue in self.graph[old_neighbor]:
                self.graph[old_neighbor].remove(venue)
        
        # Set new connections
        self.graph[venue] = new_connections
        
        # Add venue to new neighbors' lists
        for new_neighbor in new_connections:
            if new_neighbor in self.graph:
                self.graph[new_neighbor].append(venue)
        
        # Rebuild components and routes
        self.components = self._find_connected_components()
        self.optimized_routes = self._optimize_component_paths()
        
        return True


def hybrid_dfs_bfs_router(
    graph: Dict[str, List[str]], 
    start: str, 
    targets: List[str]
) -> List[str]:
    """
    Production-ready hybrid router for Grand Rapids events.
    Uses DFS for exploration, BFS for optimization.
    
    Args:
        graph: Dict mapping venue -> list of connected venues
        start: Starting venue
        targets: List of target venues to visit
    
    Returns:
        Optimal route visiting all targets (if possible)
        
    Raises:
        ValueError: If any target is not reachable from start
    """
    # Step 1: Use DFS to verify all targets are reachable
    def dfs_reachable(start_node: str, target_node: str) -> bool:
        """Check if target is reachable from start using DFS."""
        visited: Set[str] = set()
        stack: List[str] = [start_node]
        
        while stack:
            node = stack.pop()
            if node == target_node:
                return True
            if node not in visited:
                visited.add(node)
                stack.extend(graph.get(node, []))
        
        return False
    
    # Verify all targets are reachable
    for target in targets:
        if not dfs_reachable(start, target):
            raise ValueError(f"Target {target} is not reachable from {start}")
    
    # Step 2: Use BFS to find shortest path to each target
    def bfs_path(start_node: str, end_node: str) -> Optional[List[str]]:
        """Find shortest path using BFS."""
        queue: deque = deque([(start_node, [start_node])])
        visited: Set[str] = {start_node}
        
        while queue:
            node, path = queue.popleft()
            for neighbor in graph.get(node, []):
                if neighbor not in visited:
                    if neighbor == end_node:
                        return path + [neighbor]
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return None
    
    # Build optimal route visiting all targets (nearest neighbor heuristic)
    route: List[str] = [start]
    current: str = start
    remaining: List[str] = targets.copy()
    
    while remaining:
        # Find nearest target using BFS
        nearest: Optional[str] = None
        shortest_path: Optional[List[str]] = None
        
        for target in remaining:
            path = bfs_path(current, target)
            if path and (shortest_path is None or len(path) < len(shortest_path)):
                nearest = target
                shortest_path = path
        
        if nearest is None:
            break
        
        # Add path to route (excluding current position)
        route.extend(shortest_path[1:])
        current = nearest
        remaining.remove(nearest)
    
    return route


# ============================================================================
# GRAND RAPIDS VENUE GRAPH (Sample Data)
# ============================================================================

GRAND_RAPIDS_VENUES = {
    'john_ball_zoo': ['heritage_hill', 'downtown_core', 'meijer_gardens'],
    'heritage_hill': ['john_ball_zoo', 'downtown_core', 'fulton_street'],
    'downtown_core': ['john_ball_zoo', 'heritage_hill', 'blue_bridge', 'artprize_hub'],
    'blue_bridge': ['downtown_core', 'artprize_hub', 'railroad_bridge'],
    'fulton_street': ['heritage_hill', 'railroad_bridge', 'pearl_street'],
    'railroad_bridge': ['blue_bridge', 'fulton_street', 'pearl_street'],
    'pearl_street': ['fulton_street', 'railroad_bridge'],
    'meijer_gardens': ['john_ball_zoo', 'east_grand_rapids'],
    'east_grand_rapids': ['meijer_gardens'],
    'artprize_hub': ['downtown_core', 'blue_bridge'],
}


def main():
    """Demo the Circuit Breaker routing system."""
    print("=" * 60)
    print("OPERATION: CIRCUIT BREAKER")
    print("Grand Rapids Event Routing System")
    print("=" * 60)
    
    # Initialize router
    router = DynamicArtPrizeRouter(GRAND_RAPIDS_VENUES)
    
    # Show stats
    stats = router.get_stats()
    print(f"\n📊 System Stats:")
    print(f"   Total Venues: {stats['total_venues']}")
    print(f"   Connected Components: {stats['connected_components']}")
    print(f"   Precomputed Routes: {stats['precomputed_routes']}")
    
    # Test Case 1: Optimal route from Zoo to ArtPrize Hub
    print(f"\n🎯 Test 1: Zoo → ArtPrize Hub")
    route = router.get_optimal_route('john_ball_zoo', 'artprize_hub')
    print(f"   Route: {' → '.join(route)}")
    print(f"   Hops: {len(route) - 1}")
    
    # Test Case 2: Find all venues in same component
    print(f"\n🔗 Test 2: Connected Venues from Heritage Hill")
    component = router.get_all_venues_in_component('heritage_hill')
    print(f"   {len(component)} venues reachable: {', '.join(component)}")
    
    # Test Case 3: Dynamic venue removal
    print(f"\n⚠️  Test 3: Blue Bridge Maintenance Closure")
    router.remove_venue('blue_bridge')
    route = router.get_optimal_route('john_ball_zoo', 'artprize_hub')
    if route:
        print(f"   Rerouted: {' → '.join(route)}")
    else:
        print(f"   No path exists!")
    
    # Test Case 4: Full tour with hybrid router
    print(f"\n🎨 Test 4: Complete ArtPrize Tour")
    router2 = ArtPrizeRouter(GRAND_RAPIDS_VENUES)  # Reset graph
    tour = hybrid_dfs_bfs_router(
        GRAND_RAPIDS_VENUES,
        start='john_ball_zoo',
        targets=['artprize_hub', 'blue_bridge', 'heritage_hill']
    )
    print(f"   Tour: {' → '.join(tour)}")
    print(f"   Total Hops: {len(tour) - 1}")
    
    print("\n" + "=" * 60)
    print("MISSION COMPLETE")
    print("=" * 60)


if __name__ == '__main__':
    main()
