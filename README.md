# Expense claim — code review exercise

Thanks for making the time. This is a **code review exercise**, not a coding
exercise. You will not need to write or run any code.

## What you are looking at

A small internal tool that lets an employee fill in an expense claim and submit
it to finance. One pull request is open against this repo:

**[PR #1 — feat(expenses): add the claim lines step](../../pull/1)**

A colleague has raised it and believes it is ready to merge. CI is green.

## What we will do together

We will spend about **15 minutes** reading the pull request. Talk us through it
the way you would review a teammate's work:

- What would you comment on, and what would you say?
- What would block the merge, and what would you raise but let through?
- Where would you want to ask the author a question rather than assert a fix?

We are interested in how you prioritise, not only in what you spot. If you are
not sure whether something is a problem, say so out loud — that is useful to us.

**You do not need to prepare anything in advance.** There is nothing to fork,
clone or install. We will read the diff together on the call.

## Scope

- The data layer (`lib/db.ts`) and the auth layer (`lib/session.ts`) are
  **stubs**. Assume both work as documented.
- The claim list and the approval screens are out of scope for this PR.

## Questions

Ask them at any point during the session.
