import { InjectionToken } from '@angular/core';
import type { DashboardSummary } from './dashboard.models';

export interface DashboardDataSource {
  load(): DashboardSummary;
}

export const DASHBOARD_DATA_SOURCE = new InjectionToken<DashboardDataSource>(
  'DASHBOARD_DATA_SOURCE',
);

