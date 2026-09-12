import { Component, OnInit } from '@angular/core';
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
export class ReportDetail implements OnInit {
  report: Report | undefined;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.report = this.reportService.getReportById(id);
  }
}