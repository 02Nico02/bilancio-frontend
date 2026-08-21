import { inject, Injectable, computed, signal } from '@angular/core';
import type { CurrencyCode, DashboardSummary } from './dashboard.models';
import { DASHBOARD_DATA_SOURCE } from './dashboard.data-source';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private readonly dataSource = inject(DASHBOARD_DATA_SOURCE);
  private readonly summarySignal = signal<DashboardSummary>(this.dataSource.load());
  readonly selectedCurrency = signal<CurrencyCode>('ARS');

  readonly summary = this.summarySignal.asReadonly();
  readonly cashFlows = computed(() => this.summarySignal().cashFlows);
  readonly expenseAnalyses = computed(() => this.summarySignal().expenseAnalyses);
  readonly insights = computed(() => this.summarySignal().insights);

  readonly activeExpenseAnalysis = computed(
    () =>
      this.expenseAnalyses().find((item) => item.currency === this.selectedCurrency()) ??
      this.expenseAnalyses()[0],
  );

  selectCurrency(currency: CurrencyCode): void {
    this.selectedCurrency.set(currency);
  }
}
