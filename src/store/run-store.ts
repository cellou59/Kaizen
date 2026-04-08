import { create } from "zustand";
import { adjustDifficulty, computeAssignment } from "@/lib/exercises/difficulty";
import { selectExercises } from "@/lib/exercises/select-exercises";
import { generateMap } from "@/lib/map-gen/generate-map";
import { FeedbackScoreSchema } from "@/lib/schemas/exercise";
import { storage } from "@/lib/storage";
import type { ExerciseAssignment, FeedbackScore, MapNode, RunState } from "@/types";

const STORAGE_KEY = "kai7en-run";
const DIFFICULTY_KEY = "kai7en-difficulty";

type RunStore = {
  currentRun: RunState | null;
  hydrated: boolean;
  startRun: () => void;
  selectNode: (row: number, col: number) => void;
  completeNode: () => void;
  failRun: () => void;
  completeRun: () => void;
  clearRun: () => void;
  hydrate: () => void;
  completeExercise: (nodeId: string, score: FeedbackScore) => void;
  abandonRun: () => void;
};

function findAvailableNodes(
  nodes: MapNode[],
  edges: { sourceRow: number; sourceCol: number; targetRow: number; targetCol: number }[],
  fromRow: number,
  fromCol: number,
): MapNode[] {
  const targetCoords = edges
    .filter((e) => e.sourceRow === fromRow && e.sourceCol === fromCol)
    .map((e) => ({ row: e.targetRow, col: e.targetCol }));

  return nodes.filter((n) => targetCoords.some((t) => t.row === n.row && t.col === n.col));
}

export const useRunStore = create<RunStore>()((set, get) => ({
  currentRun: null,
  hydrated: false,

  startRun: () => {
    const map = generateMap();
    const nodes = map.nodes.map((node) => {
      if (node.row === 0 && node.col === 0) {
        return { ...node, status: "active" as const };
      }
      return node;
    });

    const availableInRow1 = findAvailableNodes(nodes, map.edges, 0, 0);
    const updatedNodes = nodes.map((node) => {
      if (availableInRow1.some((a) => a.row === node.row && a.col === node.col)) {
        return { ...node, status: "available" as const };
      }
      return node;
    });

    const exerciseNodes = updatedNodes.filter((n) => n.type === "challenge" || n.type === "boss");
    const exercises = selectExercises(exerciseNodes.length);
    const multiplier = storage.get<number>(DIFFICULTY_KEY) ?? 1.0;

    const exerciseMap: Record<string, ExerciseAssignment> = {};
    for (let i = 0; i < exerciseNodes.length; i++) {
      exerciseMap[exerciseNodes[i].id] = computeAssignment(exercises[i], multiplier);
    }

    const run: RunState = {
      id: crypto.randomUUID(),
      map: { ...map, nodes: updatedNodes },
      currentRow: 0,
      chosenPath: [0],
      status: "active",
      startedAt: new Date().toISOString(),
      completedAt: null,
      exerciseMap,
      feedbackScores: {},
    };

    storage.set(STORAGE_KEY, run);
    set({ currentRun: run });
  },

  selectNode: (row: number, col: number) => {
    const { currentRun } = get();
    if (!currentRun || currentRun.status !== "active") return;

    const targetNode = currentRun.map.nodes.find((n) => n.row === row && n.col === col);
    if (!targetNode || targetNode.status !== "available") return;

    const updatedNodes = currentRun.map.nodes.map((node) => {
      if (node.row === row && node.col === col) {
        return { ...node, status: "active" as const };
      }
      if (node.row === row && node.status === "available") {
        return { ...node, status: "skipped" as const };
      }
      return node;
    });

    const updatedEdges = currentRun.map.edges.map((edge) => {
      if (edge.targetRow === row && edge.targetCol === col) {
        return { ...edge, chosen: true };
      }
      return edge;
    });

    const updatedRun: RunState = {
      ...currentRun,
      chosenPath: [...currentRun.chosenPath, col],
      map: { ...currentRun.map, nodes: updatedNodes, edges: updatedEdges },
    };

    storage.set(STORAGE_KEY, updatedRun);
    set({ currentRun: updatedRun });
  },

  completeNode: () => {
    const { currentRun } = get();
    if (!currentRun || currentRun.status !== "active") return;

    const completedRow = currentRun.currentRow;
    let nodes = currentRun.map.nodes.map((node) => {
      if (node.row === completedRow && node.status === "active") {
        return { ...node, status: "completed" as const };
      }
      return node;
    });

    const nextRow = completedRow + 1;

    if (nextRow > 6) {
      const updatedRun: RunState = {
        ...currentRun,
        currentRow: nextRow,
        map: { ...currentRun.map, nodes },
        status: "completed",
        completedAt: new Date().toISOString(),
      };
      storage.set(STORAGE_KEY, updatedRun);
      set({ currentRun: updatedRun });
      return;
    }

    const completedCol = currentRun.chosenPath[currentRun.chosenPath.length - 1];
    const availableNodes = findAvailableNodes(
      nodes,
      currentRun.map.edges,
      completedRow,
      completedCol,
    );

    nodes = nodes.map((node) => {
      if (availableNodes.some((a) => a.row === node.row && a.col === node.col)) {
        return { ...node, status: "available" as const };
      }
      return node;
    });

    let chosenPath = currentRun.chosenPath;
    let edges = currentRun.map.edges;

    if (availableNodes.length === 1) {
      const autoNode = availableNodes[0];
      nodes = nodes.map((node) => {
        if (node.row === autoNode.row && node.col === autoNode.col) {
          return { ...node, status: "active" as const };
        }
        return node;
      });
      edges = edges.map((edge) => {
        if (edge.targetRow === autoNode.row && edge.targetCol === autoNode.col) {
          return { ...edge, chosen: true };
        }
        return edge;
      });
      chosenPath = [...chosenPath, autoNode.col];
    }

    const updatedRun: RunState = {
      ...currentRun,
      currentRow: nextRow,
      chosenPath,
      map: { ...currentRun.map, nodes, edges },
    };

    storage.set(STORAGE_KEY, updatedRun);
    set({ currentRun: updatedRun });
  },

  failRun: () => {
    const { currentRun } = get();
    if (!currentRun) return;

    const updatedRun: RunState = {
      ...currentRun,
      status: "failed",
      completedAt: new Date().toISOString(),
    };

    storage.set(STORAGE_KEY, updatedRun);
    set({ currentRun: updatedRun });
  },

  completeRun: () => {
    const { currentRun } = get();
    if (!currentRun) return;

    const updatedRun: RunState = {
      ...currentRun,
      status: "completed",
      completedAt: new Date().toISOString(),
    };

    storage.set(STORAGE_KEY, updatedRun);
    set({ currentRun: updatedRun });
  },

  clearRun: () => {
    storage.remove(STORAGE_KEY);
    set({ currentRun: null });
  },

  completeExercise: (nodeId: string, score: FeedbackScore) => {
    const { currentRun } = get();
    if (!currentRun || currentRun.status !== "active") return;

    FeedbackScoreSchema.parse(score);

    const updatedFeedbackScores = {
      ...currentRun.feedbackScores,
      [nodeId]: score,
    };

    const currentMultiplier = storage.get<number>(DIFFICULTY_KEY) ?? 1.0;
    const newMultiplier = adjustDifficulty(currentMultiplier, score);
    storage.set(DIFFICULTY_KEY, newMultiplier);

    const updatedRun: RunState = {
      ...currentRun,
      feedbackScores: updatedFeedbackScores,
    };

    storage.set(STORAGE_KEY, updatedRun);
    set({ currentRun: updatedRun });

    get().completeNode();
  },

  abandonRun: () => {
    get().failRun();
  },

  hydrate: () => {
    const run = storage.get<RunState>(STORAGE_KEY);
    set({ currentRun: run ?? null, hydrated: true });
  },
}));
