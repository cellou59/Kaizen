"use client";

import { MapNodeComponent } from "@/components/node/map-node";
import { StepEdges } from "@/components/tree-map/step-edges";
import type { TreeMap } from "@/types";

type TreeMapProps = {
  map: TreeMap;
  onSelectNode: (row: number, col: number) => void;
  onCompleteNode: () => void;
};

const ROW_INDICES = [0, 1, 2, 3, 4, 5, 6] as const;

const COL_STYLE: Record<number, string> = {
  0: "left-[25%] -translate-x-1/2",
  1: "left-[50%] -translate-x-1/2",
  2: "left-[75%] -translate-x-1/2",
};

export function TreeMapView({ map, onSelectNode, onCompleteNode }: TreeMapProps) {
  const nodesByRow = (row: number) =>
    map.nodes.filter((n) => n.row === row).sort((a, b) => a.col - b.col);

  return (
    <div className="flex flex-col gap-0" style={{ width: 300 }}>
      {ROW_INDICES.map((row) => {
        const rowNodes = nodesByRow(row);

        return (
          <div key={row}>
            <div className="relative h-14">
              {rowNodes.map((node) => (
                <div key={node.id} className={`absolute top-0 ${COL_STYLE[node.col] ?? ""}`}>
                  <MapNodeComponent
                    node={node}
                    onSelect={onSelectNode}
                    onComplete={onCompleteNode}
                  />
                </div>
              ))}
            </div>
            {row < 6 && <StepEdges edges={map.edges} sourceRow={row} />}
          </div>
        );
      })}
    </div>
  );
}
