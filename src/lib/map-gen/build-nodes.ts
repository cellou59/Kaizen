import type { MapNode, MapEdge } from "./types";

export function buildNodes(paths: number[][]): {
  nodes: MapNode[];
  edges: MapEdge[];
} {
  const nodeMap = new Map<string, MapNode>();
  const edgeMap = new Map<string, MapEdge>();

  for (const path of paths) {
    for (let row = 0; row < path.length; row++) {
      const col = path[row];
      const nodeId = `node-${row}-${col}`;
      if (!nodeMap.has(nodeId)) {
        nodeMap.set(nodeId, {
          id: nodeId,
          row,
          col,
          type: "challenge",
          status: "pending",
        });
      }

      if (row < path.length - 1) {
        const nextCol = path[row + 1];
        const edgeId = `edge-${row}-${col}-${row + 1}-${nextCol}`;
        if (!edgeMap.has(edgeId)) {
          edgeMap.set(edgeId, {
            id: edgeId,
            sourceRow: row,
            sourceCol: col,
            targetRow: row + 1,
            targetCol: nextCol,
            chosen: false,
          });
        }
      }
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges: Array.from(edgeMap.values()),
  };
}
