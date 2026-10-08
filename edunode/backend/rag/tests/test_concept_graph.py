from edunode.backend.rag.concept_graph import ConceptGraph
import pytest
import os

def test_concept_graph_loading(tmp_path):
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
