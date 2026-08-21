import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardFacade } from './dashboard.facade';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { MetricCardComponent } from '../../shared/ui/metric-card/metric-card.component';
import type { CurrencyCode } from './dashboard.models';

@Component({
  selector: 'app-dashboard-page',
  imports: [PageHeaderComponent, PanelComponent, MetricCardComponent, RouterLink],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  protected readonly facade = inject(DashboardFacade);

  protected selectCurrency(currency: CurrencyCode): void {
    this.facade.selectCurrency(currency);
  }

  protected expenseEvolutionMax(values: { amount: number }[]): number {
    return Math.max(...values.map((point) => point.amount));
  }
}
