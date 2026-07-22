import { useState, useEffect } from 'react';
import { notificationService } from '../services/notification.service.js';

export function useNotifications() {
  const [notifs, setNotifs] = useState([]);
  useEffect(() => {
    notificationService.getNotifications().then(setNotifs);
  }, []);
  return { notifs };
}
