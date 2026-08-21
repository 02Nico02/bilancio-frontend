import { inject, Injectable, computed, signal } from '@angular/core';
import { formatCurrencyAmount } from '../../shared/utils/formatters';
import { MOVEMENTS_DATA_SOURCE } from './movements.data-source';
import type {
  MovementAccountFilter,
  MovementCategoryFilter,
  MovementCurrencyFilter,
  MovementFilterChip,
  MovementFilters,
  MovementListItem,
  MovementSort,
  MovementSortDirection,
  MovementSortField,
  MovementSummary,
  MovementCurrencySummary,
  MovementTypeFilter,
} from './movements.models';

const PAGE_SIZE = 8;
const DEFAULT_FILTERS: MovementFilters = {
  search: '',
  dateFrom: '',
  dateTo: '',
  type: 'all',
  currency: 'all',
  account: 'all',
  category: 'all',
};

const DEFAULT_SORT: MovementSort = {
  field: 'date',
  direction: 'desc',
};

const lower = (value: string): string =>
  value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const formatDateLabel = (value: string): string =>
  new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`));

const compareDates = (left: string, right: string): number => left.localeCompare(right);

const isMissing = (value: string | null | undefined): boolean => !value || value.trim().length === 0;

const matchesText = (item: MovementListItem, query: string): boolean => {
  if (!query) {
    return true;
  }

  const haystack = lower(
    [
      item.description,
      item.notes ?? '',
      item.dateLabel,
      item.kindLabel,
      item.categoryLabel ?? '',
      item.subcategoryLabel ?? '',
      'accountLabel' in item ? item.accountLabel ?? '' : '',
      'sourceLabel' in item ? item.sourceLabel ?? '' : '',
      'fromAccountLabel' in item ? item.fromAccountLabel ?? '' : '',
      'toAccountLabel' in item ? item.toAccountLabel ?? '' : '',
      'counterpartyLabel' in item ? item.counterpartyLabel ?? '' : '',
      'commissionLabel' in item ? item.commissionLabel ?? '' : '',
      'fromAmountLabel' in item ? item.fromAmountLabel : '',
      'toAmountLabel' in item ? item.toAmountLabel : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  return haystack.includes(query);
};

const matchesDate = (item: MovementListItem, filters: MovementFilters): boolean => {
  if (filters.dateFrom && compareDates(item.date, filters.dateFrom) < 0) {
    return false;
  }

  if (filters.dateTo && compareDates(item.date, filters.dateTo) > 0) {
    return false;
  }

  return true;
};

const matchesType = (item: MovementListItem, type: MovementTypeFilter): boolean =>
  type === 'all' ? true : item.kind === type;

const matchesCurrency = (item: MovementListItem, currency: MovementCurrencyFilter): boolean => {
  if (currency === 'all') {
    return true;
  }

  if (item.kind === 'exchange') {
    return item.fromCurrency === currency || item.toCurrency === currency;
  }

  return item.currency === currency;
};

const matchesAccount = (item: MovementListItem, account: MovementAccountFilter): boolean => {
  if (account === 'all') {
    return true;
  }

  if (account === 'missing') {
    return (
      ('accountLabel' in item && isMissing(item.accountLabel)) ||
      ('fromAccountLabel' in item && isMissing(item.fromAccountLabel)) ||
      ('toAccountLabel' in item && isMissing(item.toAccountLabel))
    );
  }

  return (
    ('accountLabel' in item && item.accountLabel === account) ||
    ('fromAccountLabel' in item && item.fromAccountLabel === account) ||
    ('toAccountLabel' in item && item.toAccountLabel === account)
  );
};

const matchesCategory = (item: MovementListItem, category: MovementCategoryFilter): boolean => {
  if (category === 'all') {
    return true;
  }

  if (category === 'missing') {
    return isMissing(item.categoryLabel);
  }

  return item.categoryLabel === category;
};

const sortMovements = (items: readonly MovementListItem[], sort: MovementSort): MovementListItem[] => {
  const direction = sort.direction === 'asc' ? 1 : -1;

  return [...items].sort((left, right) => {
    const value =
      sort.field === 'date'
        ? compareDates(left.date, right.date)
        : (left.amount ?? 0) - (right.amount ?? 0);

    if (value !== 0) {
      return value * direction;
    }

    return left.description.localeCompare(right.description) * direction;
  });
};

const paginate = (
  items: readonly MovementListItem[],
  page: number,
  pageSize: number,
): MovementListItem[] => items.slice((page - 1) * pageSize, page * pageSize);

const createSummaryCurrency = (
  currency: 'ARS' | 'USD',
  items: readonly MovementListItem[],
): MovementCurrencySummary => {
  const income = items
    .filter((item): item is Extract<MovementListItem, { kind: 'income' }> => item.kind === 'income' && item.currency === currency)
    .reduce((total, item) => total + item.amount, 0);
  const expenses = items
    .filter(
      (item): item is Extract<MovementListItem, { kind: 'expense' }> =>
        item.kind === 'expense' && item.currency === currency,
    )
    .reduce((total, item) => total + item.amount, 0);
  const net = income - expenses;
  const netLabel = formatCurrencyAmount(Math.abs(net), currency);

  return {
    currency,
    currencyLabel: currency,
    income,
    incomeLabel: formatCurrencyAmount(income, currency),
    expenses,
    expensesLabel: formatCurrencyAmount(expenses, currency),
    net,
    netLabel: `${net > 0 ? '+' : net < 0 ? '-' : ''}${netLabel}`,
    netTone: net >= 0 ? 'favorable' : 'unfavorable',
  };
};

const buildSummary = (items: readonly MovementListItem[], totalCount: number): MovementSummary => ({
  totalCount,
  filteredCountLabel: totalCount === 1 ? '1 movimiento' : `${totalCount} movimientos`,
  periodLabel: 'Período filtrado',
  currencies: [createSummaryCurrency('ARS', items), createSummaryCurrency('USD', items)],
});

const buildFilterChips = (filters: MovementFilters): MovementFilterChip[] => {
  const chips: MovementFilterChip[] = [];

  if (filters.search) {
    chips.push({ key: 'search', label: `Búsqueda: ${filters.search}` });
  }

  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom ? formatDateLabel(filters.dateFrom) : 'inicio';
    const to = filters.dateTo ? formatDateLabel(filters.dateTo) : 'hoy';
    chips.push({ key: 'dateFrom', label: `Período: ${from} - ${to}` });
  }

  if (filters.type !== 'all') {
    chips.push({ key: 'type', label: `Tipo: ${filters.type}` });
  }

  if (filters.currency !== 'all') {
    chips.push({ key: 'currency', label: `Moneda: ${filters.currency}` });
  }

  if (filters.account !== 'all') {
    chips.push(
      filters.account === 'missing'
        ? { key: 'account', label: 'Cuenta: sin cuenta' }
        : { key: 'account', label: `Cuenta: ${filters.account}` },
    );
  }

  if (filters.category !== 'all') {
    chips.push(
      filters.category === 'missing'
        ? { key: 'category', label: 'Categoría: sin categoría' }
        : { key: 'category', label: `Categoría: ${filters.category}` },
    );
  }

  return chips;
};

@Injectable({ providedIn: 'root' })
export class MovementsFacade {
  private readonly dataSource = inject(MOVEMENTS_DATA_SOURCE);
  private readonly sourceItemsSignal = signal<readonly MovementListItem[]>(this.dataSource.load());
  private readonly filtersSignal = signal<MovementFilters>({ ...DEFAULT_FILTERS });
  private readonly sortSignal = signal<MovementSort>({ ...DEFAULT_SORT });
  private readonly pageSignal = signal(1);
  private readonly selectedMovementIdSignal = signal<string | null>(null);
  private readonly drawerOpenSignal = signal(false);

  readonly filters = this.filtersSignal.asReadonly();
  readonly sort = this.sortSignal.asReadonly();
  readonly page = this.pageSignal.asReadonly();
  readonly selectedMovementId = this.selectedMovementIdSignal.asReadonly();
  readonly drawerOpen = this.drawerOpenSignal.asReadonly();
  readonly sourceItems = this.sourceItemsSignal.asReadonly();

  readonly filteredMovements = computed(() => {
    const filters = this.filtersSignal();
    const query = lower(filters.search.trim());

    return this.sourceItemsSignal().filter(
      (item) =>
        matchesText(item, query) &&
        matchesDate(item, filters) &&
        matchesType(item, filters.type) &&
        matchesCurrency(item, filters.currency) &&
        matchesAccount(item, filters.account) &&
        matchesCategory(item, filters.category),
    );
  });

  readonly sortedMovements = computed(() => sortMovements(this.filteredMovements(), this.sortSignal()));
  readonly totalCount = computed(() => this.sortedMovements().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalCount() / PAGE_SIZE)));
  readonly currentPage = computed(() => Math.min(this.pageSignal(), this.totalPages()));
  readonly pageItems = computed(() => paginate(this.sortedMovements(), this.currentPage(), PAGE_SIZE));
  readonly selectedMovement = computed(
    () => this.sortedMovements().find((item) => item.id === this.selectedMovementIdSignal()) ?? null,
  );
  readonly summary = computed(() => buildSummary(this.filteredMovements(), this.totalCount()));
  readonly filterChips = computed(() => buildFilterChips(this.filtersSignal()));

  readonly pageRangeLabel = computed(() => {
    const total = this.totalCount();

    if (total === 0) {
      return '0 de 0';
    }

    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE + 1;
    const end = Math.min(page * PAGE_SIZE, total);
    return `${start}–${end} de ${total}`;
  });

  readonly accountOptions = computed(() => {
    const accounts = new Set<string>();
    let hasMissing = false;

    for (const item of this.sourceItemsSignal()) {
      if ('accountLabel' in item && item.accountLabel) {
        accounts.add(item.accountLabel);
      }

      if ('fromAccountLabel' in item && item.fromAccountLabel) {
        accounts.add(item.fromAccountLabel);
      }

      if ('toAccountLabel' in item && item.toAccountLabel) {
        accounts.add(item.toAccountLabel);
      }

      if (
        ('accountLabel' in item && !item.accountLabel) ||
        ('fromAccountLabel' in item && !item.fromAccountLabel) ||
        ('toAccountLabel' in item && !item.toAccountLabel)
      ) {
        hasMissing = true;
      }
    }

    return [
      { value: 'all' as const, label: 'Todas las cuentas' },
      ...Array.from(accounts)
        .sort((left, right) => left.localeCompare(right))
        .map((value) => ({ value, label: value })),
      ...(hasMissing ? [{ value: 'missing' as const, label: 'Sin cuenta' }] : []),
    ];
  });

  readonly categoryOptions = computed(() => {
    const categories = new Set<string>();
    let hasMissing = false;

    for (const item of this.sourceItemsSignal()) {
      if (item.categoryLabel) {
        categories.add(item.categoryLabel);
      } else {
        hasMissing = true;
      }
    }

    return [
      { value: 'all' as const, label: 'Todas las categorías' },
      ...Array.from(categories)
        .sort((left, right) => left.localeCompare(right))
        .map((value) => ({ value, label: value })),
      ...(hasMissing ? [{ value: 'missing' as const, label: 'Sin categoría' }] : []),
    ];
  });

  applyFilters(filters: MovementFilters): void {
    this.filtersSignal.set(filters);
    this.pageSignal.set(1);

    const selectedId = this.selectedMovementIdSignal();
    if (selectedId && !this.filteredMovements().some((item) => item.id === selectedId)) {
      this.resetSelection();
    }
  }

  clearAllFilters(): void {
    this.filtersSignal.set({ ...DEFAULT_FILTERS });
    this.pageSignal.set(1);
    this.resetSelection();
  }

  clearFilter(key: 'search' | 'dateFrom' | 'dateTo' | 'type' | 'currency' | 'account' | 'category'): void {
    const current = this.filtersSignal();
    const next = { ...current };

    switch (key) {
      case 'search':
      case 'dateFrom':
      case 'dateTo':
        next[key] = '';
        break;
      case 'type':
        next.type = 'all';
        break;
      case 'currency':
        next.currency = 'all';
        break;
      case 'account':
        next.account = 'all';
        break;
      case 'category':
        next.category = 'all';
        break;
    }

    this.filtersSignal.set(next);
    this.pageSignal.set(1);

    const selectedId = this.selectedMovementIdSignal();
    if (selectedId && !this.filteredMovements().some((item) => item.id === selectedId)) {
      this.resetSelection();
    }
  }

  setSort(field: MovementSortField): void {
    const current = this.sortSignal();
    const direction =
      current.field === field ? (current.direction === 'desc' ? 'asc' : 'desc') : ('desc' as MovementSortDirection);

    this.sortSignal.set({ field, direction });
  }

  setPage(page: number): void {
    const bounded = Math.max(1, Math.min(page, this.totalPages()));
    this.pageSignal.set(bounded);
  }

  selectMovement(movement: MovementListItem): void {
    this.selectedMovementIdSignal.set(movement.id);
    this.drawerOpenSignal.set(true);
  }

  closeDrawer(): void {
    this.drawerOpenSignal.set(false);
  }

  openDrawer(): void {
    if (this.selectedMovementIdSignal()) {
      this.drawerOpenSignal.set(true);
    }
  }

  resetSelection(): void {
    this.selectedMovementIdSignal.set(null);
    this.drawerOpenSignal.set(false);
  }
}
