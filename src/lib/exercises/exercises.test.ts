import { describe, expect, it } from "vitest";
import {
  ExerciseAssignmentSchema,
  ExerciseSchema,
  FeedbackScoreSchema,
} from "@/lib/schemas/exercise";
import { adjustDifficulty, computeAssignment } from "./difficulty";
import { EXERCISE_LIBRARY } from "./library";
import { selectExercises } from "./select-exercises";

describe("selectExercises", () => {
  it("returns the correct number of exercises", () => {
    const result = selectExercises(3);
    expect(result).toHaveLength(3);
  });

  it("returns no duplicate exercises", () => {
    const result = selectExercises(5);
    const ids = result.map((e) => e.id);
    expect(new Set(ids).size).toBe(5);
  });

  it("throws if count exceeds library size", () => {
    expect(() => selectExercises(EXERCISE_LIBRARY.length + 1)).toThrow(
      `Cannot select ${EXERCISE_LIBRARY.length + 1} exercises from library of ${EXERCISE_LIBRARY.length}`,
    );
  });
});

describe("computeAssignment", () => {
  const repsExercise = EXERCISE_LIBRARY[0]; // pushups: baseReps=15, baseDuration=null
  const durationExercise = EXERCISE_LIBRARY[2]; // plank: baseReps=null, baseDuration=60

  it("correctly adjusts reps", () => {
    const assignment = computeAssignment(repsExercise, 1.5);
    expect(assignment.adjustedReps).toBe(Math.round(15 * 1.5));
    expect(assignment.adjustedDuration).toBeNull();
  });

  it("correctly adjusts duration", () => {
    const assignment = computeAssignment(durationExercise, 1.5);
    expect(assignment.adjustedDuration).toBe(Math.round(60 * 1.5));
    expect(assignment.adjustedReps).toBeNull();
  });

  it("handles null fields", () => {
    const assignment = computeAssignment(repsExercise, 1.0);
    expect(assignment.adjustedReps).toBe(15);
    expect(assignment.adjustedDuration).toBeNull();
  });
});

describe("adjustDifficulty", () => {
  it("increases multiplier for score 0", () => {
    const result = adjustDifficulty(1.0, 0);
    expect(result).toBeGreaterThan(1.0);
  });

  it("decreases multiplier for score 5", () => {
    const result = adjustDifficulty(1.0, 5);
    expect(result).toBeLessThan(1.0);
  });

  it("stays near same for score 2-3", () => {
    const result2 = adjustDifficulty(1.0, 2);
    const result3 = adjustDifficulty(1.0, 3);
    expect(result2).toBeGreaterThanOrEqual(0.95);
    expect(result2).toBeLessThanOrEqual(1.05);
    expect(result3).toBeGreaterThanOrEqual(0.95);
    expect(result3).toBeLessThanOrEqual(1.05);
  });
});

describe("Zod schemas", () => {
  it("validates a correct exercise", () => {
    const result = ExerciseSchema.safeParse(EXERCISE_LIBRARY[0]);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid exercise", () => {
    const result = ExerciseSchema.safeParse({ id: 123, name: null });
    expect(result.success).toBe(false);
  });

  it("validates a correct feedback score", () => {
    expect(FeedbackScoreSchema.safeParse(3).success).toBe(true);
  });

  it("rejects an invalid feedback score", () => {
    expect(FeedbackScoreSchema.safeParse(6).success).toBe(false);
    expect(FeedbackScoreSchema.safeParse(-1).success).toBe(false);
  });

  it("validates a correct exercise assignment", () => {
    const assignment = computeAssignment(EXERCISE_LIBRARY[0], 1.0);
    const result = ExerciseAssignmentSchema.safeParse(assignment);
    expect(result.success).toBe(true);
  });
});
