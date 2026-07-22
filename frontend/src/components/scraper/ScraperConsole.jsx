import React, { useEffect, useState } from 'react';
import { scraperService } from '../../services/scraper.service.js';

export default function ScraperConsole() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let mounted = true;
    scraperService.getStatus().then((res) => {
      if (mounted) setStatus(res);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h3 className="text-sm font-bold text-white mb-2">Agent Orchestration Console</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {status && Object.entries(status).map(([k, v]) => (
          <div key={k} className="p-2 bg-[#0F131D] rounded border border-[#1E2533] flex justify-between">
            <span className="text-[#8A99AF]">{k}</span>
            <span className="text-white font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
