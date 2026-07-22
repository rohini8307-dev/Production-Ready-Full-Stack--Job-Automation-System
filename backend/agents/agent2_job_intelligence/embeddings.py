"""Generate dense embedding vectors for semantic search and compatibility calculations."""
import numpy as np

def generate_embedding(text: str, dim: int = 128) -> list[float]:
    # Deterministic pseudo-embedding based on character hash for simulation/testing without external API costs
    seed = sum(ord(c) for c in text[:100])
    np.random.seed(seed % (2**32 - 1))
    vec = np.random.normal(0, 1, dim)
    norm = np.linalg.norm(vec)
    return (vec / norm if norm > 0 else vec).tolist()
