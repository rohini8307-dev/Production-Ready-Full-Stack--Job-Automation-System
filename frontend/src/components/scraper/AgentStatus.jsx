import React from 'react';

export default function AgentStatus({ name, status }) {
  const isRunning = status === 'Running';
  return (
    <div className="flex items-center justify-between text-xs text-[#8A99AF] py-1">
      <span>{name}</span>
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
        <span className={isRunning ? 'text-[#10B981] font-medium' : 'text-[#F59E0B]'}>{status}</span>
      </div>
    </div>
  );
}
