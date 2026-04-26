import React from 'react';
import pathToPoints from './path-to-points';
import { Path, PathProps } from './types';

export const GapViolationHighlight = ({
  radius,
  stroke,
  strokeWidth,
  strokeOpacity,
  paths,
  ...props
}: {
  paths: Path[];
} & PathProps<'stroke' | 'strokeOpacity' | 'strokeWidth', 'd'>) => {
  const id = React.useId();

  const groupedPaths = Object.entries(
    paths.reduce(
      (groups, val) => {
        const key = val.c.id;
        groups[key] = [...(groups[key] || []), val];
        return groups;
      },
      {} as Record<number, Path[]>,
    ),
  );

  const groups: Group[] = [];

  for (const [, paths] of groupedPaths) {
    const d = paths.map((path) => path.d).join(' ');
    const points = paths.flatMap((path) => pathToPoints(path));
    groups.push({ id: d, points });
  }

  const mergedGroups = mergeGroups(groups, 2);

  return (
    <g {...props}>
      <defs xmlns="http://www.w3.org/2000/svg">
        <pattern
          id={`backdrop-pattern-${id}`}
          width=".1"
          height=".1"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 50 50)"
        >
          <line
            stroke={stroke}
            strokeWidth={0.1}
            y2={1}
          />
          <line
            stroke={stroke}
            strokeWidth={0.1}
            y2={1}
          />
        </pattern>
      </defs>
      {mergedGroups.flatMap((ds, idx, arr) =>
        arr.slice(0, idx).map((val, i) => (
          <g
            strokeWidth={strokeWidth}
            key={i}
          >
            <mask
              id={`svg-preview-backdrop-mask-${id}-${i}`}
              maskUnits="userSpaceOnUse"
            >
              <path
                stroke="white"
                d={val.join(' ')}
              />
            </mask>
            <path
              d={ds.join(' ')}
              stroke={`url(#backdrop-pattern-${id})`}
              strokeWidth={strokeWidth}
              strokeOpacity={strokeOpacity}
              mask={`url(#svg-preview-backdrop-mask-${id}-${i})`}
            />
          </g>
        )),
      )}
    </g>
  );
};

type Point = { x: number; y: number };
type Group = { id: string; points: Point[] };

// Euclidean distance
function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Check if two groups should be merged based on minimum distance
function shouldMerge(a: Group, b: Group, minDistance: number): boolean {
  for (const pa of a.points) {
    for (const pb of b.points) {
      if (distance(pa, pb) <= minDistance) {
        return true;
      }
    }
  }
  return false;
}

// Merge groups and return arrays of merged group IDs
function mergeGroups(groups: Group[], minDistance: number): string[][] {
  const mergedGroups: Group[][] = groups.map((g) => [g]);

  let changed = true;
  while (changed) {
    changed = false;

    outer: for (let i = 0; i < mergedGroups.length; i++) {
      for (let j = i + 1; j < mergedGroups.length; j++) {
        // Check if any group in mergedGroups[i] should merge with any in mergedGroups[j]
        if (
          mergedGroups[i].some((ga) =>
            mergedGroups[j].some((gb) => shouldMerge(ga, gb, minDistance)),
          )
        ) {
          // Merge group j into group i
          mergedGroups[i] = [...mergedGroups[i], ...mergedGroups[j]];
          mergedGroups.splice(j, 1);
          changed = true;
          break outer;
        }
      }
    }
  }

  // Return only arrays of IDs
  return mergedGroups.map((groupList) => groupList.map((g) => g.id));
}
