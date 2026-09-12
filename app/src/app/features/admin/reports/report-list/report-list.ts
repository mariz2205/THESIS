import { Component, OnInit } from '@angular/core';
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
export class ReportList implements OnInit {
  reports: Report[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reports = this.reportService.getReports();
  }
}