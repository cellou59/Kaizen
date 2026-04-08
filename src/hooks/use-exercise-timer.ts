import { useCallback, useEffect, useRef, useState } from "react";

type UseExerciseTimerOptions = {
  maxDuration?: number;
  onExpire?: () => void;
};

export function useExerciseTimer({ maxDuration = 7200, onExpire }: UseExerciseTimerOptions = {}) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onExpireRef = useRef(onExpire);

  onExpireRef.current = onExpire;

  const remaining = maxDuration - elapsed;
  const isExpired = elapsed >= maxDuration;

  const start = useCallback(() => {
    setRunning(true);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setElapsed(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= maxDuration) {
          onExpireRef.current?.();
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, maxDuration]);

  return { elapsed, remaining, isExpired, start, reset };
}
