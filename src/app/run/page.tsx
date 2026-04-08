"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRun } from "@/hooks/use-run";
import { TreeMapView } from "@/components/tree-map/tree-map";
import { MapLegend } from "@/components/tree-map/map-legend";

export default function RunPage() {
  const router = useRouter();
  const { map, hydrated, isRunActive, runStatus, selectNode, completeNode } = useRun();

  useEffect(() => {
    if (!hydrated) return;
    if (!map || !isRunActive) {
      if (runStatus === "completed" || runStatus === "failed") {
        router.push("/run/result");
        return;
      }
      router.push("/dashboard");
    }
  }, [map, hydrated, isRunActive, runStatus, router]);

  useEffect(() => {
    if (runStatus === "completed" || runStatus === "failed") {
      router.push("/run/result");
    }
  }, [runStatus, router]);

  if (!hydrated || !map || !isRunActive) {
    return null;
  }

  return (
    <main className="flex flex-col items-center gap-6 p-4 min-h-screen bg-parchment">
      <TreeMapView
        map={map}
        onSelectNode={selectNode}
        onCompleteNode={completeNode}
      />
      <MapLegend />
    </main>
  );
}
