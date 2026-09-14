import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Notification } from '../models/notification.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly apiUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http
      .get<{ success: boolean; data: Notification[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.http
      .get<{ success: boolean; data: Notification }>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        map(response => response.data)
      );
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/read`,
      {}
    );
  }
}