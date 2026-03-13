---
sidebar_position: 1
---

# The Topology of Success: DAG Mastery

Can you treat your career as a **Directed Acyclic Graph (DAG)**?

## The Conceptual Problem

Most people see their career as a linear path. But a career is actually a graph of prerequisites and outcomes. To reach the node of "Senior Software Engineer," you must traverse through several prerequisite nodes like "Data Structures," "Operating Systems," and "Production-Level Projects."

### The Challenge

Your task is to implement an algorithm that identifies the longest path (most mastery-dense) in a given career DAG.

1. **Clone the Repo:** `https://github.com/AutoNateAI/challenge-dag-mastery`
2. **Analyze the Mermaid Design:**
   ```mermaid
   graph TD
       A[Discrete Math] --> B[Data Structures]
       B --> C[Algorithms]
       C --> D[System Design]
       D --> E[Senior Engineer]
       B --> F[Backend Engineering]
       F --> D
   ```
3. **Submit Your PR:** Your implementation must handle cycles (it should fail if not a DAG) and provide the optimal path of mastery.

---

### Need a Deep Dive?
If you're stuck on the graph theory behind this experiment, [book a 1:1 session](/booking) and we'll break it down from first principles.
