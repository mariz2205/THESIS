import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ActivityLog } from '../../../shared/models/activity-logs.models';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private readonly apiUrl = 'http://localhost:3000/api/activity-logs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<ActivityLog[]> {
    return this.http
      .get<{ success: boolean; data: ActivityLog[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getLogById(id: number): Observable<ActivityLog> {
    return this.http
      .get<{ success: boolean; data: ActivityLog }>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        map(response => response.data)
      );
  }
}