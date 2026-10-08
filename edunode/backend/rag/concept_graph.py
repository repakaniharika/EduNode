import json
import logging
from typing import List, Dict, Any, Optional
from edunode.backend.rag.schemas import ConceptDetails, ConceptMatch
from edunode.backend.rag.embeddings import embed_text
from edunode.backend.rag.config import CONCEPT_SIMILARITY_THRESHOLD, MAX_CONCEPTS_PER_CHUNK
import numpy as np

logger = logging.getLogger(__name__)

class ConceptGraph:
    def __init__(self):
        self.concepts: Dict[str, Dict[str, Any]] = {}
        self.relationships: List[Dict[str, str]] = []
        self.concept_embeddings: Dict[str, np.ndarray] = {}
        
    def load_from_json(self, file_path: str):
        with open(file_path, "r", encoding="utf-8") as graph_file:
            data = json.load(graph_file)
        if not isinstance(data, dict):
            raise ValueError("Concept graph must be a JSON object.")

        concepts = data.get("concepts", [])
        relationships = data.get("relationships", [])
        if not isinstance(concepts, list) or not isinstance(relationships, list):
            raise ValueError("Concept graph concepts and relationships must be arrays.")

        loaded_concepts = {}
        for concept in concepts:
            if not isinstance(concept, dict) or not isinstance(concept.get("concept_id"), str):
                raise ValueError("Every concept must have a string concept_id.")
            concept_id = concept["concept_id"]
            if concept_id in loaded_concepts:
                raise ValueError(f"Duplicate concept_id in concept graph: {concept_id}")
            loaded_concepts[concept_id] = concept

        for relationship in relationships:
            if (
                not isinstance(relationship, dict)
                or not all(
                    isinstance(relationship.get(key), str)
                    for key in ("source", "target", "relation")
                )
            ):
                raise ValueError(
                    "Every concept relationship needs string source, target, and relation fields."
                )

        self.concepts = loaded_concepts
        self.relationships = relationships
        self.concept_embeddings = {}
        self._compute_embeddings()
        logger.info(
            "Loaded %s concepts and %s relationships from %s",
            len(self.concepts),
            len(self.relationships),
            file_path,
        )

    def _compute_embeddings(self):
        logger.info("Computing embeddings for concept graph matching...")
        for cid, concept in self.concepts.items():
            text_to_embed = f"{concept.get('name', '')}. {concept.get('description', '')}"
            self.concept_embeddings[cid] = embed_text(text_to_embed)

    def get_concept_details(self, concept_id: str) -> Optional[ConceptDetails]:
        if concept_id not in self.concepts:
            return None
            
        concept = self.concepts[concept_id]
        prereqs, dependents, related = [], [], []
        
        for r in self.relationships:
            if r["target"] == concept_id and r["relation"] == "prerequisite_for":
                prereqs.append(r["source"])
            if r["source"] == concept_id and r["relation"] == "prerequisite_for":
                dependents.append(r["target"])
            if r["relation"] == "related_to":
                if r["source"] == concept_id:
                    related.append(r["target"])
                elif r["target"] == concept_id:
                    related.append(r["source"])
                    
        return ConceptDetails(
            concept_id=concept_id,
            name=concept.get("name", ""),
            prerequisites=list(set(prereqs)),
            dependents=list(set(dependents)),
            related=list(set(related))
        )

    def map_query_to_concepts(
        self,
        query: str,
        top_k: int = 3,
        board: Optional[str] = None,
        grade: Optional[int] = None,
        subject: Optional[str] = None,
    ) -> List[ConceptMatch]:
        if not self.concept_embeddings:
            return []
            
        query_emb = embed_text(query)
        return self.get_concepts_for_embedding(
            query_emb,
            max_concepts=top_k,
            board=board,
            grade=grade,
            subject=subject,
        )

    def get_concepts_for_embedding(
        self,
        embedding: np.ndarray,
        max_concepts: int = MAX_CONCEPTS_PER_CHUNK,
        board: Optional[str] = None,
        grade: Optional[int] = None,
        subject: Optional[str] = None,
    ) -> List[ConceptMatch]:
        """Calculates semantic similarity of an embedding against the concept graph."""
        matches = []
        for cid, emb in self.concept_embeddings.items():
            if any(value is not None for value in (board, grade, subject)):
                mappings = self.concepts[cid].get("curriculum_mappings", [])
                if not any(
                    (board is None or str(mapping.get("board", "")).casefold() == board.casefold())
                    and (grade is None or mapping.get("grade") == grade)
                    and (
                        subject is None
                        or str(mapping.get("subject", "")).casefold() == subject.casefold()
                    )
                    for mapping in mappings
                ):
                    continue

            score = float(np.dot(embedding, emb))
            if score >= CONCEPT_SIMILARITY_THRESHOLD:
                c_name = self.concepts[cid].get("name", cid)
                matches.append(ConceptMatch(concept_id=cid, name=c_name, score=score))
                
        matches.sort(key=lambda x: x.score, reverse=True)
        return matches[:max_concepts]

concept_graph = ConceptGraph()
