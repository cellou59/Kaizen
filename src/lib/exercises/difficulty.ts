import type { Exercise, ExerciseAssignment, FeedbackScore } from "@/types";

export function computeAssignment(
  exercise: Exercise,
  difficultyMultiplier: number,
): ExerciseAssignment {
  return {
    exercise,
    adjustedReps:
      exercise.baseReps !== null ? Math.round(exercise.baseReps * difficultyMultiplier) : null,
    adjustedDuration:
      exercise.baseDuration !== null
        ? Math.round(exercise.baseDuration * difficultyMultiplier)
        : null,
  };
}

export function adjustDifficulty(currentMultiplier: number, score: FeedbackScore): number {
  const factor = 1.15 - (score / 5) * 0.3;
  return Math.round(currentMultiplier * factor * 100) / 100;
}
