import type { Session } from '@/types/expenses';

/**
 * Stubbed auth layer. In the real service this reads and verifies the session
 * cookie; here it is enough that it resolves to a `Session` or `null`.
 */
export async function getSession(): Promise<Session | null> {
  throw new Error('not implemented in the exercise scaffold');
}
