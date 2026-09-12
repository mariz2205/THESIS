import { Injectable } from '@angular/core';
import { Report } from '../../../shared/models/report.models';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private mockReports: Report[] = [
    {
      id: 1,
      title: 'Flood Incident',
      type: 'Incident',
      barangay: 'Poblacion',
      createdBy: 'Juan Dela Cruz',
      dateCreated: '2026-09-01',
      status: 'Finalized',
      content: 'Detailed report content here...'
    },
    {
      id: 2,
      title: 'September Monthly Summary',
      type: 'Monthly',
      barangay: 'N/A',
      createdBy: 'Maria Santos',
      dateCreated: '2026-09-10',
      status: 'Draft',
      content: 'Monthly summary content here...'
    },
  ];

  getReports(): Report[] {
    return this.mockReports;
  }

  getReportById(id: number): Report | undefined {
    return this.mockReports.find(r => r.id === id);
  }
}