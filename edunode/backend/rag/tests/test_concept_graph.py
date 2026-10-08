from edunode.backend.rag.concept_graph import ConceptGraph
import pytest
import os
import numpy as np

def test_concept_graph_loading(tmp_path, monkeypatch):
    monkeypatch.setattr(
        "edunode.backend.rag.concept_graph.embed_text",
        lambda text: np.array([1.0, 0.0], dtype=np.float32),
    )
    graph_path = tmp_path / "concepts.json"
    with open(graph_path, "w", encoding="utf-8") as f:
        f.write('''
        {
          "concepts": [{"concept_id": "c1", "name": "Concept 1", "description": "desc"}],
          "relationships": [{"source": "c1", "target": "c2", "relation": "prerequisite_for"}]
        }
        ''')
        
    cg = ConceptGraph()
    cg.load_from_json(str(graph_path))
    
    assert "c1" in cg.concepts
    assert len(cg.relationships) == 1
    
    details = cg.get_concept_details("c1")
    assert "c2" in details.dependents
    matches = cg.get_concepts_for_embedding(np.array([1.0, 0.0], dtype=np.float32))
    assert matches[0].concept_id == "c1"


def test_concept_graph_rejects_invalid_relationship(tmp_path):
    graph_path = tmp_path / "invalid_concepts.json"
    graph_path.write_text(
        '{"concepts": [], "relationships": [{"source": "c1"}]}',
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match="relationship"):
        ConceptGraph().load_from_json(str(graph_path))


def test_query_concept_mapping_respects_curriculum(tmp_path, monkeypatch):
    monkeypatch.setattr(
        "edunode.backend.rag.concept_graph.embed_text",
        lambda _text: np.array([1.0, 0.0], dtype=np.float32),
    )
    graph_path = tmp_path / "curriculum_concepts.json"
    graph_path.write_text(
        """
        {
          "concepts": [
            {
              "concept_id": "linear_equations",
              "name": "Linear Equations",
              "description": "Solving equations",
              "curriculum_mappings": [
                {"board": "kerala", "grade": 8, "subject": "mathematics", "chapter": "Equations"}
              ]
            },
            {
              "concept_id": "quadratic_equations",
              "name": "Quadratic Equations",
              "description": "Second-degree equations",
              "curriculum_mappings": [
                {"board": "cbse", "grade": 10, "subject": "mathematics", "chapter": "Quadratics"}
              ]
            }
          ],
          "relationships": []
        }
        """,
        encoding="utf-8",
    )

    graph = ConceptGraph()
    graph.load_from_json(str(graph_path))

    matches = graph.map_query_to_concepts(
        "equations",
        board="kerala",
        grade=8,
        subject="mathematics",
    )

    assert [match.concept_id for match in matches] == ["linear_equations"]
