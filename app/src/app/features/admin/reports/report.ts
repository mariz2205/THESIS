import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Report } from '../../../shared/models/report.models';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly apiUrl = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http
      .get<{ success: boolean; data: Report[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getReportById(id: number): Observable<Report> {
    return this.http
      .get<{ success: boolean; data: Report }>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        map(response => response.data)
      );
  }
}