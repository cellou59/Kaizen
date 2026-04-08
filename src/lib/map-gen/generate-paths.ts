function pickPathCount(): number {
  const roll = Math.random();
  if (roll < 0.1) return 1;
  if (roll < 0.55) return 2;
  return 3;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function generateDivergentPaths(count: number): number[][] {
  const paths: number[][] = [];

  const row2Columns =
    count === 1
      ? [Math.floor(Math.random() * 3)]
      : count === 2
        ? shuffle([0, 1]).slice(0, 2)
        : [0, 1, 2];

  for (let i = 0; i < count; i++) {
    const path: number[] = [0, 0, row2Columns[i]];
    for (let row = 3; row <= 5; row++) {
      const prev = path[row - 1];
      const drift = Math.floor(Math.random() * 3) - 1;
      path.push(clamp(prev + drift, 0, 2));
    }
    path.push(0);
    paths.push(path);
  }

  return paths;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sortPathsByColumn(paths: number[][]): void {
  for (let row = 0; row < 7; row++) {
    const columns = paths.map((p) => p[row]);
    columns.sort((a, b) => a - b);
    for (let i = 0; i < paths.length; i++) {
      paths[i][row] = columns[i];
    }
  }
}

export function generatePaths(): number[][] {
  const count = pickPathCount();
  const paths = generateDivergentPaths(count);
  sortPathsByColumn(paths);
  return paths;
}
