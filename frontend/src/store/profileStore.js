export const profileStore = {
  isProfileCompleted: false,
  // Mandatory Fields
  fullName: "",
  email: "",
  resumeFile: null,
  resumeParsedData: null,
  currentLocation: "",
  workMode: "Remote", // Remote, On-site, Hybrid
  preferredLocations: [], // Required if On-site or Hybrid

  // Highly Recommended Fields
  primaryDomain: "",
  keySkills: [],
  expectedSalaryMin: "",
  expectedSalaryMax: "",

  // Optional Fields
  phone: "",
  portfolioUrl: "",
  college: "",
  graduationYear: "",
  cgpa: "",
  yearsOfExperience: 0,
  willingToRelocate: true,
  relocationCities: [],
  noticePeriod: "",
  jobTypes: ["Full-time"],

  // ATS Scores (computed dynamically post onboarding)
  resumeScore: 0,
  atsScore: 0,
  skillsMatch: {
    overall: 0,
    matched: [],
    missing: []
  }
};
