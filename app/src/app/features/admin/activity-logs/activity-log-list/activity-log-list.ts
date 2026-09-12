import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLog } from '../../../../shared/models/activity-logs.models';
import { ActivityLogService } from '../activity-log';

@Component({
  selector: 'app-activity-log-list',
  imports: [CommonModule],
  templateUrl: './activity-log-list.html',
  styleUrl: './activity-log-list.css',
})
export class ActivityLogList implements OnInit {
  logs: ActivityLog[] = [];

  constructor(private activityLogService: ActivityLogService) {}

  ngOnInit(): void {
    this.logs = this.activityLogService.getLogs();
  }
}