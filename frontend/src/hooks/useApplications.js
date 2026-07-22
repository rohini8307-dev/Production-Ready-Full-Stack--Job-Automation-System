import { useState, useEffect } from 'react';
import { applicationService } from '../services/application.service.js';

export function useApplications() {
  const [apps, setApps] = useState(null);
  useEffect(() => {
    applicationService.getApplications().then(setApps);
  }, []);
  return { apps };
}
