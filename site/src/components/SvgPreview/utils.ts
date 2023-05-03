import { INode, parseSync } from 'svgson';
import toPath from 'element-to-path';
import { SVGPathData, encodeSVGPath } from 'svg-pathdata';
import { Path, Point } from './types';

function assertNever(x: never): never {
  throw new Error('Unknown type: ' + x['type']);
}
export function assert(value: unknown): asserts value {
  if (value === undefined) {
    throw new Error('value must be defined');
  }
}

const convertToPathNode = (node: INode): { d: string; name: typeof node.name } => {
  if (node.name === 'path') {
    return { d: node.attributes.d, name: node.name };
  }
  if (node.name === 'circle') {
    const cx = parseFloat(node.attributes.cx);
    const cy = parseFloat(node.attributes.cy);
    const r = parseFloat(node.attributes.r);
    return {
      d: [
        `M ${cx} ${cy - r}`,
        `a ${r} ${r} 0 0 1 ${r} ${r}`,
        `a ${r} ${r} 0 0 1 ${0 - r} ${r}`,
        `a ${r} ${r} 0 0 1 ${0 - r} ${0 - r}`,
        `a ${r} ${r} 0 0 1 ${r} ${0 - r}`,
      ].join(''),
      name: node.name,
    };
  }
  return { d: toPath(node).replace(/z$/i, ''), name: node.name };
};

const extractNodes = (node: INode): INode[] => {
  if (['rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line', 'path'].includes(node.name)) {
    return [node];
  } else if (node.children && Array.isArray(node.children)) {
    return node.children.flatMap(extractNodes);
  }

  return [];
};

export const getNodes = (src: string) =>
  extractNodes(parseSync(src.includes('<svg') ? src : `<svg>${src}</svg>`));

export const getCommands = (src: string) =>
  getNodes(src)
    .map(convertToPathNode)
    .flatMap(({ d, name }, idx) =>
      new SVGPathData(d).toAbs().commands.map((c, cIdx) => ({ ...c, id: idx, idx: cIdx, name }))
    );

export const getPaths = (src: string) => {
  const commands = getCommands(src.includes('<svg') ? src : `<svg>${src}</svg>`);
  const paths: Path[] = [];
  let prev: Point | undefined = undefined;
  let start: Point | undefined = undefined;
  const addPath = (
    c: typeof commands[number],
    next: Point,
    d?: string,
    circle?: Path['circle']
  ) => {
    assert(prev);
    paths.push({
      c,
      d: d || `M ${prev.x} ${prev.y} L ${next.x} ${next.y}`,
      prev,
      next,
      circle,
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
        addPath(c, c, `M ${prev.x} ${prev.y} ${encodeSVGPath(c)}`);
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
          `M ${prev.x} ${prev.y} ${encodeSVGPath({
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
        addPath(c, c, `M ${prev.x} ${prev.y} ${encodeSVGPath(c)}`);
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
          `M ${prev.x} ${prev.y} ${encodeSVGPath({
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
        const center = arcEllipseCenter(
          prev.x,
          prev.y,
          c.rX,
          c.rY,
          c.xRot,
          c.lArcFlag,
          c.sweepFlag,
          c.x,
          c.y
        );
        addPath(
          c,
          c,
          `M ${prev.x} ${prev.y} A${c.rX} ${c.rY} ${c.xRot} ${c.lArcFlag} ${c.sweepFlag} ${c.x} ${c.y}`,
          c.rX === c.rY ? { ...center, r: c.rX } : undefined
        );
        break;
      }
      default: {
        assertNever(c);
      }
    }
  }
  return paths;
};

export const arcEllipseCenter = (
  x1: number,
  y1: number,
  rx: number,
  ry: number,
  a: number,
  fa: number,
  fs: number,
  x2: number,
  y2: number
) => {
  const phi = (a * Math.PI) / 180;

  const M = [
    [Math.cos(phi), Math.sin(phi)],
    [-Math.sin(phi), Math.cos(phi)],
  ];
  const V = [(x1 - x2) / 2, (y1 - y2) / 2];

  const [x1p, y1p] = [M[0][0] * V[0] + M[0][1] * V[1], M[1][0] * V[0] + M[1][1] * V[1]];

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    rx = Math.sqrt(lambda) * rx;
    ry = Math.sqrt(lambda) * ry;
  }

  const sign = fa === fs ? -1 : 1;

  const co =
    sign *
    Math.sqrt(
      Math.max(rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p, 0) /
        (rx * rx * y1p * y1p + ry * ry * x1p * x1p)
    );

  const V2 = [(rx * y1p) / ry, (-ry * x1p) / rx];
  const Cp = [V2[0] * co, V2[1] * co];

  const M2 = [
    [Math.cos(phi), -Math.sin(phi)],
    [Math.sin(phi), Math.cos(phi)],
  ];
  const V3 = [(x1 + x2) / 2, (y1 + y2) / 2];
  const C = [
    M2[0][0] * Cp[0] + M2[0][1] * Cp[1] + V3[0],
    M2[1][0] * Cp[0] + M2[1][1] * Cp[1] + V3[1],
  ];

  return { x: C[0], y: C[1] };
};
