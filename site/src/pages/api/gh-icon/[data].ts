import { INode, parseSync } from 'svgson';
import { SVGPathData, encodeSVGPath } from 'svg-pathdata';
import toPath from 'element-to-path';

function assertNever(x: never): never {
  throw new Error('Unknown type: ' + x['type']);
}
function assert(value: unknown): asserts value {
  if (value === undefined) {
    throw new Error('value must be defined');
  }
}

const extractPaths = (node: INode): { d: string; name: typeof node.name }[] => {
  if (/(rect|circle|ellipse|polygon|polyline|line|path)/.test(node.name)) {
    return [{ d: toPath(node), name: node.name }];
  } else if (node.children && Array.isArray(node.children)) {
    return node.children.flatMap(extractPaths);
  }

  return [];
};

const colors = [
  '#00202e',
  '#003f5c',
  '#2c4875',
  '#8a508f',
  '#bc5090',
  '#ff6361',
  '#ff8531',
  '#ffa600',
  '#ffd380',
  '#ffa600',
  '#ff8531',
  '#ff6361',
  '#bc5090',
  '#8a508f',
  '#2c4875',
  '#003f5c',
];

export default async function handler(req, res) {
  const src = Buffer.from(req.query.data.slice(0, -4), 'base64').toString('ascii');

  const commands = extractPaths(parseSync(src)).flatMap(({ d, name }, idx) =>
    new SVGPathData(d).toAbs().commands.map((c) => ({ ...c, id: idx, name }))
  );

  type Point = { x: number; y: number };
  const paths: {
    d: string;
    prev: Point;
    next: Point;
    isStart: boolean;
    c: (typeof commands)[number];
  }[] = [];
  let prev: Point | undefined = undefined;
  let start: Point | undefined = undefined;
  const addPath = (c: (typeof commands)[number], next: Point, d?: string) => {
    assert(prev);
    paths.push({
      c,
      d: d || `M${prev.x} ${prev.y}L${next.x} ${next.y}`,
      prev,
      next,
      isStart: start === prev,
    });
    prev = next;
  };
  let prevCP: Point | undefined = undefined;
  for (let i = 0; i < commands.length; i++) {
    const previousCommand = commands[i - 1];
    const c = commands[i];
    switch (c.type) {
      case SVGPathData.MOVE_TO: {
        prev = c;
        start = c;
        break;
      }
      case SVGPathData.LINE_TO: {
        assert(prev);
        addPath(c, c);
        break;
      }
      case SVGPathData.HORIZ_LINE_TO: {
        assert(prev);
        addPath(c, { x: c.x, y: prev.y });
        break;
      }
      case SVGPathData.VERT_LINE_TO: {
        assert(prev);
        addPath(c, { x: prev.x, y: c.y });
        break;
      }
      case SVGPathData.CLOSE_PATH: {
        assert(prev);
        assert(start);
        addPath(c, start);
        start = undefined;
        break;
      }
      case SVGPathData.CURVE_TO: {
        assert(prev);
        addPath(c, c, `M ${prev.x},${prev.y} ${encodeSVGPath(c)}`);
        break;
      }
      case SVGPathData.SMOOTH_CURVE_TO: {
        assert(prev);
        assert(previousCommand);
        const reflectedCp1 = {
          x:
            previousCommand &&
            (previousCommand.type === SVGPathData.SMOOTH_CURVE_TO ||
              previousCommand.type === SVGPathData.CURVE_TO)
              ? previousCommand.relative
                ? previousCommand.x2 - previousCommand.x
                : previousCommand.x2 - prev.x
              : 0,
          y:
            previousCommand &&
            (previousCommand.type === SVGPathData.SMOOTH_CURVE_TO ||
              previousCommand.type === SVGPathData.CURVE_TO)
              ? previousCommand.relative
                ? previousCommand.y2 - previousCommand.y
                : previousCommand.y2 - prev.y
              : 0,
        };
        addPath(
          c,
          c,
          `M ${prev.x},${prev.y} ${encodeSVGPath({
            type: SVGPathData.CURVE_TO,
            relative: false,
            x: c.x,
            y: c.y,
            x1: prev.x - reflectedCp1.x,
            y1: prev.y - reflectedCp1.y,
            x2: c.x2,
            y2: c.y2,
          })}`
        );
        break;
      }
      case SVGPathData.QUAD_TO: {
        assert(prev);
        addPath(c, c, `M ${prev.x},${prev.y} ${encodeSVGPath(c)}`);
        break;
      }
      case SVGPathData.SMOOTH_QUAD_TO: {
        assert(prev);
        const backTrackCP = (
          index: number,
          currentPoint: { x: number; y: number }
        ): { x: number; y: number } => {
          const previousCommand = commands[index - 1];
          if (!previousCommand) {
            return currentPoint;
          }
          if (previousCommand.type === SVGPathData.QUAD_TO) {
            return {
              x: previousCommand.relative
                ? currentPoint.x - (previousCommand.x1 - previousCommand.x)
                : currentPoint.x - (previousCommand.x1 - currentPoint.x),
              y: previousCommand.relative
                ? currentPoint.y - (previousCommand.y1 - previousCommand.y)
                : currentPoint.y - (previousCommand.y1 - currentPoint.y),
            };
          }
          if (previousCommand.type === SVGPathData.SMOOTH_QUAD_TO) {
            if (!prevCP) {
              return currentPoint;
            }
            return {
              x: currentPoint.x - (prevCP.x - currentPoint.x),
              y: currentPoint.y - (prevCP.y - currentPoint.y),
            };
          }
          return currentPoint;
        };
        prevCP = backTrackCP(i, prev);
        addPath(
          c,
          c,
          `M ${prev.x},${prev.y} ${encodeSVGPath({
            type: SVGPathData.QUAD_TO,
            relative: false,
            x: c.x,
            y: c.y,
            x1: prevCP.x,
            y1: prevCP.y,
          })}`
        );
        break;
      }
      case SVGPathData.ARC: {
        assert(prev);
        addPath(
          c,
          c,
          `M ${prev.x},${prev.y} A ${c.rX} ${c.rY} ${c.xRot} ${c.lArcFlag} ${c.sweepFlag} ${c.x} ${c.y}`
        );
        break;
      }
      default: {
        assertNever(c);
      }
    }
  }

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).end(
    [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',

      // grid
      '<rect width="23.85" height="23.85" x=".075" y=".075" fill="#fff" stroke="#e2e8f0" stroke-width=".1" rx="1" ry="1"/>',
      '<path stroke="#e2e8f0" stroke-width=".1" d="M.05 1h23.9M1 .05v23.9M.05 2h23.9M2 .05v23.9M.05 3h23.9M3 .05v23.9M.05 4h23.9M4 .05v23.9M.05 5h23.9M5 .05v23.9M.05 6h23.9M6 .05v23.9M.05 7h23.9M7 .05v23.9M.05 8h23.9M8 .05v23.9M.05 9h23.9M9 .05v23.9M.05 10h23.9M10 .05v23.9M.05 11h23.9M11 .05v23.9M.05 12h23.9M12 .05v23.9M.05 13h23.9M13 .05v23.9M.05 14h23.9M14 .05v23.9M.05 15h23.9M15 .05v23.9M.05 16h23.9M16 .05v23.9M.05 17h23.9M17 .05v23.9M.05 18h23.9M18 .05v23.9M.05 19h23.9M19 .05v23.9M.05 20h23.9M20 .05v23.9M.05 21h23.9M21 .05v23.9M.05 22h23.9M22 .05v23.9M.05 23h23.9M23 .05v23.9"/>',

      // 2px path padding
      '<mask id="point-overlap-mask" maskUnits="userSpaceOnUse" stroke="none">',
      '<rect x="0" y="0" width="24" height="24" fill="#fff" rx="1" />',
      `<path d="${paths
        .flatMap(({ prev, next }) => [`M${prev.x} ${prev.y}h.01`, `M${next.x} ${next.y}h.01`])
        .filter((val, idx, arr) => arr.indexOf(val) === idx)
        .join('')}" stroke-width="4" stroke="#000"/>`,
      '</mask>',
      ...paths.map(
        ({ d }) =>
          `<path d="${d}" stroke="#000" stroke-width="4" stroke-opacity=".05" mask="url(#point-overlap-mask)"/>`
      ),
      `<path d="${paths
        .flatMap(({ prev, next }) => [`M${prev.x} ${prev.y}h.01`, `M${next.x} ${next.y}h.01`])
        .filter((val, idx, arr) => arr.indexOf(val) === idx)
        .join('')}" stroke-width="4" stroke="#000" opacity=".05"/>`,

      // colored segmented path
      ...paths.map(({ d }, i) => `<path d="${d}" stroke="${colors[(i % colors.length) - 4]}"/>`),

      // white lines and circles
      ...paths.flatMap(({ d, prev, next, isStart, c }, i) => {
        const element = paths.filter((p) => p.c.id === c.id);
        const lastElement = element.at(-1)?.next;
        assert(lastElement);
        const isClosed = element[0].prev.x === lastElement.x && element[0].prev.y === lastElement.y;
        return c.name === 'path'
          ? [
              `<mask id="path-mask-${i}" maskUnits="userSpaceOnUse" stroke="none">`,
              '<rect x="0" y="0" width="24" height="24" fill="#fff" rx="1" />',
              `<path d="M${prev.x} ${prev.y}h.01" stroke-width="1" stroke="#000"/>`,
              `<path d="M${next.x} ${next.y}h.01" stroke-width="1" stroke="#000"/>`,
              '</mask>',
              `<path d="M${prev.x} ${prev.y}h.01" stroke-width=".25" stroke="#fff" />`,
              `<path d="M${next.x} ${next.y}h.01" stroke-width=".25" stroke="#fff" />`,
              isStart &&
                !isClosed &&
                `<circle cx="${prev.x}" cy="${prev.y}" r=".5" stroke-width=".125" stroke="#fff" />`,
              paths[i + 1]?.isStart !== false &&
                !isClosed &&
                `<circle cx="${next.x}" cy="${next.y}" r=".5" stroke-width=".125" stroke="#fff" />`,
              `<path d="${d}" stroke="#fff" stroke-width=".125" mask="url(#path-mask-${i})"/>`,
            ].filter(Boolean)
          : [`<path d="${d}" stroke="#fff" stroke-width=".125"/>`];
      }),

      '</svg>',
    ].join('\n')
  );
}
