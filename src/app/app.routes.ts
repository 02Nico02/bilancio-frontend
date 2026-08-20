import { Routes } from '@angular/router';
import { AppShellComponent } from './core/layout/app-shell.component';
import { AnalysisShellComponent } from './features/analysis/analysis-shell.component';
import { FlowGastosPlaceholderComponent } from './features/analysis/flow-gastos-placeholder.component';
import { PurchasingPowerPlaceholderComponent } from './features/analysis/poder-adquisitivo-placeholder.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { MovementsPageComponent } from './features/movements/movements-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'movimientos', component: MovementsPageComponent },
      {
        path: 'analisis',
        component: AnalysisShellComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'flujo-gastos' },
          { path: 'flujo-gastos', component: FlowGastosPlaceholderComponent },
          { path: 'poder-adquisitivo', component: PurchasingPowerPlaceholderComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
