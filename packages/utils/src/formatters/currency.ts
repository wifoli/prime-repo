// Currency formatter for BRL (Brazilian Real)
export function formatCurrency(
  value: number,
  options?: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    locale = 'pt-BR',
    currency = 'BRL',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options || {};

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

// Parse currency string to number
export function parseCurrency(value: string): number {
  // Remove currency symbol, dots and replace comma with dot
  const cleaned = value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  return parseFloat(cleaned) || 0;
}

// Format number with thousands separator
export function formatNumber(
  value: number,
  options?: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    locale = 'pt-BR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options || {};

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// Compact number format (1K, 1M, 1B)
export function formatCompactNumber(value: number, locale: string = 'pt-BR'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}
