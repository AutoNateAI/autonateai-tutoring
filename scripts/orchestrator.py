from collections import deque, defaultdict
from typing import List

class AgentOrchestrator:
    def __init__(self, num_agents: int):
        self.num_agents = num_agents
        # Adjacency list: agent -> list of dependent agents
        self.graph = defaultdict(list)
        # In-degree array: index is agent ID, value is count of prerequisites
        self.in_degree = [0] * num_agents

    def add_dependency(self, prereq_agent: int, dependent_agent: int):
        """
        Registers that 'dependent_agent' requires 'prereq_agent' to finish first.
        """
        self.graph[prereq_agent].append(dependent_agent)
        self.in_degree[dependent_agent] += 1

    def resolve_deadlock(self) -> List[int]:
        """
        Returns a valid execution order using Kahn's Algorithm. 
        If a deadlock (cycle) exists, return an empty list.
        """
        # TODO: Implement Kahn's Algorithm
        # 1. Initialize queue with agents having in-degree 0
        # 2. Process queue, decrementing in-degrees of neighbors
        # 3. If processed count < num_agents, a cycle exists.
        return []

# --- EXTENDED MISSION LOGIC ---
class SupplyChainNetwork:
    def trigger_agents(self, execution_order: List[int]):
        """
        Execute the agents in the resolved order.
        """
        for agent_id in execution_order:
            print(f"[ACTION]: Agent {agent_id} initialized. Routing silicon...")
