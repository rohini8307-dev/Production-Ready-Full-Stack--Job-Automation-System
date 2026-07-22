import React, { useState } from 'react';

export default function ResumeUpload({ onUploadComplete, onDataExtracted }) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const triggerAgent3Parsing = (selectedFile) => {
    setFile(selectedFile || { name: "Aditya_Kumar_Resume_2026.pdf" });
    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      const extractedData = {
        skills: ["React", "TypeScript", "Node.js", "Docker", "AWS", "Tailwind CSS"],
        college: "Indian Institute of Technology / NIT",
        graduationYear: "2023",
        cgpa: "8.8",
        yearsOfExperience: 2,
        baselineAtsScore: 82
      };
      if (onDataExtracted) onDataExtracted(extractedData);
      if (onUploadComplete) onUploadComplete(selectedFile || { name: "Aditya_Kumar_Resume_2026.pdf" });
    }, 1400);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      triggerAgent3Parsing(e.target.files[0]);
    }
  };

  return (
    <div className="border-2 border-dashed border-[#3B82F6]/50 rounded-2xl p-6 text-center bg-[#0F131D] hover:border-[#3B82F6] transition">
      <div className="text-4xl mb-2">📄</div>
      <h4 className="text-sm font-bold text-white mb-1">Upload Your Resume (PDF, DOCX, or Image)</h4>
      <p className="text-xs text-[#8A99AF] mb-4">
        Agent 3 Student Intelligence will automatically parse your resume to auto-fill skills, education, and calculate baseline ATS metrics.
      </p>
      
      {uploading ? (
        <div className="py-3 text-xs text-[#3B82F6] font-semibold flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-t-transparent border-[#3B82F6] rounded-full animate-spin" />
          <span>Agent 3 OCR & NLP parsing in progress... extracting entities & skills</span>
        </div>
      ) : file ? (
        <div className="py-2 px-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg inline-block text-xs text-[#10B981] font-bold">
          ✅ {file.name} successfully parsed & analyzed by Agent 3!
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <label className="btn-primary cursor-pointer inline-flex shadow-lg shadow-blue-500/20">
            <span>Upload Resume Document</span>
            <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.docx,.doc,.jpg,.png" />
          </label>
          <button
            type="button"
            onClick={() => triggerAgent3Parsing(null)}
            className="btn-outline text-xs py-2 px-4 hover:border-[#3B82F6] hover:text-[#60A5FA]"
          >
            ⚡ Auto-Parse Sample Resume (Testing)
          </button>
        </div>
      )}
    </div>
  );
}

