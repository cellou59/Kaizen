# Architecture Decision Record (ADR)

This file contains the key architectural decisions made during the project, along with their context and consequences.

## Decision Log

| Date       | ID      | Title                                                              | Consequences                                          |
| ---------- | ------- | ------------------------------------------------------------------ | ----------------------------------------------------- |
| 2026-04-08 | DEC-001 | [Fixed column grid layout](./decisions/001-fixed-column-grid-layout.md) | Nodes and edges share coordinate system, always aligned |
| 2026-04-08 | DEC-002 | [Zustand hydration flag](./decisions/002-zustand-hydration-flag.md)     | Pages must check hydrated before redirecting            |
| 2026-04-08 | DEC-003 | [Forced path divergence](./decisions/003-forced-path-divergence.md)     | Multi-path maps always have visible fork at row 2       |
