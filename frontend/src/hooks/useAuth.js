import { useState } from 'react';
import { authStore } from '../store/authStore.js';

export function useAuth() {
  const [user, setUser] = useState(authStore.user);
  const [isAuthenticated, setIsAuthenticated] = useState(authStore.isAuthenticated);
  return { user, isAuthenticated, setUser, setIsAuthenticated };
}
