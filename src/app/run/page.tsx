"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ExercisePanel } from "@/components/exercise/ExercisePanel";
import { MapLegend } from "@/components/tree-map/map-legend";
import { TreeMapView } from "@/components/tree-map/tree-map";
import { useExerciseTimer } from "@/hooks/use-exercise-timer";
import { useRun } from "@/hooks/use-run";
import type { FeedbackScore } from "@/types";

export default function RunPage() {
  const router = useRouter();
  const {
    map,
    hydrated,
    isRunActive,
    runStatus,
    activeNode,
    selectNode,
    completeNode,
    failRun,
    completeExercise,
    abandonRun,
    currentExercise,
  } = useRun();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleTimerExpire = useCallback(() => {
    failRun();
  }, [failRun]);

  const { remaining, isExpired, start, reset } = useExerciseTimer({
    onExpire: handleTimerExpire,
  });

  const isExerciseNode =
    activeNode !== null && (activeNode.type === "challenge" || activeNode.type === "boss");
  const showPanel = isExerciseNode && currentExercise !== null;

  useEffect(() => {
    if (showPanel) {
      reset();
      start();
    }
  }, [showPanel, reset, start]);

  useEffect(() => {
    if (!hydrated) return;
    if (!map || !isRunActive) {
      if (runStatus === "completed" || runStatus === "failed") {
        router.push("/run/result");
        return;
      }
      router.push("/dashboard");
    }
  }, [map, hydrated, isRunActive, runStatus, router]);

  useEffect(() => {
    if (runStatus === "completed" || runStatus === "failed") {
      router.push("/run/result");
    }
  }, [runStatus, router]);

  const handleCompleteNode = useCallback(() => {
    if (!activeNode) return;
    if (activeNode.type === "challenge" || activeNode.type === "boss") return;
    completeNode();
  }, [activeNode, completeNode]);

  const handleDone = useCallback(() => {
    setShowFeedback(true);
  }, []);

  const handleAbandon = useCallback(() => {
    abandonRun();
  }, [abandonRun]);

  const handleSelectScore = useCallback(
    (score: FeedbackScore) => {
      if (!activeNode) return;
      completeExercise(activeNode.id, score);
      reset();
      setShowFeedback(false);
    },
    [activeNode, completeExercise, reset],
  );

  if (!hydrated || !map || !isRunActive) {
    return null;
  }

  return (
    <main className="flex flex-col items-center gap-6 p-4 min-h-screen bg-parchment">
      <TreeMapView map={map} onSelectNode={selectNode} onCompleteNode={handleCompleteNode} />
      <MapLegend />
      {showPanel && currentExercise && (
        <ExercisePanel
          assignment={currentExercise}
          remaining={remaining}
          isExpired={isExpired}
          showFeedback={showFeedback}
          onDone={handleDone}
          onAbandon={handleAbandon}
          onSelectScore={handleSelectScore}
        />
      )}
    </main>
  );
}
