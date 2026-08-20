import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardFacade } from './dashboard.facade';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { MetricCardComponent } from '../../shared/ui/metric-card/metric-card.component';
import type { CashFlowPoint, CurrencyCode } from './dashboard.models';

@Component({
  selector: 'app-dashboard-page',
  imports: [PageHeaderComponent, PanelComponent, MetricCardComponent, RouterLink],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  protected readonly facade = inject(DashboardFacade);
  protected readonly summary = computed(() => this.facade.summary());
  protected readonly cashFlows = computed(() => this.facade.cashFlows());
  protected readonly expenseAnalyses = computed(() => this.facade.expenseAnalyses());
  protected readonly insights = computed(() => this.facade.insights());
  protected readonly activeCashFlow = computed(() => this.facade.activeCashFlow());
  protected readonly activeExpenseAnalysis = computed(() => this.facade.activeExpenseAnalysis());

  protected selectCurrency(currency: CurrencyCode): void {
    this.facade.selectCurrency(currency);
  }

  protected isSelected(currency: CurrencyCode): boolean {
    return this.facade.selectedCurrency() === currency;
  }

  protected linePoints(points: CashFlowPoint[], key: keyof CashFlowPoint): string {
    const bounds = this.calculateChartBounds(points);

    return points
      .map((point, index) => {
        const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 100;
        const value = point[key] as number;
        const y = 100 - ((value - bounds.min) / (bounds.max - bounds.min || 1)) * 100;
        return `${x},${y}`;
      })
      .join(' ');
  }

  protected expenseEvolutionMax(values: { amount: number }[]): number {
    return Math.max(...values.map((point) => point.amount));
  }

  private calculateChartBounds(points: CashFlowPoint[]): { min: number; max: number } {
    const values = points.flatMap((point) => [point.income, point.expenses, point.net]);
    const min = Math.min(...values);
    const max = Math.max(...values);

    const padding = (max - min) * 0.12 || 1;
    return { min: min - padding, max: max + padding };
  }
}
