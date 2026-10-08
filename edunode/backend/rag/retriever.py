import logging
from typing import List, Dict, Any, Optional
from edunode.backend.rag.embeddings import embed_text
from edunode.backend.rag.vector_store import vector_store
from edunode.backend.rag.schemas import (
    RetrievalRequest, 
    RetrievalResult, 
    RetrievalResponse,
    ConceptMatch
)
from edunode.backend.rag.config import DEFAULT_TOP_K
from collections import defaultdict

logger = logging.getLogger(__name__)

def filter_results(results: List[Tuple[Dict[str, Any], float]], req: RetrievalRequest) -> List[Tuple[Dict[str, Any], float]]:
    filtered = []
    for meta, score in results:
        # If filter is provided, check for match (case insensitive if possible)
        if req.grade and meta.get("grade") and str(req.grade).lower() != str(meta.get("grade")).lower():
            continue
        if req.subject and meta.get("subject") and str(req.subject).lower() != str(meta.get("subject")).lower():
            continue
        if req.curriculum and meta.get("curriculum") and str(req.curriculum).lower() != str(meta.get("curriculum")).lower():
            continue
            
        filtered.append((meta, score))
    return filtered

def build_context(results: List[RetrievalResult]) -> str:
    """
    Builds a clean text block that converts retrieved results into context for Gemma.
    """
    if not results:
        return "No relevant curriculum context found."

    context_parts = []
    for i, res in enumerate(results, 1):
        source_header = f"SOURCE {i}\n"
        source_header += f"Document: {res.document}\n"
        if res.chapter:
            source_header += f"Chapter: {res.chapter}\n"
        if res.section:
            source_header += f"Section: {res.section}\n"
        if res.page is not None:
            source_header += f"Page: {res.page}\n"
        
        context_block = f"{source_header}\nRelevant curriculum:\n{res.text}\n"
        context_parts.append(context_block)

    return "\n".join(context_parts)

def retrieve(request: RetrievalRequest) -> RetrievalResponse:
    logger.info(f"Retrieval query: {request.query}")
    
    # 1. Embed query
    query_emb = embed_text(request.query)
    
    # 2. Search FAISS (fetch more than top_k initially to allow filtering)
    fetch_k = request.top_k * 3
    raw_results = vector_store.search(query_emb, top_k=fetch_k)
    
    # 3. Apply metadata filtering
    filtered_results = filter_results(raw_results, request)
    
    # 4. Limit to top_k
    final_results = filtered_results[:request.top_k]
    
    # 5. Format results
    retrieval_results = []
    concept_scores = defaultdict(float)
    
    for meta, score in final_results:
        result = RetrievalResult(
            text=meta.get("text", ""),
            score=score,
            document=meta.get("document_name", "Unknown Document"),
            chapter=meta.get("chapter"),
            section=meta.get("section"),
            page=meta.get("page_start"),
            concept_ids=meta.get("concept_ids", [])
        )
        retrieval_results.append(result)
        
        # Aggregate concepts
        for concept_id in meta.get("concept_ids", []):
            if score > concept_scores[concept_id]:
                concept_scores[concept_id] = score
                
    # Format concepts
    concepts = [ConceptMatch(concept_id=cid, score=sc) for cid, sc in concept_scores.items()]
    # Sort concepts by score descending
    concepts.sort(key=lambda x: x.score, reverse=True)

    # 6. Build context block
    context = build_context(retrieval_results)
    
    return RetrievalResponse(
        query=request.query,
        results=retrieval_results,
        context=context,
        concepts=concepts
    )
