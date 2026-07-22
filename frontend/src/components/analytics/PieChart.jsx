import React from 'react';

export default function PieChart() {
  return (
    <div className="card-panel p-4 bg-[#151A24] border border-[#1E2533] rounded-xl">
      <h3 className="text-sm font-bold text-white mb-2">Platform Distribution</h3>
      <div className="h-32 bg-[#0F131D] rounded flex items-center justify-center text-xs text-[#8A99AF]">
        [Pie Chart: LinkedIn 60%, Indeed 25%, Naukri 15%]
      </div>
    </div>
  );
}
