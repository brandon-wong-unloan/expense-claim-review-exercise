import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import type { ExpenseCategory, ExpenseLine } from '@/types/expenses';

const VALID_CATEGORIES: ExpenseCategory[] = [
  'travel', 'accommodation', 'meals', 'equipment', 'other',
];
const ALLOWED_KEYS = ['id', 'category', 'description', 'amount'];
const MAX_LINES = 50;
const MAX_AMOUNT = 100_000;
/** Rejects anything that isn't a well-formed line. */
function parseLines(input: unknown): ExpenseLine[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  if (input.length > MAX_LINES) return null;
  const lines: ExpenseLine[] = [];
  for (const raw of input) {
    if (typeof raw !== 'object' || raw === null) return null;
    if (Object.keys(raw).some((k) => !ALLOWED_KEYS.includes(k))) return null;
    const { id, category, description, amount } = raw as Record<string, unknown>;
    if (typeof id !== 'string' || id.length === 0) return null;
    if (typeof description !== 'string' || description.length > 280) return null;
    if (!VALID_CATEGORIES.includes(category as ExpenseCategory)) return null;
    if (typeof amount !== 'number' || !Number.isFinite(amount)) return null;
    if (amount < 0 || amount > MAX_AMOUNT) return null;
    lines.push({ id, category: category as ExpenseCategory, description, amount });
  }
  return lines;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const lines = parseLines(body?.lines);
  if (!lines) {
    return Response.json({ ok: false, error: 'invalid_lines' }, { status: 400 });
  }
  const claim = await db.claim.update({
    where: { id },
    data: { lines },
  });
  return Response.json({ ok: true, claim });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const { count } = await db.claim.updateMany({
    where: { id, employeeId: session.employeeId },
    data: { status: 'draft', submittedAt: null },
  });
  if (count === 0) {
    return Response.json({ ok: false, error: 'not_found' }, { status: 404 });
  }
  return Response.json({ ok: true });
}
