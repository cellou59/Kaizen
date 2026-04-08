import type { Exercise } from "@/types";
import { EXERCISE_LIBRARY } from "./library";

export function selectExercises(count: number): Exercise[] {
  if (count > EXERCISE_LIBRARY.length) {
    throw new Error(`Cannot select ${count} exercises from library of ${EXERCISE_LIBRARY.length}`);
  }

  const shuffled = [...EXERCISE_LIBRARY].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
