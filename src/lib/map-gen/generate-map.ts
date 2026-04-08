import { assignTypes } from "./assign-types";
import { buildNodes } from "./build-nodes";
import { generatePaths } from "./generate-paths";
import type { TreeMap } from "./types";
import { validateMap } from "./validate-map";

const MAX_RETRIES = 10;

export function generateMap(): TreeMap {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const paths = generatePaths();
    const { nodes, edges } = buildNodes(paths);
    const typedNodes = assignTypes(nodes, edges, paths);

    const map: TreeMap = {
      id: crypto.randomUUID(),
      nodes: typedNodes,
      edges,
      createdAt: new Date().toISOString(),
    };

    if (validateMap(map, paths)) {
      return map;
    }
  }

  throw new Error("Failed to generate a valid map after maximum retries");
}
