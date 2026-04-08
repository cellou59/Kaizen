import type { MapNode, MapEdge, NodeType } from "./types";

const MIDDLE_TYPES: NodeType[] = ["challenge", "event", "rest"];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getOutgoingEdges(row: number, col: number, edges: MapEdge[]): MapEdge[] {
  return edges.filter((e) => e.sourceRow === row && e.sourceCol === col);
}

function hasConsecutiveRest(
  nodes: Map<string, NodeType>,
  paths: number[][],
): boolean {
  for (const path of paths) {
    for (let row = 0; row < path.length - 1; row++) {
      const currentType = nodes.get(`node-${row}-${path[row]}`);
      const nextType = nodes.get(`node-${row + 1}-${path[row + 1]}`);
      if (currentType === "rest" && nextType === "rest") return true;
    }
  }
  return false;
}

function forkChildrenHaveDifferentTypes(
  nodes: Map<string, NodeType>,
  edges: MapEdge[],
  allNodes: MapNode[],
): boolean {
  for (const node of allNodes) {
    const outgoing = getOutgoingEdges(node.row, node.col, edges);
    if (outgoing.length > 1) {
      const childTypes = outgoing.map((e) =>
        nodes.get(`node-${e.targetRow}-${e.targetCol}`),
      );
      const uniqueTypes = new Set(childTypes);
      if (uniqueTypes.size < childTypes.length) return false;
    }
  }
  return true;
}

function checkPathDistribution(
  nodes: Map<string, NodeType>,
  paths: number[][],
): boolean {
  for (const path of paths) {
    let challenges = 0;
    let events = 0;
    let rests = 0;
    for (let row = 0; row < path.length; row++) {
      const type = nodes.get(`node-${row}-${path[row]}`);
      if (type === "challenge" || type === "boss") challenges++;
      else if (type === "event") events++;
      else if (type === "rest") rests++;
    }
    if (challenges < 3 || challenges > 4) return false;
    if (events < 1 || events > 2) return false;
    if (rests < 1 || rests > 2) return false;
  }
  return true;
}

function tryAssign(
  originalNodes: MapNode[],
  edges: MapEdge[],
  paths: number[][],
  strict: boolean,
): Map<string, NodeType> | null {
  const typeMap = new Map<string, NodeType>();

  for (const node of originalNodes) {
    if (node.row <= 1) {
      typeMap.set(node.id, "challenge");
    } else if (node.row === 6) {
      typeMap.set(node.id, "boss");
    }
  }

  const middleNodes = originalNodes.filter(
    (n) => n.row >= 2 && n.row <= 5,
  );

  for (const node of middleNodes) {
    typeMap.set(node.id, pickRandom(MIDDLE_TYPES));
  }

  if (hasConsecutiveRest(typeMap, paths)) return null;
  if (!forkChildrenHaveDifferentTypes(typeMap, edges, originalNodes))
    return null;

  if (strict && !checkPathDistribution(typeMap, paths)) return null;

  return typeMap;
}

export function assignTypes(
  nodes: MapNode[],
  edges: MapEdge[],
  paths: number[][],
): MapNode[] {
  for (let attempt = 0; attempt < 100; attempt++) {
    const strict = attempt < 100;
    const result = tryAssign(nodes, edges, paths, strict);
    if (result) {
      return nodes.map((node) => ({
        ...node,
        type: result.get(node.id) ?? node.type,
      }));
    }
  }

  for (let attempt = 0; attempt < 100; attempt++) {
    const result = tryAssign(nodes, edges, paths, false);
    if (result) {
      return nodes.map((node) => ({
        ...node,
        type: result.get(node.id) ?? node.type,
      }));
    }
  }

  return nodes.map((node) => {
    if (node.row <= 1) return { ...node, type: "challenge" as const };
    if (node.row === 6) return { ...node, type: "boss" as const };
    return { ...node, type: "challenge" as const };
  });
}
