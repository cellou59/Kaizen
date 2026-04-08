import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useExerciseTimer } from "./use-exercise-timer";

describe("useExerciseTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with zero elapsed and full remaining", () => {
    const { result } = renderHook(() => useExerciseTimer({ maxDuration: 100 }));
    expect(result.current.elapsed).toBe(0);
    expect(result.current.remaining).toBe(100);
    expect(result.current.isExpired).toBe(false);
  });

  it("counts up after start", () => {
    const { result } = renderHook(() => useExerciseTimer({ maxDuration: 100 }));
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.elapsed).toBe(3);
    expect(result.current.remaining).toBe(97);
  });

  it("calls onExpire when time runs out", () => {
    const onExpire = vi.fn();
    const { result } = renderHook(() => useExerciseTimer({ maxDuration: 5, onExpire }));
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onExpire).toHaveBeenCalledOnce();
    expect(result.current.isExpired).toBe(true);
  });

  it("resets elapsed to zero", () => {
    const { result } = renderHook(() => useExerciseTimer({ maxDuration: 100 }));
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    act(() => result.current.reset());
    expect(result.current.elapsed).toBe(0);
    expect(result.current.remaining).toBe(100);
  });

  it("defaults maxDuration to 7200", () => {
    const { result } = renderHook(() => useExerciseTimer());
    expect(result.current.remaining).toBe(7200);
  });
});
