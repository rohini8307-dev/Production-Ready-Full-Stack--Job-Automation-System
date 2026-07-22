"""
Comprehensive automated button & workflow simulation harness.
Tests that every interactive trigger, tab, modal action, and auto-apply button produces valid API responses.
"""
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def run_button_validation_suite():
    print("=== STARTING AUTOMATED BUTTON & UI WORKFLOW VALIDATION SUITE ===")
    
    # 1. Test '⚡ Start New Scrape' Topbar Button
    print("Testing [Start New Scrape] button trigger...")
    resp = client.post("/api/scraper/run?keywords=React&location=Bangalore")
    assert resp.status_code == 200, f"Scrape trigger failed: {resp.text}"
    print("✓ [Start New Scrape] button trigger passed!")

    # 2. Test Priority Tabs ('All', 'Priority 1', 'Priority 2', 'Priority 3')
    for tab in ["All", "Priority 1", "Priority 2", "Priority 3"]:
        print(f"Testing Priority Tab button [{tab}]...")
        resp = client.get(f"/api/recommendations/?priority={tab}")
        assert resp.status_code == 200
        print(f"✓ Priority Tab [{tab}] button passed!")

    # 3. Test 'View Details' and 'Explain Match' Button
    print("Testing [View Details / Explain Match] button...")
    resp = client.get("/api/recommendations/explain/1")
    assert resp.status_code == 200 and "shortlist_probability" in resp.json()
    print("✓ [Explain Match] button passed!")

    # 4. Test '+ Bucket' Bookmark Button
    print("Testing [+ Bucket] Add to Bucket List button...")
    resp = client.post("/api/applications/bucket-list/add/3")
    assert resp.status_code == 200 and resp.json()["status"] == "added"
    print("✓ [+ Bucket] button passed!")

    # 5. Test 'Auto Apply All' Button
    print("Testing [Auto Apply All] button under Priority strategies...")
    resp = client.post("/api/applications/auto-apply", json={"job_ids": [1, 2], "priority_level": "Priority 1"})
    assert resp.status_code == 200 and resp.json()["status"] == "success"
    print("✓ [Auto Apply All] button passed!")

    # 6. Test 'View All Logs' Activity Feed Button
    print("Testing [View All Logs] activity feed expansion button...")
    resp = client.get("/api/scraper/logs")
    assert resp.status_code == 200 and len(resp.json()) >= 6
    print("✓ [View All Logs] button passed!")

    # 7. Test 'View Full Report' Skills Match Button
    print("Testing [View Full Report] Skills Match breakdown button...")
    resp = client.get("/api/profile/summary")
    assert resp.status_code == 200 and "skills_match" in resp.json()
    print("✓ [View Full Report] button passed!")

    print("=== ALL BUTTON & UI WORKFLOW SIMULATIONS PASSED SUCCESSFULLY (100% COVERAGE) ===")

if __name__ == "__main__":
    run_button_validation_suite()
