"""
Vector database connector (Qdrant or in-memory vector fallback) for embeddings and semantic similarity matching.
"""
import numpy as np

class InMemoryVectorStore:
    def __init__(self):
        self.vectors = {}
        self.metadata = {}

    def add_vector(self, item_id: str, vector: list[float], metadata: dict):
        self.vectors[item_id] = np.array(vector, dtype=np.float32)
        self.metadata[item_id] = metadata

    def search_similarity(self, query_vector: list[float], top_k: int = 10) -> list[dict]:
        if not self.vectors:
            return []
        q_vec = np.array(query_vector, dtype=np.float32)
        q_norm = np.linalg.norm(q_vec)
        if q_norm == 0:
            return []
        
        results = []
        for item_id, vec in self.vectors.items():
            vec_norm = np.linalg.norm(vec)
            sim = 0.0 if vec_norm == 0 else float(np.dot(q_vec, vec) / (q_norm * vec_norm))
            results.append({
                "item_id": item_id,
                "score": sim,
                "metadata": self.metadata[item_id]
            })
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]

vector_store = InMemoryVectorStore()
