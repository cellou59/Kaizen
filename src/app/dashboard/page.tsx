"use client";

import { useRouter } from "next/navigation";
import { useRun } from "@/hooks/use-run";

export default function DashboardPage() {
  const router = useRouter();
  const { isRunActive, startRun } = useRun();

  const handleStartRun = () => {
    startRun();
    router.push("/run");
  };

  const handleResumeRun = () => {
    router.push("/run");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-parchment">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-surface-high p-12 shadow-sm">
        <h1 className="text-4xl font-heading text-sage">Kai7en</h1>
        {isRunActive ? (
          <button
            type="button"
            className="bg-stone text-parchment px-8 py-3 rounded-xl text-lg font-heading"
            onClick={handleResumeRun}
          >
            Resume Run
          </button>
        ) : (
          <button
            type="button"
            className="bg-sage text-parchment px-8 py-3 rounded-xl text-lg font-heading"
            onClick={handleStartRun}
          >
            Start Run
          </button>
        )}
      </div>
    </main>
  );
}
