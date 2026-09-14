import { Component, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Report } from '../../../../shared/models/report.models';
import { ReportService } from '../report';

@Component({
  selector: 'app-report-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './report-detail.html',
  styleUrl: './report-detail.css',
})
export class ReportDetail {

  report: Report | null = null;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.loadReport();
    });
  }

  loadReport(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);

    this.reportService.getReportById(id).subscribe({
      next: (report) => {
        console.log('Report received from backend:', report);

        this.report = report;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load report:', error);

        this.report = null;

        this.cdr.detectChanges();
      }
    });
  }
}