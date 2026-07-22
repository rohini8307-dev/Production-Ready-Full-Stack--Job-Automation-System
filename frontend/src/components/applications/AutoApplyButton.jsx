import React, { useState } from 'react';
import { applicationService } from '../../services/application.service.js';

export default function AutoApplyButton({ jobIds = [], priorityLevel = "Priority 1", onSuccess }) {
  const [applying, setApplying] = useState(false);
  const [done, setDone] = useState(false);

  const handleAutoApply = async () => {
    setApplying(true);
    try {
      await applicationService.autoApply(jobIds, priorityLevel);
      setDone(true);
      if (onSuccess) onSuccess();
      setTimeout(() => setDone(false), 3000);
    } finally {
      setApplying(false);
    }
  };

  return (
    <button
      onClick={handleAutoApply}
      disabled={applying || done || jobIds.length === 0}
      className="btn-gold text-xs shadow-lg shadow-amber-500/15"
    >
      <span>{done ? "✅ Auto-Applied to All!" : applying ? "⚡ Agent Applying..." : `⚡ Auto Apply All (${jobIds.length})`}</span>
    </button>
  );
}
