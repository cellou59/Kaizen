"use client";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type ExerciseTimerProps = {
  remaining: number;
  isExpired: boolean;
};

export function ExerciseTimer({ remaining, isExpired }: ExerciseTimerProps) {
  if (isExpired) {
    return <p className="text-error font-body text-lg">Temps écoulé</p>;
  }

  const isWarning = remaining < 300;
  const colorClass = isWarning ? "text-error" : "text-stone";

  return <p className={`${colorClass} font-body text-2xl tabular-nums`}>{formatTime(remaining)}</p>;
}
