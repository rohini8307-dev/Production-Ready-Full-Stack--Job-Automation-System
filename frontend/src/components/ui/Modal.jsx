import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151A24] border border-[#1E2533] rounded-2xl max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8A99AF] hover:text-white">✕</button>
        {children}
      </div>
    </div>
  );
}
