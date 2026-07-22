import React from 'react';

export default function Pagination({ page = 1, totalPages = 5, onPageChange }) {
  return (
    <div className="flex items-center justify-between py-4 text-xs text-[#8A99AF]">
      <span>Page {page} of {totalPages}</span>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 bg-[#1C2230] rounded disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 bg-[#1C2230] rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
