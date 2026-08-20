import type { CurrencyCode } from '../../features/dashboard/dashboard.models';

export function formatCurrencyAmount(
  amount: number,
  currency: CurrencyCode,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
): string {
  return new Intl.NumberFormat('es-AR', {
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    style: 'currency',
  }).format(amount);
}

export function formatPercent(value: number, digits = 1): string {
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    signDisplay: 'always',
  }).format(value) + '%';
}

export function formatShortPercent(value: number, digits = 1): string {
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    signDisplay: 'always',
  }).format(value) + '%';
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(value);
}

