import { z } from "zod";

const NodeTypeSchema = z.enum(["challenge", "event", "rest", "boss"]);
const NodeStatusSchema = z.enum(["active", "available", "pending", "completed", "skipped", "failed"]);
const RunStatusSchema = z.enum(["active", "completed", "failed"]);

export const MapNodeSchema = z.object({
  id: z.string(),
  row: z.number().int().min(0).max(6),
  col: z.number().int().min(0).max(2),
  type: NodeTypeSchema,
  status: NodeStatusSchema,
});

export const MapEdgeSchema = z.object({
  id: z.string(),
  sourceRow: z.number().int(),
  sourceCol: z.number().int(),
  targetRow: z.number().int(),
  targetCol: z.number().int(),
  chosen: z.boolean(),
});

export const TreeMapSchema = z.object({
  id: z.string(),
  nodes: z.array(MapNodeSchema),
  edges: z.array(MapEdgeSchema),
  createdAt: z.string(),
});

export const RunStateSchema = z.object({
  id: z.string(),
  map: TreeMapSchema,
  currentRow: z.number().int(),
  chosenPath: z.array(z.number().int()),
  status: RunStatusSchema,
  startedAt: z.string(),
  completedAt: z.string().nullable(),
});
