# Decision: Forced path divergence at row 2

| Field   | Value              |
| ------- | ------------------ |
| ID      | DEC-003            |
| Date    | 2026-04-08         |
| Feature | F1 Tree Map & Run  |
| Status  | Accepted           |

## Context

Independent random path generation with ±1 drift from col 0 produced maps with very few visible forks. Paths starting at the same column often stayed merged through the entire map, especially with 2 paths.

## Decision

For multi-path maps, assign distinct starting columns at row 2 (2 paths → cols [0,1] shuffled, 3 paths → cols [0,1,2]). Reduced 1-path probability from 20% to 10%, increased 3-path from 30% to 45%.

## Alternatives Considered

| Alternative                  | Pros                | Cons                        | Rejected because             |
| ---------------------------- | ------------------- | --------------------------- | ---------------------------- |
| Larger drift range (±2)      | More spread         | Can jump too far, feels random | Violates adjacency constraint |
| Post-generation fork check   | Non-invasive        | May discard many maps       | Wasteful, doesn't guarantee   |

## Consequences

Every multi-path map has at least one visible fork at row 2. Maps feel more strategic. Paths can still reconverge in rows 3-5 naturally.
