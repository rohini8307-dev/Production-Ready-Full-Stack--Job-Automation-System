import { useState, useEffect } from 'react';
import { recommendationService } from '../services/recommendation.service.js';

export function useRecommendations(priority = "All") {
  const [data, setData] = useState(null);
  useEffect(() => {
    recommendationService.getRecommendations(priority).then(setData);
  }, [priority]);
  return { data };
}
