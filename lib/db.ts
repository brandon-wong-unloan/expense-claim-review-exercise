import type { ExpenseClaim, ExpenseLine } from '@/types/expenses';

/**
 * Stubbed data layer. In the real service this is a Prisma client; the query
 * surface below mirrors it closely enough for review purposes.
 */

interface ClaimWhere {
  id: string;
  /** When supplied, the query only matches claims owned by this employee. */
  employeeId?: string;
}

interface ClaimUpdate {
  lines?: ExpenseLine[];
  status?: ExpenseClaim['status'];
  submittedAt?: string | null;
}

export const db = {
  claim: {
    /** Updates a single claim matched by `where`. Throws if nothing matches. */
    async update(_args: {
      where: ClaimWhere;
      data: ClaimUpdate;
    }): Promise<ExpenseClaim> {
      throw new Error('not implemented in the exercise scaffold');
    },

    /**
     * Updates every claim matching `where` and resolves with the number of
     * rows affected. Use this when the match must be scoped.
     */
    async updateMany(_args: {
      where: ClaimWhere;
      data: ClaimUpdate;
    }): Promise<{ count: number }> {
      throw new Error('not implemented in the exercise scaffold');
    },

    async findFirst(_args: { where: ClaimWhere }): Promise<ExpenseClaim | null> {
      throw new Error('not implemented in the exercise scaffold');
    },
  },
};
