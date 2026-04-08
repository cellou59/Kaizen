import type { TreeMap } from "./types";

export function validateMap(map: TreeMap, paths: number[][]): boolean {
  const nodeSet = new Set(map.nodes.map((n) => `${n.row}-${n.col}`));
  const nodeMap = new Map(map.nodes.map((n) => [`${n.row}-${n.col}`, n]));

  for (const path of paths) {
    if (path.length !== 7) return false;

    for (let row = 0; row < path.length; row++) {
      const key = `${row}-${path[row]}`;
      if (!nodeSet.has(key)) return false;
    }
  }

  for (const path of paths) {
    const row0Node = nodeMap.get(`0-${path[0]}`);
    const row1Node = nodeMap.get(`1-${path[1]}`);
    const row6Node = nodeMap.get(`6-${path[6]}`);
    if (row0Node?.type !== "challenge") return false;
    if (row1Node?.type !== "challenge") return false;
    if (row6Node?.type !== "boss") return false;
  }

  for (const path of paths) {
    for (let row = 0; row < path.length - 1; row++) {
      const currentNode = nodeMap.get(`${row}-${path[row]}`);
      const nextNode = nodeMap.get(`${row + 1}-${path[row + 1]}`);
      if (currentNode?.type === "rest" && nextNode?.type === "rest") {
        return false;
      }
    }
  }

  for (const edge of map.edges) {
    if (edge.targetRow !== edge.sourceRow + 1) return false;
  }

  return true;
}
