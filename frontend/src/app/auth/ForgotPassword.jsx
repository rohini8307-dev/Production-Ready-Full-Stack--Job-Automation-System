import React from 'react';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] p-4">
      <div className="card-panel max-w-md w-full p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Reset Password</h2>
        <input type="email" placeholder="Enter email address" className="w-full bg-[#0F131D] border border-[#1E2533] rounded p-2 text-xs text-white" />
        <button className="btn-primary w-full py-2 text-xs">Send Reset Link</button>
      </div>
    </div>
  );
}
