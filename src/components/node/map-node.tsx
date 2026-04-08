"use client";

import { GiCampfire, GiDragonHead, GiScrollQuill, GiSwordClash } from "react-icons/gi";
import type { MapNode, NodeStatus, NodeType } from "@/types";

const NODE_ICONS: Record<NodeType, React.ComponentType<{ className?: string }>> = {
  challenge: GiSwordClash,
  event: GiScrollQuill,
  rest: GiCampfire,
  boss: GiDragonHead,
};

const STATUS_CLASSES: Record<NodeStatus, string> = {
  active: "bg-sage text-parchment scale-110 ring-2 ring-sage",
  available: "bg-parchment text-sage border-2 border-sage cursor-pointer hover:bg-sage-light",
  pending: "bg-surface-high text-outline-variant opacity-50",
  completed: "bg-sage-light text-sage opacity-80",
  skipped: "bg-surface-high text-outline-variant opacity-30",
  failed: "bg-error-container text-error",
};

const DISABLED_STATUSES: Set<NodeStatus> = new Set(["pending", "completed", "skipped", "failed"]);

type MapNodeProps = {
  node: MapNode;
  onSelect: (row: number, col: number) => void;
  onComplete: () => void;
};

export function MapNodeComponent({ node, onSelect, onComplete }: MapNodeProps) {
  const Icon = NODE_ICONS[node.type];
  const isBoss = node.type === "boss";
  const isDisabled = DISABLED_STATUSES.has(node.status);

  const handleClick = () => {
    if (node.status === "available") {
      onSelect(node.row, node.col);
    }
    if (node.status === "active") {
      onComplete();
    }
  };

  const sizeClass = isBoss ? "w-14 h-14" : "w-12 h-12";
  const shapeClass = isBoss ? "rotate-45" : "rounded-lg";
  const statusClass = STATUS_CLASSES[node.status];

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className={`flex items-center justify-center transition-transform ${sizeClass} ${shapeClass} ${statusClass}`}
    >
      <Icon className={isBoss ? "-rotate-45 text-xl" : "text-xl"} />
    </button>
  );
}
