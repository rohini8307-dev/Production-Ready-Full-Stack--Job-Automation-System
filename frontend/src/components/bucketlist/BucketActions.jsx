import React from 'react';

export default function BucketActions({ onApplyAll }) {
  return (
    <div className="flex justify-end mb-4">
      <button onClick={onApplyAll} className="btn-gold text-xs">
        ⚡ Apply to All in Bucket
      </button>
    </div>
  );
}
