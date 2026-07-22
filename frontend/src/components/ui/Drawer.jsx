import React from 'react';

export default function Drawer({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
      <div className="w-96 bg-[#151A24] h-full p-6 overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8A99AF]">✕</button>
        {children}
      </div>
    </div>
  );
}
