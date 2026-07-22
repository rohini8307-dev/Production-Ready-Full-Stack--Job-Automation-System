"""Notification service for dynamic alerts."""
from typing import List, Dict

class NotificationService:
    def __init__(self):
        self.notifications: List[Dict] = []

    def add_notification(self, title: str, message: str):
        notif_id = len(self.notifications) + 1
        self.notifications.insert(0, {"id": notif_id, "title": title, "message": message, "time": "Just now", "read": False})

    def get_notifications(self) -> List[Dict]:
        return self.notifications

    def mark_all_read(self):
        for n in self.notifications:
            n["read"] = True

notification_service = NotificationService()
