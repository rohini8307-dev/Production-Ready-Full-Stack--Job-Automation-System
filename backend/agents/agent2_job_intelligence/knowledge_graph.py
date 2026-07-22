"""Knowledge graph representations linking domain entities and tech stacks."""
from typing import Dict, Any

class KnowledgeGraphBuilder:
    def build_graph(self, job: Dict) -> Dict[str, Any]:
        return {
            "nodes": [job.get("title", "Unknown Role"), job.get("company", "Unknown Company")],
            "edges": [{"from": job.get("company", ""), "to": job.get("title", ""), "relation": "HIRES"}]
        }
