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
      '<rect x=".1" y=".1" width="23.8" height="23.8" rx="1" fill="#fff" stroke="#E2E8F0" stroke-width=".1"/>',
      '<path stroke="#E2E8F0" stroke-width=".1" d="M0 1h24M1 0v24M0 2h24M2 0v24M0 3h24M3 0v24M0 4h24M4 0v24M0 5h24M5 0v24M0 6h24M6 0v24M0 7h24M7 0v24M0 8h24M8 0v24M0 9h24M9 0v24M0 10h24M10 0v24M0 11h24M11 0v24M0 12h24M12 0v24M0 13h24M13 0v24M0 14h24M14 0v24M0 15h24M15 0v24M0 16h24M16 0v24M0 17h24M17 0v24M0 18h24M18 0v24M0 19h24M19 0v24M0 20h24M20 0v24M0 21h24M21 0v24M0 22h24M22 0v24M0 23h24M23 0v24"/>',

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
        const isEnd = paths[i + 1]?.isStart !== false;
        return c.name === 'path'
          ? [
              `<mask id="path-mask-${i}" maskUnits="userSpaceOnUse" stroke="none">`,
              '<rect x="0" y="0" width="24" height="24" fill="#fff" rx="1" />',
              `<path d="M${prev.x} ${prev.y}h.01" stroke-width="${
                isStart && !isClosed ? 1 : 0.5
              }" stroke="#000"/>`,
              `<path d="M${next.x} ${next.y}h.01" stroke-width="${
                isEnd && !isClosed ? 1 : 0.5
              }" stroke="#000"/>`,
              '</mask>',
              isStart &&
                !isClosed &&
                `<path d="M${prev.x} ${prev.y}h.01" stroke-width=".25" stroke="#fff" />`,
              isEnd &&
                !isClosed &&
                `<path d="M${next.x} ${next.y}h.01" stroke-width=".25" stroke="#fff" />`,
              `<circle cx="${prev.x}" cy="${prev.y}" r="${
                isStart && !isClosed ? 0.5 : 0.25
              }" stroke-width=".125" stroke="#fff" />`,
              `<circle cx="${next.x}" cy="${next.y}" r="${
                isEnd && !isClosed ? 0.5 : 0.25
              }" stroke-width=".125" stroke="#fff" />`,
              `<path d="${d}" stroke="#fff" stroke-width=".125" mask="url(#path-mask-${i})"/>`,
            ].filter(Boolean)
          : [`<path d="${d}" stroke="#fff" stroke-width=".125"/>`];
      }),

      '</svg>',
    ].join('\n')
  );
}
