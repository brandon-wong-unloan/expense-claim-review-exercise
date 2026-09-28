import type { ExpenseLine } from '@/types/expenses';

const currency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

/**
 * Finance pays out in whole dollars, so we never display cents. A line that
 * hasn't been filled in yet shows a dash rather than a fabricated zero.
 */
export function formatAmount(amount: number | null): string {
  if (amount === null || !Number.isFinite(amount)) return '—';
  return currency.format(amount);
}

/**
 * `||` rather than `??` on purpose: a description of "" or "   " should fall
 * back to the placeholder, not render as an empty row label.
 */
export function describeLine(line: ExpenseLine): string {
  return line.description?.trim() || 'Untitled expense';
}

/** Running total for the on-screen summary. */
export function claimTotal(lines: ExpenseLine[]): number {
  return lines.reduce((sum, line) => sum + (line.amount ?? 0), 0);
}
