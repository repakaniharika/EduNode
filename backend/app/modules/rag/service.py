from .document_store import DocumentStore

class RAGService:
    def __init__(self):
        self.store = DocumentStore()

    def get_context(self, query: str, topic_id: str = None) -> str:
        """
        Retrieve context relevant to the query.
        """
        context = self.store.retrieve(query, topic_id=topic_id)
        if not context:
            return "No specific curriculum context found for this topic."
        return context
