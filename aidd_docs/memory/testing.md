---
name: testing
description: Testing strategy and guidelines
scope: all
---

# Testing Guidelines

## Tools and Frameworks

- Unit/integration: Vitest
- Component: Vitest + React Testing Library
- E2E: Playwright (planned, not yet active)

## Testing Strategy

- Test behavior, not implementation details
- Test-first approach for bug fixes
- Include edge cases in every test suite
- Keep tests deterministic (no flaky tests)
- Never mock business logic

## Test Execution Process

- Unit tests: `npx vitest run`
- With coverage: `npx vitest run --coverage`
- CI: not configured yet

## Mocking and Stubbing

- Use Vitest built-in mocking
- Mock external services only (e.g., Supabase)
- Business logic must use real implementations
