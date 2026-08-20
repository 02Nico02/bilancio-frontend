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
  variationLabel: `${formatShortPercent(4.2)} vs enero 2026`,
  variationTone: 'favorable',
  note: 'La variación mejora por mayor ingreso recurrente y menor presión de gastos no esenciales.',
  basePeriodLabel: 'Base: enero 2026',
  series: [
    { periodLabel: 'Feb', income: 3920000, expenses: 2180000, net: 1740000 },
    { periodLabel: 'Mar', income: 4080000, expenses: 2260000, net: 1820000 },
    { periodLabel: 'Abr', income: 4240000, expenses: 2210000, net: 2030000 },
    { periodLabel: 'May', income: 4520000, expenses: 2310000, net: 2210000 },
    { periodLabel: 'Jun', income: 4680000, expenses: 2330000, net: 2350000 },
    { periodLabel: 'Jul', income: 4860000, expenses: 2410000, net: 2450000 },
  ],
};

const usdCashFlow: CashFlowView = {
  currency: 'USD',
  currencyLabel: 'USD',
  income: makeMoney('USD', 2480),
  expenses: makeMoney('USD', 1310),
  net: makeMoney('USD', 1170),
  variationLabel: `${formatShortPercent(-1.8)} vs enero 2026`,
  variationTone: 'unfavorable',
  note: 'La caída refleja más gasto en servicios en moneda dura y menos margen en el mes.',
  basePeriodLabel: 'Base: enero 2026',
  series: [
    { periodLabel: 'Feb', income: 2100, expenses: 1140, net: 960 },
    { periodLabel: 'Mar', income: 2190, expenses: 1190, net: 1000 },
    { periodLabel: 'Abr', income: 2290, expenses: 1230, net: 1060 },
    { periodLabel: 'May', income: 2360, expenses: 1270, net: 1090 },
    { periodLabel: 'Jun', income: 2420, expenses: 1280, net: 1140 },
    { periodLabel: 'Jul', income: 2480, expenses: 1310, net: 1170 },
  ],
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
        note: 'El alquiler empuja la mayor parte del gasto fijo.',
      },
      {
        label: 'Alimentación',
        amount: makeMoney('ARS', 498000),
        sharePercent: 20.7,
        trendLabel: '-1.2% vs mes anterior',
        trendTone: 'favorable',
        note: 'Más estable que el período previo.',
      },
      {
        label: 'Transporte',
        amount: makeMoney('ARS', 312000),
        sharePercent: 12.9,
        trendLabel: '+5.1% vs mes anterior',
        trendTone: 'unfavorable',
        note: 'El aumento responde a más traslados presenciales.',
      },
      {
        label: 'Servicios',
        amount: makeMoney('ARS', 286000),
        sharePercent: 11.9,
        trendLabel: '+0.8% vs mes anterior',
        trendTone: 'neutral',
        note: 'Comportamiento estable.',
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
        note: 'Se concentra en servicios recurrentes.',
      },
      {
        label: 'Movilidad',
        amount: makeMoney('USD', 280),
        sharePercent: 21.4,
        trendLabel: '-3.0% vs mes anterior',
        trendTone: 'favorable',
        note: 'Menor exposición que el período previo.',
      },
      {
        label: 'Salud',
        amount: makeMoney('USD', 190),
        sharePercent: 14.5,
        trendLabel: '+1.7% vs mes anterior',
        trendTone: 'neutral',
        note: 'Gasto contextual sin tendencia marcada.',
      },
      {
        label: 'Estudios',
        amount: makeMoney('USD', 160),
        sharePercent: 12.2,
        trendLabel: '+6.1% vs mes anterior',
        trendTone: 'warning',
        note: 'Incremento asociado a una carga puntual.',
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
  generatedAtLabel: 'Actualizado hace 6 min',
  cashFlows: [arsCashFlow, usdCashFlow],
  purchasingPower: {
    baseDateLabel: 'Base: enero 2026',
    variationLabel: '+4,2%',
    variationTone: 'favorable',
    usdBlueLabel: 'USD Blue: US$ 1.240',
    inflationLabel: 'Inflación mensual: +3,1%',
    referenceSalaryLabel: 'Sueldo de referencia: $ 1.860.000',
    detailLabel: 'La lectura compara el ingreso real con el nivel requerido para sostener el poder adquisitivo desde la base elegida.',
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
