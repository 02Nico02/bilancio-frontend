import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { MetricCardComponent } from '../../shared/ui/metric-card/metric-card.component';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';
import { PanelComponent } from '../../shared/ui/panel/panel.component';
import { MovementsFacade } from './movements.facade';
import type {
  MovementAccountFilter,
  MovementCategoryFilter,
  MovementCurrencyFilter,
  MovementFilterChipKey,
  MovementListItem,
  MovementSortField,
  MovementTypeFilter,
} from './movements.models';
import {
  MOVEMENT_CURRENCY_OPTIONS,
  MOVEMENT_TYPE_OPTIONS,
} from './movements.models';

type MovementsFormValue = {
  search: string;
  dateFrom: string;
  dateTo: string;
  type: MovementTypeFilter;
  currency: MovementCurrencyFilter;
  account: MovementAccountFilter;
  category: MovementCategoryFilter;
};

const DEFAULT_FORM_VALUE: MovementsFormValue = {
  search: '',
  dateFrom: '',
  dateTo: '',
  type: 'all',
  currency: 'all',
  account: 'all',
  category: 'all',
};

@Component({
  selector: 'app-movements-page',
  imports: [PageHeaderComponent, PanelComponent, MetricCardComponent, IconComponent, ReactiveFormsModule],
  templateUrl: './movements-page.component.html',
  styleUrl: './movements-page.component.scss',
})
export class MovementsPageComponent {
  protected readonly facade = inject(MovementsFacade);
  protected readonly typeOptions = MOVEMENT_TYPE_OPTIONS;
  protected readonly currencyOptions = MOVEMENT_CURRENCY_OPTIONS;
  private readonly fb = inject(FormBuilder);

  protected readonly filterForm = this.fb.nonNullable.group(DEFAULT_FORM_VALUE);

  constructor() {
    this.filterForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.pushFilters());
  }

  protected readonly sortFields: readonly MovementSortField[] = ['date', 'amount'];

  protected pushFilters(): void {
    const value = this.filterForm.getRawValue();

    this.facade.applyFilters({
      search: value.search.trim(),
      dateFrom: value.dateFrom,
      dateTo: value.dateTo,
      type: value.type,
      currency: value.currency,
      account: value.account,
      category: value.category,
    });
  }

  protected clearFilter(key: MovementFilterChipKey): void {
    switch (key) {
      case 'search':
        this.filterForm.controls.search.setValue('', { emitEvent: false });
        break;
      case 'dateFrom':
      case 'dateTo':
        this.filterForm.patchValue({ dateFrom: '', dateTo: '' }, { emitEvent: false });
        break;
      case 'type':
        this.filterForm.controls.type.setValue('all', { emitEvent: false });
        break;
      case 'currency':
        this.filterForm.controls.currency.setValue('all', { emitEvent: false });
        break;
      case 'account':
        this.filterForm.controls.account.setValue('all', { emitEvent: false });
        break;
      case 'category':
        this.filterForm.controls.category.setValue('all', { emitEvent: false });
        break;
    }

    this.pushFilters();
  }

  protected clearAllFilters(): void {
    this.filterForm.setValue(DEFAULT_FORM_VALUE, { emitEvent: false });
    this.pushFilters();
  }

  protected selectMovement(movement: MovementListItem): void {
    this.facade.selectMovement(movement);
  }

  protected closeDrawer(): void {
    this.facade.closeDrawer();
  }

  protected setSort(field: MovementSortField): void {
    this.facade.setSort(field);
  }

  protected sortIcon(field: MovementSortField): 'sort' | 'sort-up' | 'sort-down' {
    const sort = this.facade.sort();

    if (sort.field !== field) {
      return 'sort';
    }

    return sort.direction === 'desc' ? 'sort-down' : 'sort-up';
  }

  protected ariaSort(field: MovementSortField): 'ascending' | 'descending' | 'none' {
    const sort = this.facade.sort();

    if (sort.field !== field) {
      return 'none';
    }

    return sort.direction === 'desc' ? 'descending' : 'ascending';
  }

  protected rowKeydown(event: KeyboardEvent, movement: MovementListItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectMovement(movement);
    }
  }

  protected amountLabel(movement: MovementListItem): string {
    if (movement.kind === 'exchange') {
      return `${movement.fromAmountLabel} → ${movement.toAmountLabel}`;
    }

    return movement.amountLabel;
  }

  protected accountLabel(movement: MovementListItem): string {
    if (movement.kind === 'transfer') {
      const from = movement.fromAccountLabel ?? 'Sin cuenta';
      const to = movement.toAccountLabel ?? 'Sin cuenta';
      return `${from} → ${to}`;
    }

    if (movement.kind === 'exchange') {
      const from = movement.fromAccountLabel ?? 'Sin cuenta';
      const to = movement.toAccountLabel ?? 'Sin cuenta';
      return `${from} → ${to}`;
    }

    return movement.accountLabel ?? 'Sin cuenta';
  }

  protected categoryTrailLabel(movement: MovementListItem): string {
    const category = movement.categoryLabel?.trim();
    const subcategory = movement.subcategoryLabel?.trim();

    if (!category) {
      return '—';
    }

    return subcategory ? `${category} › ${subcategory}` : category;
  }

  protected trackById(_: number, movement: MovementListItem): string {
    return movement.id;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.facade.drawerOpen()) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      this.closeDrawer();
      return;
    }

    if (target.closest('.movements-row, .movement-card, .movements-drawer, .movements-drawer-backdrop')) {
      return;
    }

    this.closeDrawer();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.facade.drawerOpen()) {
      this.closeDrawer();
    }
  }
}
