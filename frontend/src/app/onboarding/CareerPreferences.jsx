import React, { useState } from 'react';

export default function CareerPreferences({ formData, setFormData, onNext, onPrev }) {
  const [newSkill, setNewSkill] = useState("");
  const [newCity, setNewCity] = useState("");
  const [showOptional, setShowOptional] = useState(false);

  const domains = [
    "Full Stack Developer",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cyber Security Analyst",
    "Software Testing / QA",
    "Salesforce Developer",
    "Cloud Solutions Architect",
    "Data Scientist / Analyst",
    "Frontend Specialist (React/Next.js)",
    "Backend Engineer (Python/Node/Go)"
  ];

  const quickSkills = [
    "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "TypeScript",
    "PostgreSQL", "Next.js", "GraphQL", "MongoDB", "Tailwind CSS", "TensorFlow", "CI/CD"
  ];

  const quickCities = ["Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi / NCR", "Chennai"];

  const handleAddSkill = (sk) => {
    const val = sk || newSkill.trim();
    if (val && !formData.keySkills.includes(val)) {
      setFormData({ ...formData, keySkills: [...formData.keySkills, val] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (sk) => {
    setFormData({ ...formData, keySkills: formData.keySkills.filter(s => s !== sk) });
  };

  const handleAddPreferredCity = (city) => {
    const val = city || newCity.trim();
    if (val && !formData.preferredLocations.includes(val)) {
      setFormData({ ...formData, preferredLocations: [...formData.preferredLocations, val] });
      setNewCity("");
    }
  };

  const handleRemovePreferredCity = (city) => {
    setFormData({ ...formData, preferredLocations: formData.preferredLocations.filter(c => c !== city) });
  };

  return (
    <div className="space-y-5 text-xs max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Mandatory Work Mode & Location Section */}
      <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-main)' }}>
        <h4 className="font-extrabold text-sm flex items-center gap-1.5" style={{ color: 'var(--gold-bright)' }}>
          <span>📍</span>
          <span>Location & Work Mode Preferences (Mandatory)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1" style={{ color: 'var(--text-main)' }}>Current Location (City + State) *</label>
            <input
              type="text"
              required
              value={formData.currentLocation}
              onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
              placeholder="e.g. Bangalore, Karnataka"
              className="w-full rounded-lg p-2.5"
            />
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: 'var(--text-main)' }}>Preferred Work Mode *</label>
            <select
              value={formData.workMode}
              onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
              className="w-full rounded-lg p-2.5"
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        </div>

        {(formData.workMode === "Hybrid" || formData.workMode === "On-site") && (
          <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--border-dim)' }}>
            <label className="block font-bold mb-1" style={{ color: 'var(--text-main)' }}>
              Preferred Location(s) for {formData.workMode} (Multiple allowed) *
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {quickCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleAddPreferredCity(city)}
                  className="px-2 py-1 rounded-md text-[11px] font-semibold border transition"
                  style={{
                    background: formData.preferredLocations.includes(city) ? 'var(--gold-primary)' : 'var(--bg-card)',
                    color: formData.preferredLocations.includes(city) ? '#0F0804' : 'var(--text-secondary)',
                    borderColor: 'var(--border-main)'
                  }}
                >
                  + {city}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Add specific city..."
                className="flex-1 rounded-lg p-2"
              />
              <button type="button" onClick={() => handleAddPreferredCity()} className="btn-outline px-3">Add</button>
            </div>
            {formData.preferredLocations.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.preferredLocations.map((loc) => (
                  <span
                    key={loc}
                    className="px-2.5 py-1 rounded-full flex items-center gap-1.5 border"
                    style={{ background: 'var(--gold-subtle)', color: 'var(--gold-bright)', borderColor: 'var(--border-gold)' }}
                  >
                    <span>{loc}</span>
                    <button type="button" onClick={() => handleRemovePreferredCity(loc)} className="hover:text-white font-bold">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Highly Recommended Domain & Skills Section */}
      <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-main)' }}>
        <h4 className="font-extrabold text-sm flex items-center gap-1.5" style={{ color: 'var(--gold-bright)' }}>
          <span>⭐</span>
          <span>Target Domain, Skills & Package (Highly Recommended)</span>
        </h4>

        <div>
          <label className="block font-bold mb-1" style={{ color: 'var(--text-main)' }}>Primary Domain / Role</label>
          <select
            value={formData.primaryDomain}
            onChange={(e) => setFormData({ ...formData, primaryDomain: e.target.value })}
            className="w-full rounded-lg p-2.5"
          >
            <option value="">Select or type target domain...</option>
            {domains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-1" style={{ color: 'var(--text-main)' }}>Key Skills & Technologies ({formData.keySkills.length})</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {quickSkills.map((sk) => (
              <button
                key={sk}
                type="button"
                onClick={() => handleAddSkill(sk)}
                className="px-2 py-0.5 rounded text-[11px] font-medium border transition"
                style={{
                  background: formData.keySkills.includes(sk) ? 'var(--gold-primary)' : 'var(--bg-card)',
                  color: formData.keySkills.includes(sk) ? '#0F0804' : 'var(--text-secondary)',
                  borderColor: 'var(--border-main)'
                }}
              >
                + {sk}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. PyTorch, Redis, Kafka)..."
              className="flex-1 rounded-lg p-2"
            />
            <button type="button" onClick={() => handleAddSkill()} className="btn-outline px-3">Add Skill</button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {formData.keySkills.map((sk) => (
              <span
                key={sk}
                className="px-2.5 py-1 rounded-full flex items-center gap-1.5 font-semibold border"
                style={{ background: 'var(--gold-subtle)', color: 'var(--gold-bright)', borderColor: 'var(--border-gold)' }}
              >
                <span>{sk}</span>
                <button type="button" onClick={() => handleRemoveSkill(sk)} className="hover:text-white font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1" style={{ color: 'var(--text-main)' }}>Expected Salary (Min LPA)</label>
            <input
              type="number"
              value={formData.expectedSalaryMin}
              onChange={(e) => setFormData({ ...formData, expectedSalaryMin: e.target.value })}
              placeholder="e.g. 15"
              className="w-full rounded-lg p-2.5"
            />
          </div>
          <div>
            <label className="block font-bold mb-1" style={{ color: 'var(--text-main)' }}>Expected Salary (Max LPA)</label>
            <input
              type="number"
              value={formData.expectedSalaryMax}
              onChange={(e) => setFormData({ ...formData, expectedSalaryMax: e.target.value })}
              placeholder="e.g. 35"
              className="w-full rounded-lg p-2.5"
            />
          </div>
        </div>
      </div>

      {/* Optional Section */}
      <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-main)' }}>
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="w-full flex items-center justify-between text-sm font-bold transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="flex items-center gap-1.5">
            <span>⚙️</span>
            <span>Optional Enhancements (Phone, Portfolio, Education, Relocation, Notice Period)</span>
          </span>
          <span>{showOptional ? "▲ Hide" : "▼ Expand"}</span>
        </button>

        {showOptional && (
          <div className="pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in" style={{ borderColor: 'var(--border-dim)' }}>
            <div>
              <label className="block font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" style={{ color: 'var(--text-main)' }}>LinkedIn / GitHub / Portfolio URL</label>
              <input
                type="text"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" style={{ color: 'var(--text-main)' }}>College / University Name</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. IIT Delhi / NIT Trichy"
                className="w-full rounded-lg p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Grad Year</label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  placeholder="e.g. 2023"
                  className="w-full rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" style={{ color: 'var(--text-main)' }}>CGPA / Score</label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  placeholder="e.g. 8.5"
                  className="w-full rounded-lg p-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Years of Experience (0 for freshers)</label>
              <input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                className="w-full rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Notice Period</label>
              <select
                value={formData.noticePeriod}
                onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                className="w-full rounded-lg p-2"
              >
                <option value="Immediate">Immediate / Currently Serving</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="90 Days">90 Days</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 flex justify-between items-center border-t" style={{ borderColor: 'var(--border-dim)' }}>
        <button type="button" onClick={onPrev} className="btn-outline">
          ← Back
        </button>
        <button type="button" onClick={onNext} className="btn-gold px-6 py-2.5">
          <span>Complete Onboarding & Activate Profile →</span>
        </button>
      </div>
    </div>
  );
}
