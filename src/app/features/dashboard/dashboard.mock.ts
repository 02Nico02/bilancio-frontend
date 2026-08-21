import type {
  DashboardSummary,
  ExpenseAnalysisView,
  CashFlowView,
  CurrencyCode,
} from './dashboard.models';
import { formatCurrencyAmount, formatShortPercent } from '../../shared/utils/formatters';

const makeMoney = (currency: CurrencyCode, amount: number) => ({
  amount,
  amountLabel: formatCurrencyAmount(amount, currency),
  currency,
  currencyLabel: currency,
});

const arsCashFlow: CashFlowView = {
  currency: 'ARS',
  currencyLabel: 'ARS',
  income: makeMoney('ARS', 4860000),
  expenses: makeMoney('ARS', 2410000),
  net: makeMoney('ARS', 2450000),
  variationLabel: `${formatShortPercent(4.2)} vs mes anterior`,
  variationTone: 'favorable',
};

const usdCashFlow: CashFlowView = {
  currency: 'USD',
  currencyLabel: 'USD',
  income: makeMoney('USD', 2480),
  expenses: makeMoney('USD', 1310),
  net: makeMoney('USD', 1170),
  variationLabel: `${formatShortPercent(-1.8)} vs mes anterior`,
  variationTone: 'unfavorable',
};

const expenseAnalyses: ExpenseAnalysisView[] = [
  {
    currency: 'ARS',
    currencyLabel: 'ARS',
    total: makeMoney('ARS', 2410000),
    selectorLabel: 'Gastos en ARS',
    categories: [
      {
        label: 'Vivienda',
      amount: makeMoney('ARS', 930000),
      sharePercent: 38.6,
      trendLabel: '+2.4% vs mes anterior',
      trendTone: 'warning',
    },
    {
      label: 'Alimentación',
      amount: makeMoney('ARS', 498000),
      sharePercent: 20.7,
      trendLabel: '-1.2% vs mes anterior',
      trendTone: 'favorable',
    },
    {
      label: 'Transporte',
      amount: makeMoney('ARS', 312000),
      sharePercent: 12.9,
      trendLabel: '+5.1% vs mes anterior',
      trendTone: 'unfavorable',
    },
    {
      label: 'Servicios',
      amount: makeMoney('ARS', 286000),
      sharePercent: 11.9,
      trendLabel: '+0.8% vs mes anterior',
      trendTone: 'neutral',
    },
  ],
    monthlyEvolution: [
      { periodLabel: 'Mar', amount: 2140000, amountLabel: '$ 2,14 M' },
      { periodLabel: 'Abr', amount: 2240000, amountLabel: '$ 2,24 M' },
      { periodLabel: 'May', amount: 2190000, amountLabel: '$ 2,19 M' },
      { periodLabel: 'Jun', amount: 2330000, amountLabel: '$ 2,33 M' },
      { periodLabel: 'Jul', amount: 2410000, amountLabel: '$ 2,41 M' },
    ],
  },
  {
    currency: 'USD',
    currencyLabel: 'USD',
    total: makeMoney('USD', 1310),
    selectorLabel: 'Gastos en USD',
    categories: [
      {
        label: 'Suscripciones',
      amount: makeMoney('USD', 390),
      sharePercent: 29.8,
      trendLabel: '+0.5% vs mes anterior',
      trendTone: 'warning',
    },
    {
      label: 'Movilidad',
      amount: makeMoney('USD', 280),
      sharePercent: 21.4,
      trendLabel: '-3.0% vs mes anterior',
      trendTone: 'favorable',
    },
    {
      label: 'Salud',
      amount: makeMoney('USD', 190),
      sharePercent: 14.5,
      trendLabel: '+1.7% vs mes anterior',
      trendTone: 'neutral',
    },
    {
      label: 'Estudios',
      amount: makeMoney('USD', 160),
      sharePercent: 12.2,
      trendLabel: '+6.1% vs mes anterior',
      trendTone: 'warning',
    },
  ],
    monthlyEvolution: [
      { periodLabel: 'Mar', amount: 1180, amountLabel: 'US$ 1.180' },
      { periodLabel: 'Abr', amount: 1230, amountLabel: 'US$ 1.230' },
      { periodLabel: 'May', amount: 1250, amountLabel: 'US$ 1.250' },
      { periodLabel: 'Jun', amount: 1280, amountLabel: 'US$ 1.280' },
      { periodLabel: 'Jul', amount: 1310, amountLabel: 'US$ 1.310' },
    ],
  },
];

export const DASHBOARD_MOCK_SUMMARY: DashboardSummary = {
  cashFlows: [arsCashFlow, usdCashFlow],
  purchasingPower: {
    baseDateLabel: 'Base: enero 2026',
    variationLabel: '+4,2%',
    variationTone: 'favorable',
    usdBlueLabel: 'USD Blue: US$ 1.240',
    inflationLabel: 'Inflación mensual: +3,1%',
    referenceSalaryLabel: 'Sueldo de referencia: $ 1.860.000',
    ctaLabel: 'Ver análisis',
    ctaHref: '/analisis/poder-adquisitivo',
  },
  expenseAnalyses,
  insights: [
    {
      title: 'Transporte subió respecto del período anterior',
      detail:
        'El incremento se concentra en traslados presenciales y no modifica el patrón general del mes.',
      tone: 'warning',
    },
    {
      title: 'Vivienda sigue siendo el bloque más pesado en ARS',
      detail:
        'La participación relativa permanece estable, aunque eleva la presión sobre el gasto fijo mensual.',
      tone: 'neutral',
    },
    {
      title: 'USD mantiene margen positivo, pero con menor holgura',
      detail:
        'La combinación de ingresos estables y más gasto recurrente reduce la distancia con la base elegida.',
      tone: 'info',
    },
  ],
};
