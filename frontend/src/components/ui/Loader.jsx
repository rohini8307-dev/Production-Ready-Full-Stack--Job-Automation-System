import React from 'react';

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-xs text-[#8A99AF]">
      <div className="w-6 h-6 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mb-2" />
      <span>{text}</span>
    </div>
  );
}
