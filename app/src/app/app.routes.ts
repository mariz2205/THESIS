import { Routes } from '@angular/router';
import { AdminLayout } from './shared/components/admin-layout/admin-layout';
import { UserList } from './features/admin/user-management/user-list/user-list';
import { UserForm } from './features/admin/user-management/user-form/user-form';
import { ReportList } from './features/admin/reports/report-list/report-list';
import { ReportDetail } from './features/admin/reports/report-detail/report-detail';
import { ActivityLogList } from './features/admin/activity-logs/activity-log-list/activity-log-list';
import { Dashboard } from './features/emergency/dashboard/dashboard';
import { Calls } from './features/emergency/calls/calls';
import { DepartmentRouting } from './features/emergency/department-routing/department-routing';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'calls', component: Calls },
      { path: 'department-routing', component: DepartmentRouting },
      { path: 'users', component: UserList },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm },
      { path: 'reports', component: ReportList },
      { path: 'reports/:id', component: ReportDetail },
      { path: 'activity-logs', component: ActivityLogList },
    ],
  },
];