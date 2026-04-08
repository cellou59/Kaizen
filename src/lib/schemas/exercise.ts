import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  baseReps: z.number().int().positive().nullable(),
  baseDuration: z.number().positive().nullable(),
  difficultyMultiplier: z.number().positive(),
});

export const FeedbackScoreSchema = z.number().int().min(0).max(5);

export const ExerciseAssignmentSchema = z.object({
  exercise: ExerciseSchema,
  adjustedReps: z.number().int().positive().nullable(),
  adjustedDuration: z.number().positive().nullable(),
});
