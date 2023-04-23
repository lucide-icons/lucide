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

const extractPaths = (node: INode): { d: string; name: typeof node.name }[] => {
  if (/(rect|circle|ellipse|polygon|polyline|line|path)/.test(node.name)) {
    return [{ d: toPath(node), name: node.name }];
  } else if (node.children && Array.isArray(node.children)) {
    return node.children.flatMap(extractPaths);
  }

  return [];
};

export const getCommands = (src: string) =>
  extractPaths(parseSync(src)).flatMap(({ d, name }, idx) =>
    new SVGPathData(d).toAbs().commands.map((c) => ({ ...c, id: idx, name }))
  );

export const getPaths = (src: string) => {
  const commands = getCommands(src);
  const paths: Path[] = [];
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
  return paths;
};
