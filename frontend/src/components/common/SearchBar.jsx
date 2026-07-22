import React from 'react';

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-[#151A24] border border-[#1E2533] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#5D6A80] focus:outline-none focus:border-[#3B82F6] w-64"
    />
  );
}
