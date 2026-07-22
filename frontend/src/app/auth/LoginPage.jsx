import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] p-4">
      <div className="card-panel max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white">Sign In to NOAH</h2>
          <p className="text-xs text-[#8A99AF]">AI Career Intelligence Platform</p>
        </div>
        <div className="space-y-4 text-xs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0F131D] border border-[#1E2533] rounded-lg p-3 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0F131D] border border-[#1E2533] rounded-lg p-3 text-white"
          />
          <button className="btn-primary w-full py-3 text-sm">Log In</button>
        </div>
      </div>
    </div>
  );
}
