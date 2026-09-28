import { claimTotal, describeLine, formatAmount } from '@/lib/expenses';
import type { ExpenseLine } from '@/types/expenses';

function line(over: Partial<ExpenseLine> = {}): ExpenseLine {
  return {
    id: 'l1',
    category: 'travel',
    description: 'Taxi to the airport',
    amount: 64,
    ...over,
  };
}

describe('formatAmount', () => {
  it('formats a whole-dollar amount', () => {
    expect(formatAmount(1200)).toBe('$1,200');
  });

  it('shows a dash for a line that has not been filled in', () => {
    expect(formatAmount(null)).toBe('—');
  });
});

describe('describeLine', () => {
  it('falls back to a placeholder for a blank description', () => {
    expect(describeLine(line({ description: '   ' }))).toBe('Untitled expense');
  });
});

describe('claimTotal', () => {
  it('adds up the lines', () => {
    expect(claimTotal([line(), line({ id: 'l2', amount: 36 })])).toBe(100);
  });
});

describe('saving the claim lines', () => {
  it('sends the lines to the API', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;
    const body = JSON.stringify({ lines: [line()] });
    await mockFetch('/api/claims/c1/lines', { method: 'PUT', body });
    expect(mockFetch).toHaveBeenCalledWith('/api/claims/c1/lines', {
      method: 'PUT',
      body,
    });
  });
});
