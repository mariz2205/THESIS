import { Component, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityLog } from '../../../../shared/models/activity-logs.models';
import { ActivityLogService } from '../activity-log';

@Component({
  selector: 'app-activity-log-list',
  imports: [CommonModule],
  templateUrl: './activity-log-list.html',
  styleUrl: './activity-log-list.css',
})
export class ActivityLogList {

  logs: ActivityLog[] = [];

  constructor(
    private activityLogService: ActivityLogService,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.loadLogs();
    });
  }

  loadLogs(): void {
    this.activityLogService.getLogs().subscribe({
      next: (logs) => {
        console.log('Activity logs received from backend:', logs);

        this.logs = logs;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load activity logs:', error);

        this.logs = [];

        this.cdr.detectChanges();
      }
    });
  }
}