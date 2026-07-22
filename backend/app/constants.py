"""
System constants, platform definitions, and agent state options.
"""
PLATFORMS = ["LinkedIn", "Indeed", "Naukri", "Internshala", "GoogleJobs", "CompanyPages"]

JOB_PRIORITIES = {
    "Priority 1": "High Match (>80% Shortlist Odds)",
    "Priority 2": "Medium Match (65%-80% Shortlist Odds)",
    "Priority 3": "Good Opportunity (50%-65% Shortlist Odds)",
}

AGENT_NAMES = {
    "agent1": "Agent 1 (Discovery)",
    "agent2": "Agent 2 (Intelligence)",
    "agent3": "Agent 3 (Student Intel)",
    "agent4": "Agent 4 (Matching)",
}

APPLICATION_STAGES = [
    "Applied",
    "Screening",
    "Assessment",
    "Interview",
    "Offer",
    "Rejected"
]
