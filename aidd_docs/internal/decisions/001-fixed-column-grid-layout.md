# Decision: Fixed column grid for tree map layout

| Field   | Value              |
| ------- | ------------------ |
| ID      | DEC-001            |
| Date    | 2026-04-08         |
| Feature | F1 Tree Map & Run  |
| Status  | Accepted           |

## Context

Edge SVG lines and node DOM elements used different coordinate systems. Nodes were rendered with `flex justify-center` (position based on sibling count), while edges computed X from `totalNodesInRow` indexed by column value. When a row had nodes at non-sequential columns (e.g. col 0 and col 2), edges missed their target nodes.

## Decision

Use a fixed column-to-X mapping (col 0→25%, col 1→50%, col 2→75%) for both node positioning (CSS absolute) and edge rendering (SVG coordinates). Container is fixed at 300px wide.

## Alternatives Considered

| Alternative                  | Pros              | Cons                                   | Rejected because            |
| ---------------------------- | ----------------- | -------------------------------------- | --------------------------- |
| Dynamic flex + col-to-index  | Compact layout    | Requires mapping col→index per row     | Fragile, broke on col gaps  |
| CSS Grid with named columns  | Semantic          | Harder to align SVG edges              | SVG needs pixel coordinates |

## Consequences

Nodes always appear at predictable positions. Edge lines connect precisely to node centers. Layout is slightly wider than needed for single-node rows but consistent.
