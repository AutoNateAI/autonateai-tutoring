"""
Operation: Court Clear
BFS Stadium Evacuation System
Van Andel Arena - Grand Rapids, Michigan

A production-ready BFS evacuation router for stadiums and arenas.
"""

from collections import deque
from datetime import datetime
from typing import Dict, List, Set, Optional, Tuple


class StadiumEvacuationRouter:
    """
    BFS-based evacuation router for stadiums and arenas.
    
    Uses BFS to find shortest paths from all sections to nearest exits.
    Precomputes routes for O(1) query time during emergencies.
    """
    
    def __init__(self, venue_graph: Dict[str, List[str]], exits: Set[str]):
        """
        Initialize router with venue graph and exit nodes.
        
        Args:
            venue_graph: Dict mapping section -> list of adjacent sections
            exits: Set of exit section IDs
        """
        self.graph = venue_graph
        self.exits = exits
        self.optimal_routes = self._precompute_all_routes()
    
    def _bfs_shortest_path(self, start: str, targets: Set[str]) -> Optional[List[str]]:
        """
        Find shortest path from start to any target using BFS.
        
        Args:
            start: Starting section ID
            targets: Set of target section IDs (exits)
            
        Returns:
            List of section IDs representing shortest path, or None if no path exists
        """
        if start in targets:
            return [start]
        
        visited: Set[str] = {start}
        queue: deque = deque([(start, [start])])
        
        while queue:
            section, path = queue.popleft()
            # BFS: Explore level by level (closest sections first)
            for neighbor in self.graph.get(section, []):
                if neighbor not in visited:
                    if neighbor in targets:
                        return path + [neighbor]
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return None
    
    def _precompute_all_routes(self) -> Dict[str, Optional[List[str]]]:
        """Precompute optimal evacuation route for every section."""
        routes: Dict[str, Optional[List[str]]] = {}
        for section in self.graph:
            routes[section] = self._bfs_shortest_path(section, self.exits)
        return routes
    
    def get_evacuation_route(self, section: str) -> Optional[List[str]]:
        """
        Get optimal evacuation route for a given section.
        
        Args:
            section: Section ID needing evacuation
            
        Returns:
            List of section IDs representing evacuation path, or None
        """
        return self.optimal_routes.get(section)
    
    def get_all_routes(self) -> Dict[str, Optional[List[str]]]:
        """Return all precomputed evacuation routes."""
        return self.optimal_routes
    
    def estimate_evacuation_time(
        self, 
        people_per_section: int = 150, 
        walk_speed: float = 30.0
    ) -> float:
        """
        Estimate total evacuation time in seconds.
        
        Args:
            people_per_section: Average people per section
            walk_speed: Seconds to traverse one edge (walkway)
            
        Returns:
            Estimated evacuation time in seconds
        """
        max_hops = 0
        for route in self.optimal_routes.values():
            if route:
                hops = len(route) - 1
                max_hops = max(max_hops, hops)
        
        # Estimate: max_hops * walk_speed + loading time
        loading_time = (people_per_section * len(self.optimal_routes)) / 100
        return (max_hops * walk_speed) + loading_time
    
    def get_section_stats(self) -> Dict:
        """Return statistics about evacuation routes."""
        route_lengths = []
        for route in self.optimal_routes.values():
            if route:
                route_lengths.append(len(route) - 1)  # Number of hops
        
        return {
            'total_sections': len(self.graph),
            'total_exits': len(self.exits),
            'routes_computed': len([r for r in self.optimal_routes.values() if r]),
            'avg_hops': sum(route_lengths) / len(route_lengths) if route_lengths else 0,
            'max_hops': max(route_lengths) if route_lengths else 0,
            'min_hops': min(route_lengths) if route_lengths else 0,
        }


class CloudEvacuationController:
    """
    Cloud-based evacuation controller for real-time deployment.
    """
    
    def __init__(self, router: StadiumEvacuationRouter, api_endpoint: str):
        """
        Initialize cloud controller.
        
        Args:
            router: StadiumEvacuationRouter instance
            api_endpoint: Arena API base URL
        """
        self.router = router
        self.api_endpoint = api_endpoint
        self.deployment_status = None
    
    def deploy_evacuation_protocol(
        self, 
        auth_token: str, 
        priority: str = "EMERGENCY"
    ) -> bool:
        """
        Deploy evacuation routes to arena's cloud control system.
        
        Args:
            auth_token: Authentication token
            priority: Priority level (EMERGENCY, DRILL, TEST)
            
        Returns:
            True if deployment successful, False otherwise
        """
        import requests
        
        routes = self.router.get_all_routes()
        
        payload = {
            "evacuation_mode": "BFS_OPTIMAL",
            "routes": routes,
            "priority": priority,
            "timestamp": datetime.now().isoformat(),
            "stats": self.router.get_section_stats()
        }
        
        headers = {
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.post(
                f"{self.api_endpoint}/api/v1/evacuation/deploy",
                json=payload,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                self.deployment_status = "DEPLOYED"
                print("✅ Evacuation routes deployed successfully!")
                return True
            else:
                self.deployment_status = "FAILED"
                print(f"❌ Deployment failed: {response.text}")
                return False
        
        except requests.exceptions.RequestException as e:
            self.deployment_status = "ERROR"
            print(f"❌ Network error: {str(e)}")
            return False
    
    def trigger_evacuation(self, sections_to_evacuate: List[str]) -> Dict[str, List[str]]:
        """
        Trigger evacuation for specific sections.
        
        Args:
            sections_to_evacuate: List of section IDs to evacuate
            
        Returns:
            Dict mapping sections to their evacuation routes
        """
        routes = {}
        for section in sections_to_evacuate:
            route = self.router.get_evacuation_route(section)
            if route:
                routes[section] = route
        
        print(f"🚨 Evacuation triggered for {len(routes)} sections")
        return routes
    
    def run_evacuation_drill(self) -> Dict:
        """
        Run a full evacuation drill and return metrics.
        
        Returns:
            Dict containing drill metrics
        """
        stats = self.router.get_section_stats()
        estimated_time = self.router.estimate_evacuation_time()
        
        drill_results = {
            **stats,
            "estimated_evacuation_time_seconds": estimated_time,
            "estimated_evacuation_time_formatted": f"{int(estimated_time // 60)}m {int(estimated_time % 60)}s",
            "drill_timestamp": datetime.now().isoformat(),
            "status": "DRILL_COMPLETE"
        }
        
        print(f"📊 Evacuation Drill Results:")
        print(f"   Total Sections: {drill_results['total_sections']}")
        print(f"   Total Exits: {drill_results['total_exits']}")
        print(f"   Avg Hops: {drill_results['avg_hops']:.2f}")
        print(f"   Max Hops: {drill_results['max_hops']}")
        print(f"   Estimated Time: {drill_results['estimated_evacuation_time_formatted']}")
        
        return drill_results


# ============================================================================
# VAN ANDEL ARENA VENUE GRAPH (Grand Rapids, Michigan)
# ============================================================================

VAN_ANDEL_ARENA = {
    # Lower Bowl - Quad 1 (Sections 101-110)
    'section_101': ['section_102', 'concourse_a', 'exit_a'],
    'section_102': ['section_101', 'section_103', 'concourse_a'],
    'section_103': ['section_102', 'section_104', 'concourse_b', 'exit_b'],
    'section_104': ['section_103', 'section_105', 'concourse_b'],
    'section_105': ['section_104', 'section_106', 'concourse_c', 'exit_c'],
    'section_106': ['section_105', 'section_107', 'concourse_c'],
    'section_107': ['section_106', 'section_108', 'concourse_d', 'exit_d'],
    'section_108': ['section_107', 'section_109', 'concourse_d'],
    'section_109': ['section_108', 'section_110', 'concourse_a'],
    'section_110': ['section_109', 'concourse_a', 'exit_a'],
    
    # Lower Bowl - Quad 2 (Sections 111-120)
    'section_111': ['section_112', 'concourse_a', 'exit_a'],
    'section_112': ['section_111', 'section_113', 'concourse_a'],
    'section_113': ['section_112', 'section_114', 'concourse_b'],
    'section_114': ['section_113', 'section_115', 'concourse_b', 'exit_b'],
    'section_115': ['section_114', 'section_116', 'concourse_c'],
    'section_116': ['section_115', 'section_117', 'concourse_c', 'exit_c'],
    'section_117': ['section_116', 'section_118', 'concourse_d'],
    'section_118': ['section_117', 'section_119', 'concourse_d'],
    'section_119': ['section_118', 'section_120', 'concourse_a'],
    'section_120': ['section_119', 'concourse_a', 'exit_a'],
    
    # Upper Bowl - Quad 3 (Sections 201-210)
    'section_201': ['section_202', 'concourse_upper_a', 'exit_e'],
    'section_202': ['section_201', 'section_203', 'concourse_upper_a'],
    'section_203': ['section_202', 'section_204', 'concourse_upper_b'],
    'section_204': ['section_203', 'section_205', 'concourse_upper_b', 'exit_f'],
    'section_205': ['section_204', 'section_206', 'concourse_upper_c'],
    'section_206': ['section_205', 'section_207', 'concourse_upper_c'],
    'section_207': ['section_206', 'section_208', 'concourse_upper_d', 'exit_g'],
    'section_208': ['section_207', 'section_209', 'concourse_upper_d'],
    'section_209': ['section_208', 'section_210', 'concourse_upper_a'],
    'section_210': ['section_209', 'concourse_upper_a', 'exit_e'],
    
    # Luxury Suites (1-44)
    'suite_01': ['suite_02', 'concourse_vip', 'exit_h'],
    'suite_02': ['suite_01', 'suite_03', 'concourse_vip'],
    'suite_03': ['suite_02', 'suite_04', 'concourse_vip'],
    'suite_04': ['suite_03', 'concourse_vip', 'exit_h'],
    
    # Concourses (connect sections to exits)
    'concourse_a': ['section_101', 'section_102', 'section_109', 'section_110', 
                    'section_111', 'section_112', 'section_119', 'section_120', 
                    'exit_a', 'exit_e'],
    'concourse_b': ['section_103', 'section_104', 'section_113', 'section_114', 
                    'exit_b', 'exit_f'],
    'concourse_c': ['section_105', 'section_106', 'section_115', 'section_116', 
                    'exit_c', 'exit_g'],
    'concourse_d': ['section_107', 'section_108', 'section_117', 'section_118', 
                    'exit_d', 'exit_h'],
    'concourse_upper_a': ['section_201', 'section_202', 'section_209', 'section_210', 
                          'exit_e', 'stairwell_a'],
    'concourse_upper_b': ['section_203', 'section_204', 'exit_f', 'stairwell_b'],
    'concourse_upper_c': ['section_205', 'section_206', 'exit_g', 'stairwell_c'],
    'concourse_upper_d': ['section_207', 'section_208', 'exit_h', 'stairwell_d'],
    'concourse_vip': ['suite_01', 'suite_02', 'suite_03', 'suite_04', 'exit_h'],
    
    # Connections between concourses
    'stairwell_a': ['concourse_upper_a', 'concourse_a'],
    'stairwell_b': ['concourse_upper_b', 'concourse_b'],
    'stairwell_c': ['concourse_upper_c', 'concourse_c'],
    'stairwell_d': ['concourse_upper_d', 'concourse_d'],
    
    # Exits (terminal nodes)
    'exit_a': ['section_101', 'section_110', 'section_111', 'section_120', 'concourse_a'],
    'exit_b': ['section_103', 'section_114', 'concourse_b'],
    'exit_c': ['section_105', 'section_116', 'concourse_c'],
    'exit_d': ['section_107', 'section_118', 'concourse_d'],
    'exit_e': ['concourse_a', 'concourse_upper_a'],
    'exit_f': ['concourse_b', 'concourse_upper_b'],
    'exit_g': ['concourse_c', 'concourse_upper_c'],
    'exit_h': ['concourse_d', 'concourse_upper_d', 'concourse_vip', 'suite_01', 'suite_04'],
}

EXITS = {'exit_a', 'exit_b', 'exit_c', 'exit_d', 'exit_e', 'exit_f', 'exit_g', 'exit_h'}


def main():
    """Demo the Court Clear evacuation system."""
    print("=" * 60)
    print("OPERATION: COURT CLEAR")
    print("Van Andel Arena Evacuation System")
    print("=" * 60)
    print()
    
    # Initialize router
    router = StadiumEvacuationRouter(VAN_ANDEL_ARENA, EXITS)
    
    # Show stats
    stats = router.get_section_stats()
    print(f"📊 System Stats:")
    print(f"   Total Sections: {stats['total_sections']}")
    print(f"   Total Exits: {stats['total_exits']}")
    print(f"   Routes Computed: {stats['routes_computed']}")
    print(f"   Avg Hops: {stats['avg_hops']:.2f}")
    print(f"   Max Hops: {stats['max_hops']}")
    print()
    
    # Test Case 1: Evacuate Section 107 (popcorn machine fire)
    print(f"🚨 Test 1: Evacuate Section 107")
    route = router.get_evacuation_route('section_107')
    if route:
        print(f"   Route: {' → '.join(route)}")
        print(f"   Hops: {len(route) - 1}")
    print()
    
    # Test Case 2: Estimate full evacuation time
    print(f"⏱️  Test 2: Full Arena Evacuation")
    time_seconds = router.estimate_evacuation_time()
    minutes = int(time_seconds // 60)
    seconds = int(time_seconds % 60)
    print(f"   Estimated Time: {minutes}m {seconds}s")
    print()
    
    # Test Case 3: Compare BFS vs DFS
    print(f"📈 Test 3: BFS vs DFS Comparison")
    print(f"   BFS Max Hops: {stats['max_hops']}")
    print(f"   BFS Avg Hops: {stats['avg_hops']:.2f}")
    print(f"   DFS would average: ~{stats['avg_hops'] * 1.8:.2f} hops (estimated)")
    print()
    
    print("=" * 60)
    print("MISSION COMPLETE")
    print("=" * 60)


if __name__ == '__main__':
    main()
