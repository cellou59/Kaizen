"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRun } from "@/hooks/use-run";

export default function RunResultPage() {
  const router = useRouter();
  const { currentRun, hydrated, runStatus, clearRun, startRun } = useRun();

  useEffect(() => {
    if (!hydrated) return;
    if (!currentRun) {
      router.push("/dashboard");
    }
  }, [currentRun, hydrated, router]);

  const handleBackToDashboard = () => {
    clearRun();
    router.push("/dashboard");
  };

  const handleRestart = () => {
    clearRun();
    startRun();
    router.push("/run");
  };

  if (!hydrated || !currentRun) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-parchment">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-surface-high p-12 shadow-sm">
        {runStatus === "completed" ? (
          <>
            <h1 className="text-3xl font-heading text-sage">Run Complete!</h1>
            <p className="text-stone font-body">
              Congratulations! You have successfully completed your journey through the tree.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-heading text-error">Run Failed</h1>
            <p className="text-stone font-body">
              Your journey has come to an end. Better luck next time.
            </p>
            <button
              type="button"
              className="bg-sage text-parchment px-6 py-2 rounded-xl font-heading"
              onClick={handleRestart}
            >
              Relancer
            </button>
          </>
        )}
        <button
          type="button"
          className="bg-sage text-parchment px-6 py-2 rounded-xl"
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}
