"""Vector search integration with vectordb."""
from backend.database.vectordb import vector_store

class VectorSearchEngine:
    def find_similar(self, student_vector: list[float], top_k: int = 10) -> list[dict]:
        return vector_store.search_similarity(student_vector, top_k=top_k)
