"""
Knowledge Graph Intelligence
Member 2: Harini (AI / Gemma)

Represents curriculum concepts as a Directed Acyclic Graph (DAG) of prerequisite relations.
Supports tracing foundational gaps and generating visualization data for the dashboard.
"""

from typing import List, Dict, Optional, Any
from .schemas import (
    KnowledgeGraphNode,
    KnowledgeGraphEdge,
    KnowledgeGraphResponse,
)


# Default prerequisite sequence for Algebra curriculum
DEFAULT_ALGEBRA_NODES = [
    {
        "id": "variables",
        "label": "Variables & Constants",
        "description": "Understanding symbols as placeholders for unknown or varying numbers.",
    },
    {
        "id": "expressions",
        "label": "Algebraic Expressions",
        "description": "Forming and simplifying combinations of variables, numbers, and operations.",
    },
    {
        "id": "linear_equations",
        "label": "Linear Equations",
        "description": "Solving single-variable equations expressing equality between expressions.",
    },
    {
        "id": "quadratic_equations",
        "label": "Quadratic Equations",
        "description": "Solving second-degree polynomial equations and understanding parabolas.",
    },
]

# Prerequisite dependencies: Variables -> Expressions -> Linear Equations -> Quadratic Equations
DEFAULT_ALGEBRA_EDGES = [
    {"source": "variables", "target": "expressions", "relation": "prerequisite"},
    {"source": "expressions", "target": "linear_equations", "relation": "prerequisite"},
    {"source": "linear_equations", "target": "quadratic_equations", "relation": "prerequisite"},
]


class KnowledgeGraph:
    """Manages curriculum concept nodes, prerequisite chains, and student state overlay."""

    def __init__(
        self,
        nodes: Optional[List[Dict[str, str]]] = None,
        edges: Optional[List[Dict[str, str]]] = None,
    ):
        self._raw_nodes = nodes or DEFAULT_ALGEBRA_NODES
        self._raw_edges = edges or DEFAULT_ALGEBRA_EDGES

    def get_prerequisites(self, topic_id: str) -> List[str]:
        """Returns the immediate prerequisite topic IDs for a given topic."""
        return [
            edge["source"]
            for edge in self._raw_edges
            if edge["target"] == topic_id and edge.get("relation") == "prerequisite"
        ]

    def get_dependents(self, topic_id: str) -> List[str]:
        """Returns topics that depend on the given topic."""
        return [
            edge["target"]
            for edge in self._raw_edges
            if edge["source"] == topic_id and edge.get("relation") == "prerequisite"
        ]

    def build_graph_response(
        self,
        student_id: str,
        student_mastery_map: Optional[Dict[str, float]] = None,
        active_misconceptions: Optional[List[Dict[str, Any]]] = None,
    ) -> KnowledgeGraphResponse:
        """Constructs the full graph payload for frontend visualization (Pavitra's dashboard).
        
        Evaluates node statuses based on mastery scores:
          - 'mastered': mastery >= 0.80
          - 'learning': 0.50 <= mastery < 0.80
          - 'struggling': 0.0 < mastery < 0.50
          - 'ready': prerequisites met, not started yet
          - 'locked': prerequisites not yet satisfied
        """
        mastery_map = student_mastery_map or {}
        nodes: List[KnowledgeGraphNode] = []

        for node_def in self._raw_nodes:
            topic_id = node_def["id"]
            mastery = mastery_map.get(topic_id, 0.0)

            # Determine readiness from prerequisites
            prereqs = self.get_prerequisites(topic_id)
            prereqs_satisfied = all(mastery_map.get(p, 0.0) >= 0.70 for p in prereqs)

            if mastery >= 0.80:
                status = "mastered"
            elif mastery >= 0.50:
                status = "learning"
            elif mastery > 0.0:
                status = "struggling"
            elif prereqs_satisfied:
                status = "ready"
            else:
                status = "locked"

            nodes.append(
                KnowledgeGraphNode(
                    id=topic_id,
                    label=node_def["label"],
                    description=node_def.get("description"),
                    mastery=mastery,
                    status=status,
                )
            )

        edges: List[KnowledgeGraphEdge] = [
            KnowledgeGraphEdge(
                source=edge["source"],
                target=edge["target"],
                relation=edge.get("relation", "prerequisite"),
            )
            for edge in self._raw_edges
        ]

        return KnowledgeGraphResponse(
            student_id=student_id,
            nodes=nodes,
            edges=edges,
            active_misconceptions=active_misconceptions or [],
        )
