import React from 'react';

export default function Button({ children, variant = "primary", onClick, disabled, className = "" }) {
  const base = "rounded-lg font-semibold text-xs px-4 py-2 transition flex items-center justify-center gap-2";
  const styles = {
    primary: "btn-primary",
    gold: "btn-gold",
    outline: "btn-outline"
  }[variant] || "btn-primary";
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
