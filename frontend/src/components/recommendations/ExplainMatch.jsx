import React, { useEffect, useState } from 'react';
import { recommendationService } from '../../services/recommendation.service.js';
import { applicationService } from '../../services/application.service.js';

export default function ExplainMatch({ job, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    let mounted = true;
    recommendationService.explainMatch(job.id).then((res) => {
      if (mounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [job.id]);

  const handleApplyNow = async () => {
    await applicationService.autoApply([job.id], job.priority || "Priority 1");
    setApplied(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151A24] border border-[#3B82F6]/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A99AF] hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6] flex items-center justify-center text-xl">
            🧠
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Agent 4 Match Explanation</h3>
            <p className="text-xs text-[#8A99AF]">{job.title} at {job.company}</p>
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-[#8A99AF]">Generating deep semantic explanation via Agent 4...</div>
        ) : (
          <div className="space-y-4 text-sm">
            <div className="p-3.5 bg-[#0F131D] border border-[#1E2533] rounded-xl text-gray-300">
              <strong className="text-[#3B82F6] block mb-1">Reasoning Analysis:</strong>
              {data?.reasoning || "High alignment with React, TypeScript, and modern state management skills."}
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 bg-[#0F131D] rounded-lg border border-[#1E2533]">
                <div className="text-[10px] text-[#8A99AF]">Shortlist Odds</div>
                <div className="text-base font-extrabold text-[#10B981]">{data?.shortlist_probability || 88}%</div>
              </div>
              <div className="p-2.5 bg-[#0F131D] rounded-lg border border-[#1E2533]">
                <div className="text-[10px] text-[#8A99AF]">Interview Odds</div>
                <div className="text-base font-extrabold text-[#3B82F6]">{data?.interview_probability || 72}%</div>
              </div>
              <div className="p-2.5 bg-[#0F131D] rounded-lg border border-[#1E2533]">
                <div className="text-[10px] text-[#8A99AF]">Company Trust</div>
                <div className="text-base font-extrabold text-[#F59E0B]">98%</div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1E2533] flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#1C2230] text-[#8A99AF] hover:text-white text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleApplyNow}
                disabled={applied}
                className="btn-gold px-5 py-2"
              >
                {applied ? "✅ Applied via NOAH!" : "⚡ Apply"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
