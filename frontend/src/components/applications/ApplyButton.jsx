import React, { useState } from 'react';

export default function ApplyButton({ jobId, onApplied }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { setDone(true); if (onApplied) onApplied(jobId); }}
      className="btn-primary text-xs"
    >
      {done ? "Applied!" : "Apply Now"}
    </button>
  );
}
