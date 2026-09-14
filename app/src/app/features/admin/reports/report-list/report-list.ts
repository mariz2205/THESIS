import { Component, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Report } from '../../../../shared/models/report.models';
import { ReportService } from '../report';

@Component({
  selector: 'app-report-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './report-list.html',
  styleUrl: './report-list.css',
})
export class ReportList {

  reports: Report[] = [];

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.loadReports();
    });
  }

  loadReports(): void {
    this.reportService.getReports().subscribe({
      next: (reports) => {
        console.log('Reports received from backend:', reports);

        this.reports = reports;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load reports:', error);

        this.reports = [];

        this.cdr.detectChanges();
      }
    });
  }
}