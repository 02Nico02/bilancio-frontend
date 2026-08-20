export type CurrencyCode = 'ARS' | 'USD';

export type FinancialTone = 'neutral' | 'favorable' | 'unfavorable' | 'warning' | 'info';

export interface MoneyDisplay {
  amount: number;
  amountLabel: string;
  currency: CurrencyCode;
  currencyLabel: string;
}

export interface CashFlowPoint {
  periodLabel: string;
  income: number;
  expenses: number;
  net: number;
}

export interface CashFlowView {
  currency: CurrencyCode;
  currencyLabel: string;
  income: MoneyDisplay;
  expenses: MoneyDisplay;
  net: MoneyDisplay;
  variationLabel: string;
  variationTone: FinancialTone;
  note: string;
  basePeriodLabel: string;
  series: CashFlowPoint[];
}

export interface PurchasingPowerSummary {
  baseDateLabel: string;
  variationLabel: string;
  variationTone: FinancialTone;
  usdBlueLabel: string;
  inflationLabel: string;
  referenceSalaryLabel: string;
  detailLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ExpenseCategorySummary {
  label: string;
  amount: MoneyDisplay;
  sharePercent: number;
  trendLabel: string;
  trendTone: FinancialTone;
  note: string;
}

export interface MonthlyEvolutionPoint {
  periodLabel: string;
  amount: number;
  amountLabel: string;
}

export interface ExpenseAnalysisView {
  currency: CurrencyCode;
  currencyLabel: string;
  total: MoneyDisplay;
  selectorLabel: string;
  categories: ExpenseCategorySummary[];
  monthlyEvolution: MonthlyEvolutionPoint[];
}

export interface Insight {
  title: string;
  detail: string;
  tone: FinancialTone;
}

export interface DashboardSummary {
  generatedAtLabel: string;
  cashFlows: CashFlowView[];
  purchasingPower: PurchasingPowerSummary;
  expenseAnalyses: ExpenseAnalysisView[];
  insights: Insight[];
}

