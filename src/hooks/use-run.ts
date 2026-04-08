import { useCallback, useEffect } from "react";
import { useRunStore } from "@/store/run-store";
import type { ExerciseAssignment } from "@/types";

export function useRun() {
  const currentRun = useRunStore((s) => s.currentRun);
  const hydrated = useRunStore((s) => s.hydrated);
  const startRun = useRunStore((s) => s.startRun);
  const selectNode = useRunStore((s) => s.selectNode);
  const completeNode = useRunStore((s) => s.completeNode);
  const failRun = useRunStore((s) => s.failRun);
  const completeRun = useRunStore((s) => s.completeRun);
  const clearRun = useRunStore((s) => s.clearRun);
  const hydrate = useRunStore((s) => s.hydrate);
  const completeExercise = useRunStore((s) => s.completeExercise);
  const abandonRun = useRunStore((s) => s.abandonRun);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const currentRow = currentRun?.currentRow ?? null;
  const runStatus = currentRun?.status ?? null;
  const isRunActive = currentRun?.status === "active";
  const map = currentRun?.map ?? null;

  const availableNodes = currentRun
    ? currentRun.map.nodes.filter((n) => n.status === "available")
    : [];

  const activeNode = currentRun
    ? (currentRun.map.nodes.find((n) => n.status === "active") ?? null)
    : null;

  const currentExercise =
    activeNode && currentRun?.exerciseMap?.[activeNode.id]
      ? currentRun.exerciseMap[activeNode.id]
      : null;

  const exerciseForNode = useCallback(
    (nodeId: string): ExerciseAssignment | null => {
      return currentRun?.exerciseMap?.[nodeId] ?? null;
    },
    [currentRun],
  );

  return {
    currentRun,
    hydrated,
    currentRow,
    availableNodes,
    activeNode,
    runStatus,
    isRunActive,
    map,
    startRun,
    selectNode,
    completeNode,
    failRun,
    completeRun,
    clearRun,
    completeExercise,
    abandonRun,
    currentExercise,
    exerciseForNode,
  };
}
