import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private mockNotifications: Notification[] = [
    { id: 1, message: 'New incident reported in Barangay Poblacion', type: 'warning', timestamp: '2026-09-12 08:30', read: false },
    { id: 2, message: 'Monthly report finalized', type: 'success', timestamp: '2026-09-11 16:00', read: true },
  ];

  getNotifications(): Notification[] {
    return this.mockNotifications;
  }

  getUnreadCount(): number {
    return this.mockNotifications.filter(n => !n.read).length;
  }

  markAsRead(id: number): void {
    const notif = this.mockNotifications.find(n => n.id === id);
    if (notif) notif.read = true;
  }
}