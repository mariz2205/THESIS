import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../../models/notification.models';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  isOpen = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  get unreadCount(): number {
    return this.notificationService.getUnreadCount();
  }

  onMarkRead(id: number): void {
    this.notificationService.markAsRead(id);
    this.loadNotifications();
  }
}