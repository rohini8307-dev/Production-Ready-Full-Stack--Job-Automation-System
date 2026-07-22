import React from 'react';

export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1C2230] border border-[#3B82F6] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-3 animate-bounce">
      <span>{message}</span>
      {onClose && <button onClick={onClose} className="text-[#8A99AF]">✕</button>}
    </div>
  );
}
