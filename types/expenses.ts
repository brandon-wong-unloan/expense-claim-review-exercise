export type ExpenseCategory =
  | 'travel'
  | 'accommodation'
  | 'meals'
  | 'equipment'
  | 'other';

export interface ExpenseLine {
  id: string;
  category: ExpenseCategory;
  description: string;
  /** Amount in whole dollars. Finance rounds to the dollar on payout. */
  amount: number | null;
}

export interface ExpenseClaim {
  id: string;
  employeeId: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  lines: ExpenseLine[];
  submittedAt: string | null;
}

export interface Session {
  employeeId: string;
  email: string;
  role: 'employee' | 'finance';
}
