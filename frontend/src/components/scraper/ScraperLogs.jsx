import React from 'react';

export default function ScraperLogs({ logs = [], onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151A24] border border-[#1E2533] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[80vh] flex flex-col animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A99AF] hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
          <span>💻</span>
          <span>Live Multi-Agent Scraper Logs & Verification Pipeline</span>
        </h3>

        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs pr-1">
          {logs.map((l, i) => (
            <div key={i} className="p-2.5 bg-[#0F131D] border border-[#1E2533] rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[#5D6A80]">{l.timestamp}</span>
                <span className="text-[#3B82F6] font-bold">{l.agent}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">{l.details}</span>
                <span className="px-2 py-0.5 bg-[#10B981]/20 text-[#10B981] rounded text-[10px] font-bold">
                  {l.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#1E2533] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary px-5 py-1.5 text-xs"
          >
            Close Logs
          </button>
        </div>
      </div>
    </div>
  );
}
