import { useState, useEffect } from 'react';
import { scraperService } from '../services/scraper.service.js';

export function useScraper() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    scraperService.getStatus().then(setStatus);
  }, []);
  return { status };
}
