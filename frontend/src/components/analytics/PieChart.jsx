import React from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function PieChart() {
  return (
    <div className="card-panel p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-2">Platform Distribution</h3>
      <div className="h-64 bg-gray-50 border border-gray-100 rounded flex items-center justify-center overflow-hidden">
        <img src={`${BASE_URL}/api/analytics/pie-chart`} alt="Platform Distribution" className="max-h-full object-contain mix-blend-multiply" />
      </div>
    </div>
  );
}
