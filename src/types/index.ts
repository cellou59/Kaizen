export type NodeType = "challenge" | "event" | "rest" | "boss";
export type NodeStatus = "active" | "available" | "pending" | "completed" | "skipped" | "failed";
export type RunStatus = "active" | "completed" | "failed";

export interface MapNode {
  id: string;
  row: number;
  col: number;
  type: NodeType;
  status: NodeStatus;
}

export interface MapEdge {
  id: string;
  sourceRow: number;
  sourceCol: number;
  targetRow: number;
  targetCol: number;
  chosen: boolean;
}

export interface TreeMap {
  id: string;
  nodes: MapNode[];
  edges: MapEdge[];
  createdAt: string;
}

export interface RunState {
  id: string;
  map: TreeMap;
  currentRow: number;
  chosenPath: number[];
  status: RunStatus;
  startedAt: string;
  completedAt: string | null;
}
