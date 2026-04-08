"use client";

import type { MapEdge } from "@/types";

type StepEdgesProps = {
  edges: MapEdge[];
  sourceRow: number;
};

const COL_X: Record<number, number> = {
  0: 75,
  1: 150,
  2: 225,
};

export function StepEdges({ edges, sourceRow }: StepEdgesProps) {
  const rowEdges = edges.filter((edge) => edge.sourceRow === sourceRow);

  return (
    <svg viewBox="0 0 300 60" width={300} height={60} className="mx-auto">
      <title>Step edges</title>
      {rowEdges.map((edge) => {
        const sourceX = COL_X[edge.sourceCol] ?? 150;
        const targetX = COL_X[edge.targetCol] ?? 150;
        const isChosen = edge.chosen;

        return (
          <line
            key={edge.id}
            x1={sourceX}
            y1={5}
            x2={targetX}
            y2={55}
            stroke={isChosen ? "var(--color-sage)" : "var(--color-outline-variant)"}
            strokeWidth={isChosen ? 2.5 : 1.5}
            strokeDasharray={isChosen ? undefined : "6 4"}
          />
        );
      })}
    </svg>
  );
}
