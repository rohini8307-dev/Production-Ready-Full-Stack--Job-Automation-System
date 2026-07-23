import React, { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function Login({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Email and password are required.'); return; }

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, name: form.name };

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Authentication failed.');
        setLoading(false);
        return;
      }

      // Store session in localStorage
      const session = {
        email: form.email,
        name: form.name || form.email.split('@')[0],
        token: data.access_token || 'session',
        loginTime: Date.now()
      };
      localStorage.setItem('noah_session', JSON.stringify(session));
      onAuthSuccess(session);
    } catch (err) {
      setError('Network error or server unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080503 0%, #120A05 50%, #0A0603 100%)' }}
    >
      {/* Background orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C8941F, transparent)', top: '-10%', left: '-5%' }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B6618, transparent)', bottom: '-5%', right: '-5%' }}
      />

      {/* Login Card */}
      <div className="login-glass w-full max-w-sm mx-4 p-8 animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-black"
            style={{
              background: 'linear-gradient(135deg, #C8941F, #8B6618)',
              boxShadow: '0 8px 32px rgba(200,148,31,0.35)'
            }}
          >
            N
          </div>
          <h1
            className="text-2xl font-black tracking-wide mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#E8B84B' }}
          >
            NOAH NexusAI
          </h1>
          <p style={{ color: '#8A7060', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
            AI CAREER INTELLIGENCE PLATFORM
          </p>
        </div>

        {/* Mode Toggle */}
        <div
          className="flex rounded-lg p-0.5 mb-6"
          style={{ background: '#1A0F08', border: '1px solid #3D2210' }}
        >
          {['login', 'register'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className="flex-1 py-2 text-xs font-bold rounded-md capitalize transition"
              style={{
                background: mode === m ? 'linear-gradient(135deg, #C8941F, #8B6618)' : 'transparent',
                color: mode === m ? '#0F0804' : '#8A7060'
              }}
            >
              {m === 'login' ? '🔐 Sign In' : '✨ Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: '0.75rem', color: '#C4A882', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-sm"
                style={{ background: '#221308', border: '1px solid #3D2210', color: '#F5EDD8' }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.75rem', color: '#C4A882', fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ background: '#221308', border: '1px solid #3D2210', color: '#F5EDD8' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#C4A882', fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ background: '#221308', border: '1px solid #3D2210', color: '#F5EDD8' }}
            />
          </div>

          {error && (
            <div
              className="text-xs px-3 py-2 rounded-lg"
              style={{ background: 'rgba(139,58,26,0.2)', border: '1px solid rgba(139,58,26,0.4)', color: '#D4856A' }}
            >
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-bold rounded-lg transition mt-2 disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #C8941F, #8B6618)',
              color: '#0F0804',
              boxShadow: '0 4px 16px rgba(200,148,31,0.3)'
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#0F0804] border-t-transparent rounded-full animate-spin" />
                {mode === 'login' ? 'Authenticating...' : 'Creating account...'}
              </span>
            ) : (
              mode === 'login' ? '🔐 Sign In to Platform' : '✨ Create Account & Continue'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6" style={{ fontSize: '0.7rem', color: '#5A3C28', lineHeight: 1.6 }}>
          By continuing, you agree to NOAH's Terms of Service.<br />
          Your data is processed securely by 4 autonomous agents.
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 h-px" style={{ background: '#2E1A0E' }} />
          <span style={{ fontSize: '0.65rem', color: '#5A3C28', letterSpacing: '0.1em' }}>POWERED BY AI</span>
          <div className="flex-1 h-px" style={{ background: '#2E1A0E' }} />
        </div>
      </div>
    </div>
  );
}
