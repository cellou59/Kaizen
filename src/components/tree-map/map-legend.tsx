"use client";

import { GiCampfire, GiDragonHead, GiScrollQuill, GiSwordClash } from "react-icons/gi";

const LEGEND_ENTRIES = [
  { icon: GiSwordClash, label: "Challenge" },
  { icon: GiScrollQuill, label: "Event" },
  { icon: GiCampfire, label: "Rest" },
  { icon: GiDragonHead, label: "Boss" },
] as const;

export function MapLegend() {
  return (
    <div className="rounded-xl bg-surface-high p-4">
      <div className="grid grid-cols-2 gap-3">
        {LEGEND_ENTRIES.map((entry) => {
          const Icon = entry.icon;
          return (
            <div key={entry.label} className="flex items-center gap-2">
              <Icon className="text-sage" />
              <span className="text-sm text-stone">{entry.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
