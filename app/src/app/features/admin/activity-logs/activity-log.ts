import { Injectable } from '@angular/core';
import { ActivityLog } from '../../../shared/models/activity-logs.models';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private mockLogs: ActivityLog[] = [
    { id: 1, user: 'Juan Dela Cruz', action: 'Created', target: 'Incident Report #12', timestamp: '2026-09-12 08:15 AM' },
    { id: 2, user: 'Maria Santos', action: 'Updated', target: 'User: Pedro Reyes', timestamp: '2026-09-12 09:02 AM' },
    { id: 3, user: 'Admin', action: 'Deleted', target: 'Report #8', timestamp: '2026-09-11 04:47 PM' },
  ];

  getLogs(): ActivityLog[] {
    return this.mockLogs;
  }
}