import { Component, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Notification } from '../../models/notification.models';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {

  notifications: Notification[] = [];
  isOpen = false;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.loadNotifications();
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        console.log(
          'Notifications received from backend:',
          notifications
        );

        this.notifications = notifications;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Failed to load notifications:',
          error
        );

        this.notifications = [];

        this.cdr.detectChanges();
      }
    });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.loadNotifications();
    }
  }

  get unreadCount(): number {
    return this.notifications.filter(
      notification => !notification.read
    ).length;
  }

  onMarkRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe({
      next: () => {
        this.loadNotifications();
      },

      error: (error) => {
        console.error(
          'Failed to mark notification as read:',
          error
        );
      }
    });
  }
}