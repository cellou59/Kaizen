"use client";

import type { ExerciseAssignment, FeedbackScore as FeedbackScoreType } from "@/types";
import { ExerciseTimer } from "./ExerciseTimer";
import { FeedbackScore } from "./FeedbackScore";

type ExercisePanelProps = {
  assignment: ExerciseAssignment;
  remaining: number;
  isExpired: boolean;
  showFeedback: boolean;
  onDone: () => void;
  onAbandon: () => void;
  onSelectScore: (score: FeedbackScoreType) => void;
};

export function ExercisePanel({
  assignment,
  remaining,
  isExpired,
  showFeedback,
  onDone,
  onAbandon,
  onSelectScore,
}: ExercisePanelProps) {
  const { exercise, adjustedReps, adjustedDuration } = assignment;

  return (
    <aside className="fixed top-0 right-0 h-full w-80 bg-parchment border-l border-stone/20 p-8 flex flex-col gap-8 shadow-lg z-50 animate-slide-in">
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-sage text-xl">{exercise.name}</h2>
        <p className="font-body text-stone text-sm leading-relaxed">{exercise.description}</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        {adjustedReps !== null && (
          <p className="font-heading text-sage text-3xl">
            {adjustedReps} <span className="text-base text-stone">répétitions</span>
          </p>
        )}
        {adjustedDuration !== null && (
          <p className="font-heading text-sage text-3xl">
            {adjustedDuration} <span className="text-base text-stone">secondes</span>
          </p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <ExerciseTimer remaining={remaining} isExpired={isExpired} />
      </div>

      <div className="mt-auto flex flex-col gap-3">
        {showFeedback ? (
          <FeedbackScore onSelectScore={onSelectScore} />
        ) : (
          <>
            <button
              type="button"
              className="bg-sage text-parchment px-6 py-3 rounded-xl font-heading w-full"
              onClick={onDone}
            >
              Fait
            </button>
            <button
              type="button"
              className="bg-stone text-parchment px-6 py-3 rounded-xl font-heading w-full"
              onClick={onAbandon}
            >
              Abandon
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
