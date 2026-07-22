import { useState, useEffect } from 'react';
import { profileService } from '../services/profile.service.js';

export function useProfile() {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    profileService.getSummary().then(setSummary);
  }, []);
  return { summary };
}
