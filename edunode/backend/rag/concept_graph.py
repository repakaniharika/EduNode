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
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            for c in data.get("concepts", []):
                cid = c.get("concept_id")
                if cid:
                    self.concepts[cid] = c
                    
            for r in data.get("relationships", []):
                self.relationships.append(r)
                
            logger.info(f"Loaded {len(self.concepts)} concepts and {len(self.relationships)} relationships from {file_path}")
            self._compute_embeddings()
            
        except Exception as e:
            logger.error(f"Failed to load concept graph from {file_path}: {e}")

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

    def map_query_to_concepts(self, query: str, top_k: int = 3, board: str = None, grade: int = None, subject: str = None) -> List[ConceptMatch]:
        if not self.concept_embeddings:
            return []
            
        query_emb = embed_text(query)
        return self.get_concepts_for_embedding(query_emb, max_concepts=top_k)

    def get_concepts_for_embedding(self, embedding: np.ndarray, max_concepts: int = MAX_CONCEPTS_PER_CHUNK) -> List[ConceptMatch]:
        """Calculates semantic similarity of an embedding against the concept graph."""
        matches = []
        for cid, emb in self.concept_embeddings.items():
            score = float(np.dot(embedding, emb))
            if score >= CONCEPT_SIMILARITY_THRESHOLD:
                c_name = self.concepts[cid].get("name", cid)
                matches.append(ConceptMatch(concept_id=cid, name=c_name, score=score))
                
        matches.sort(key=lambda x: x.score, reverse=True)
        return matches[:max_concepts]

concept_graph = ConceptGraph()
