'use client';

import { useState } from 'react';
import { claimTotal, formatAmount } from '@/lib/expenses';
import type { ExpenseLine } from '@/types/expenses';
interface Props {
  claimId: string;
  initialLines: ExpenseLine[];
}
export function ClaimLinesForm({ claimId, initialLines }: Props) {
  const [lines, setLines] = useState<ExpenseLine[]>(initialLines);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  function updateLine(id: string, patch: Partial<ExpenseLine>) {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  }
  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const line of lines) {
      if (!line.description.trim()) {
        next[line.id] = 'Add a short description of this expense.';
      } else if (line.amount !== null && line.amount < 0) {
        next[line.id] = 'Amount cannot be negative.';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await fetch(`/api/claims/${claimId}/lines`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lines: lines.map((line) => ({ ...line, amount: line.amount ?? 0 })),
      }),
    });
    setSaving(false);
    window.location.href = `/claims/${claimId}/review`;
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Your expenses</legend>
        {lines.map((line) => (
          <div key={line.id} className="line">
            <label htmlFor={`description-${line.id}`}>Description</label>
            <input
              id={`description-${line.id}`}
              type="text"
              value={line.description}
              onChange={(e) => updateLine(line.id, { description: e.target.value })}
            />
            <label htmlFor={`amount-${line.id}`}>Amount</label>
            <input
              id={`amount-${line.id}`}
              type="text"
              inputMode="decimal"
              value={line.amount ?? ''}
              onChange={(e) =>
                updateLine(line.id, { amount: parseFloat(e.target.value) })
              }
            />
            {errors[line.id] && <p className="error">{errors[line.id]}</p>}
          </div>
        ))}
      </fieldset>
      <p aria-live="polite">Claim total: {formatAmount(claimTotal(lines))}</p>
      <button type="submit">Save and continue</button>
    </form>
  );
}
