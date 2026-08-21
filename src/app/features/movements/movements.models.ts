import type { CurrencyCode, FinancialTone } from '../dashboard/dashboard.models';

export type MovementType = 'income' | 'expense' | 'transfer' | 'exchange';
export type MovementTypeFilter = MovementType | 'all';
export type MovementCurrencyFilter = CurrencyCode | 'all';
export type MovementAccountFilter = string | 'all' | 'missing';
export type MovementCategoryFilter = string | 'all' | 'missing';
export type MovementSortField = 'date' | 'amount';
export type MovementSortDirection = 'asc' | 'desc';

export interface MovementSelectOption<T extends string = string> {
  value: T;
  label: string;
}

export interface MovementFilters {
  search: string;
  dateFrom: string;
  dateTo: string;
  type: MovementTypeFilter;
  currency: MovementCurrencyFilter;
  account: MovementAccountFilter;
  category: MovementCategoryFilter;
}

export interface MovementSort {
  field: MovementSortField;
  direction: MovementSortDirection;
}

export interface MovementBase {
  id: string;
  date: string;
  dateLabel: string;
  kind: MovementType;
  kindLabel: string;
  kindTone: FinancialTone;
  kindIcon: MovementIconName;
  description: string;
  notes: string | null;
  categoryLabel: string | null;
  subcategoryLabel: string | null;
  amount: number;
  amountLabel: string;
}

export interface IncomeMovementItem extends MovementBase {
  kind: 'income';
  currency: CurrencyCode;
  accountLabel: string | null;
  sourceLabel: string | null;
}

export interface ExpenseMovementItem extends MovementBase {
  kind: 'expense';
  currency: CurrencyCode;
  accountLabel: string | null;
  sourceLabel: string | null;
}

export interface TransferMovementItem extends MovementBase {
  kind: 'transfer';
  currency: CurrencyCode;
  fromAccountLabel: string | null;
  toAccountLabel: string | null;
  counterpartyLabel: string | null;
}

export interface ExchangeMovementItem extends MovementBase {
  kind: 'exchange';
  fromCurrency: CurrencyCode;
  fromAmount: number;
  fromAmountLabel: string;
  toCurrency: CurrencyCode;
  toAmount: number;
  toAmountLabel: string;
  fromAccountLabel: string | null;
  toAccountLabel: string | null;
  commissionLabel: string | null;
}

export type MovementListItem =
  | IncomeMovementItem
  | ExpenseMovementItem
  | TransferMovementItem
  | ExchangeMovementItem;

export type MovementIconName =
  | 'income'
  | 'expense'
  | 'transfer'
  | 'exchange'
  | 'search'
  | 'filter'
  | 'sort'
  | 'sort-up'
  | 'sort-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'close';

export interface MovementCurrencySummary {
  currency: CurrencyCode;
  currencyLabel: string;
  income: number;
  incomeLabel: string;
  expenses: number;
  expensesLabel: string;
  net: number;
  netLabel: string;
  netTone: FinancialTone;
}

export interface MovementSummary {
  totalCount: number;
  filteredCountLabel: string;
  periodLabel: string;
  currencies: MovementCurrencySummary[];
}

export interface MovementPage {
  items: MovementListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  rangeLabel: string;
  summary: MovementSummary;
}

export interface MovementFilterChip {
  key: MovementFilterChipKey;
  label: string;
}

export type MovementFilterChipKey =
  | 'search'
  | 'dateFrom'
  | 'dateTo'
  | 'type'
  | 'currency'
  | 'account'
  | 'category';

export const MOVEMENT_TYPE_OPTIONS: readonly MovementSelectOption<MovementTypeFilter>[] = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'income', label: 'Ingresos' },
  { value: 'expense', label: 'Gastos' },
  { value: 'transfer', label: 'Transferencias' },
  { value: 'exchange', label: 'Cambios de moneda' },
];

export const MOVEMENT_CURRENCY_OPTIONS: readonly MovementSelectOption<MovementCurrencyFilter>[] = [
  { value: 'all', label: 'Todas las monedas' },
  { value: 'ARS', label: 'ARS' },
  { value: 'USD', label: 'USD' },
];
