import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { AdminLayout } from './shared/components/admin-layout/admin-layout';
import { UserList } from './features/admin/user-management/user-list/user-list';
import { UserForm } from './features/admin/user-management/user-form/user-form';
import { ReportList } from './features/admin/reports/report-list/report-list';
import { ReportDetail } from './features/admin/reports/report-detail/report-detail';
import { ActivityLogList } from './features/admin/activity-logs/activity-log-list/activity-log-list';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: 'users', component: UserList },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm },
      { path: 'reports', component: ReportList },
      { path: 'reports/:id', component: ReportDetail },
      { path: 'activity-logs', component: ActivityLogList },
    ],
  },
];