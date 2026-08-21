export type CurrencyCode = 'ARS' | 'USD';

export type FinancialTone = 'neutral' | 'favorable' | 'unfavorable' | 'warning' | 'info';

export interface MoneyDisplay {
  amount: number;
  amountLabel: string;
  currency: CurrencyCode;
  currencyLabel: string;
}

export interface CashFlowView {
  currency: CurrencyCode;
  currencyLabel: string;
  income: MoneyDisplay;
  expenses: MoneyDisplay;
  net: MoneyDisplay;
  variationLabel: string;
  variationTone: FinancialTone;
  basePeriodLabel: string;
}

export interface PurchasingPowerSummary {
  baseDateLabel: string;
  variationLabel: string;
  variationTone: FinancialTone;
  usdBlueLabel: string;
  inflationLabel: string;
  referenceSalaryLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ExpenseCategorySummary {
  label: string;
  amount: MoneyDisplay;
  sharePercent: number;
  trendLabel: string;
  trendTone: FinancialTone;
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
  cashFlows: CashFlowView[];
  purchasingPower: PurchasingPowerSummary;
  expenseAnalyses: ExpenseAnalysisView[];
  insights: Insight[];
}
