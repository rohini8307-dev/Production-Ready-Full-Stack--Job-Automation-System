"""Duplicate detection across platforms using normalized titles and company hashes."""
from typing import List, Dict

class DuplicateDetector:
    def remove_duplicates(self, jobs: List[Dict]) -> tuple[List[Dict], int]:
        seen = set()
        unique = []
        removed_count = 0
        for job in jobs:
            key = (job.get("title", "").strip().lower(), job.get("company", "").strip().lower())
            if key in seen:
                removed_count += 1
            else:
                seen.add(key)
                unique.append(job)
        return unique, removed_count
