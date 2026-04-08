# Decision: Zustand hydration flag pattern

| Field   | Value              |
| ------- | ------------------ |
| ID      | DEC-002            |
| Date    | 2026-04-08         |
| Feature | F1 Tree Map & Run  |
| Status  | Accepted           |

## Context

Pages using `useEffect` to redirect based on store state (e.g. "no active run → redirect to dashboard") fired before localStorage hydration completed. On hard reload, store state was null (not yet hydrated), causing immediate redirect even when a valid run existed in localStorage.

## Decision

Add a `hydrated: boolean` field to the Zustand store, initially `false`, set to `true` after `hydrate()` loads from localStorage. Pages check `if (!hydrated) return` before any redirect logic.

## Alternatives Considered

| Alternative               | Pros              | Cons                                | Rejected because                |
| ------------------------- | ----------------- | ----------------------------------- | ------------------------------- |
| Zustand persist middleware | Built-in          | Async rehydration still has gap     | Same race condition risk        |
| SSR-only state             | No hydration gap  | localStorage not available on server | Breaks offline-first requirement |

## Consequences

All pages that guard on store state must check `hydrated` before redirecting. Pattern is simple and explicit. Should be reused for any future store that loads from localStorage.
