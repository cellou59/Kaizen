---
name: coding-assertions
description: Code quality verification checklist
scope: all
---

# Coding Guidelines

> Those rules must be minimal because they MUST be checked after EVERY CODE GENERATION.

## Requirements to complete a feature

- All types pass (`tsc --noEmit`)
- All tests pass
- Biome reports no errors
- Zod schemas validate inputs at boundaries
- Build succeeds

## Commands to run

### Before commit

| Order | Command                     | Description     |
| ----- | --------------------------- | --------------- |
| 1     | `npx biome check --write .` | Lint and format |
| 2     | `npx tsc --noEmit`          | Type check      |
| 3     | `npx vitest run`            | Unit tests      |

### Before push

| Order | Command                     | Description         |
| ----- | --------------------------- | ------------------- |
| 1     | `npm run build`             | Full build          |
| 2     | `npx vitest run --coverage` | Tests with coverage |
