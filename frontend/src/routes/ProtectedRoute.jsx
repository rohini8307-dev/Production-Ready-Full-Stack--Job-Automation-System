import React from 'react';

export default function ProtectedRoute({ children, isAuthenticated = true }) {
  if (!isAuthenticated) {
    return <div className="p-8 text-center text-gray-400">Please log in to access this page.</div>;
  }
  return children;
}
