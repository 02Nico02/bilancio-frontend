import { inject, Injectable, signal } from '@angular/core';
import type { CurrencyCode, DashboardSummary } from './dashboard.models';
import { DASHBOARD_DATA_SOURCE } from './dashboard.data-source';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private readonly dataSource = inject(DASHBOARD_DATA_SOURCE);
  private readonly summarySignal = signal<DashboardSummary>(this.dataSource.load());
  readonly selectedCurrency = signal<CurrencyCode>('ARS');

  readonly summary = this.summarySignal.asReadonly();

  readonly cashFlows = () => this.summarySignal().cashFlows;
  readonly expenseAnalyses = () => this.summarySignal().expenseAnalyses;
  readonly insights = () => this.summarySignal().insights;

  readonly activeCashFlow = () =>
    this.summarySignal().cashFlows.find((item) => item.currency === this.selectedCurrency()) ??
    this.summarySignal().cashFlows[0];

  readonly activeExpenseAnalysis = () =>
    this.summarySignal().expenseAnalyses.find(
      (item) => item.currency === this.selectedCurrency(),
    ) ?? this.summarySignal().expenseAnalyses[0];

  selectCurrency(currency: CurrencyCode): void {
    this.selectedCurrency.set(currency);
  }
}

