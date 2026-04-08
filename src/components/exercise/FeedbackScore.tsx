"use client";

import type { FeedbackScore as FeedbackScoreType } from "@/types";

const SCORES: FeedbackScoreType[] = [0, 1, 2, 3, 4, 5];

type FeedbackScoreProps = {
  onSelectScore: (score: FeedbackScoreType) => void;
};

function ScoreButton({
  score,
  onSelect,
}: {
  score: FeedbackScoreType;
  onSelect: (s: FeedbackScoreType) => void;
}) {
  const handleSelect = () => onSelect(score);
  return (
    <button
      type="button"
      className="w-10 h-10 rounded-lg bg-surface-high text-stone font-body text-lg hover:bg-sage hover:text-parchment transition-colors"
      onClick={handleSelect}
    >
      {score}
    </button>
  );
}

export function FeedbackScore({ onSelectScore }: FeedbackScoreProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-stone font-body text-sm">Difficulté ressentie</p>
      <div className="flex gap-2">
        {SCORES.map((score) => (
          <ScoreButton key={score} score={score} onSelect={onSelectScore} />
        ))}
      </div>
      <div className="flex justify-between w-full text-xs text-stone/60 font-body">
        <span>Facile</span>
        <span>Difficile</span>
      </div>
    </div>
  );
}
