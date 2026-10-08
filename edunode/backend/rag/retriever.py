import logging
from typing import List, Dict, Any, Optional, Tuple
from edunode.backend.rag.embeddings import embed_text
from edunode.backend.rag.vector_store import vector_store
from edunode.backend.rag.concept_graph import concept_graph
from edunode.backend.rag.schemas import (
    RetrievalRequest, 
    RetrievalResult, 
    RetrievalResponse,
    ConceptMatch,
    CurriculumMetadata
)
from collections import defaultdict
from edunode.backend.rag.config import MAX_TOP_K

logger = logging.getLogger(__name__)

def filter_results(results: List[Tuple[Dict[str, Any], float]], req: RetrievalRequest) -> List[Tuple[Dict[str, Any], float]]:
    filtered = []
    for meta, score in results:
        # STRICT Filtering: If a field is provided in the request, it MUST exactly match the metadata.
        # Missing metadata for a requested field results in rejection.
        
        if str(meta.get("board")).lower() != str(req.board).lower():
            continue
        if req.grade is not None and meta.get("grade") != req.grade:
            continue
        if str(meta.get("subject")).lower() != str(req.subject).lower():
            continue
        if req.medium is not None and str(meta.get("medium")).lower() != str(req.medium).lower():
            continue
        if req.textbook is not None and str(meta.get("textbook")).lower() != str(req.textbook).lower():
            continue
        if req.academic_year is not None and str(meta.get("academic_year")).lower() != str(req.academic_year).lower():
            continue
        if req.chapter is not None and str(meta.get("chapter")).lower() != str(req.chapter).lower():
            continue
        if req.document_id is not None and str(meta.get("document_id")) != str(req.document_id):
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
        source_header += f"Document: {res.document_name}\n"
        source_header += f"Board: {res.board} | Grade: {res.grade} | Subject: {res.subject}\n"
        if res.chapter:
            source_header += f"Chapter: {res.chapter}\n"
        if res.page_start is not None:
            source_header += f"Page: {res.page_start}\n"
        
        context_block = f"{source_header}\nRelevant curriculum:\n{res.text}\n"
        context_parts.append(context_block)

    return "\n".join(context_parts)

def retrieve(request: RetrievalRequest) -> RetrievalResponse:
    logger.info(f"Retrieval query: {request.query}")
    if request.top_k < 1 or request.top_k > MAX_TOP_K:
        raise ValueError(f"top_k must be between 1 and {MAX_TOP_K}.")
    
    # 1. Embed query
    query_emb = embed_text(request.query)
    
    # Expand the candidate window until enough matching results are found or the index is exhausted.
    fetch_k = min(request.top_k * 5, vector_store.index.ntotal)
    filtered_results = []
    while fetch_k:
        raw_results = vector_store.search(query_emb, top_k=fetch_k)
        filtered_results = filter_results(raw_results, request)
        if len(filtered_results) >= request.top_k or fetch_k >= vector_store.index.ntotal:
            break
        fetch_k = min(fetch_k * 2, vector_store.index.ntotal)
    
    # 4. Limit to top_k
    final_results = filtered_results[:request.top_k]
    
    # 5. Format results
    retrieval_results = []
    concept_scores = defaultdict(float)
    
    for meta, score in final_results:
        result = RetrievalResult(
            text=meta.get("text", ""),
            score=score,
            document_id=meta.get("document_id", "unknown"),
            document_name=meta.get("document_name", "Unknown Document"),
            board=meta.get("board", "unknown"),
            grade=meta.get("grade", 0),
            subject=meta.get("subject", "unknown"),
            chapter=meta.get("chapter"),
            page_start=meta.get("page_start"),
            page_end=meta.get("page_end"),
            concept_ids=meta.get("concept_ids", [])
        )
        retrieval_results.append(result)
        
        # Aggregate concepts
        for concept_id in meta.get("concept_ids", []):
            if score > concept_scores[concept_id]:
                concept_scores[concept_id] = score
                
    # Format concepts
    concepts = []
    concept_context = []
    
    for cid, sc in concept_scores.items():
        details = concept_graph.get_concept_details(cid)
        c_name = details.name if details else cid
        concepts.append(ConceptMatch(concept_id=cid, name=c_name, score=sc))
        if details:
            concept_context.append(details)
            
    # Sort concepts by score descending
    concepts.sort(key=lambda x: x.score, reverse=True)

    # 6. Build context block
    context = build_context(retrieval_results)
    
    curr_metadata = CurriculumMetadata(
        board=request.board,
        grade=request.grade,
        subject=request.subject,
        medium=request.medium
    )
    
    return RetrievalResponse(
        query=request.query,
        curriculum_metadata=curr_metadata,
        results=retrieval_results,
        concepts=concepts,
        concept_context=concept_context,
        context=context
    )
