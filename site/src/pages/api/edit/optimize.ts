import { format } from './format';
import { optimize } from 'svgo';
import Commander, { ASegment, CSegment, PathSegment } from 'svg-path-commander';
import { INode, parseSync, stringify } from 'svgson';
import toPath from 'element-to-path';
import { Point } from 'src/components/SvgPreview/types';
import { flow } from 'lodash';
import { SVGPathData, SVGPathDataTransformer } from 'svg-pathdata';
import { Bezier } from 'bezier-js';
import { getPaths } from 'src/components/SvgPreview/utils';

const commander = (d: string) => new Commander(d).toAbsolute();

const isDistanceSmaller = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point, threshold: number) => {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2 <= threshold * threshold;
};

export const getSegmentInfo = (d: string) => {
  const command = commander(d);
  const start = command.getPointAtLength(0);
  const end = command.getPointAtLength(command.getTotalLength());
  return { command, start, end };
};

const mergePaths = (svg: string, maxDistance = 0.1) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const b = getSegmentInfo(data.children[i].attributes.d);
      if (!isDistanceSmaller(b.start, b.end, maxDistance)) {
        for (let i2 = 0; i2 < i; i2++) {
          if (data.children[i2].name === 'path' && i !== i2) {
            const a = getSegmentInfo(data.children[i2].attributes.d);
            if (data.children[i].attributes.d) {
              if (
                isDistanceSmaller(a.end, b.end, maxDistance) &&
                isDistanceSmaller(a.start, b.start, maxDistance)
              ) {
                data.children[i2].attributes.d = Commander.pathToString(
                  a.command.segments.concat(b.command.reverse().segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (
                isDistanceSmaller(a.end, b.start, maxDistance) &&
                isDistanceSmaller(a.start, b.end, maxDistance)
              ) {
                data.children[i2].attributes.d = Commander.pathToString(
                  a.command.segments.concat(b.command.segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              }
            }
          }
        }
        for (let i2 = 0; i2 < i; i2++) {
          if (data.children[i2].name === 'path' && i !== i2) {
            const a = getSegmentInfo(data.children[i2].attributes.d);
            if (!isDistanceSmaller(a.start, a.end, maxDistance)) {
              if (isDistanceSmaller(a.end, b.end, maxDistance)) {
                data.children[i2].attributes.d = Commander.pathToString(
                  a.command.segments.concat(b.command.reverse().segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (isDistanceSmaller(a.end, b.start, maxDistance)) {
                data.children[i2].attributes.d = Commander.pathToString(
                  a.command.segments.concat(b.command.segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (isDistanceSmaller(a.start, b.end, maxDistance)) {
                data.children[i2].attributes.d = Commander.pathToString(
                  b.command.segments.concat(a.command.segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (isDistanceSmaller(a.start, b.start, maxDistance)) {
                data.children[i2].attributes.d = Commander.pathToString(
                  b.command.reverse().segments.concat(a.command.segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              }
            }
          }
        }
      }
    }
  }
  return stringify(data);
};

const getLinesAndPoints = (children: INode[]) => {
  const lines: { prevPoint: Point; nextPoint: Point; id: number; idx: number }[] = [];
  const points: (Point & { id: number; idx: number })[] = [];
  for (let i = 0; i < children.length; i++) {
    const command = commander(
      children[i].name === 'path' ? children[i].attributes.d : toPath(children[i])
    );
    let prevPoint: Point;
    let nextPoint: Point;
    for (let i2 = 0; i2 < command.segments.length; i2++) {
      const segment = command.segments[i2];
      prevPoint = nextPoint;
      if (segment[0] === 'Z') {
        nextPoint = { x: command.segments[0][1], y: command.segments[0][2] };
        lines.push({ prevPoint, nextPoint, id: i, idx: i2 });
      } else if (segment[0] === 'V') {
        nextPoint = { x: prevPoint.x, y: segment[1] };
        lines.push({ prevPoint, nextPoint, id: i, idx: i2 });
      } else if (segment[0] === 'H') {
        nextPoint = { x: segment[1], y: prevPoint.y };
        lines.push({ prevPoint, nextPoint, id: i, idx: i2 });
      } else if (segment[0] === 'L') {
        nextPoint = { x: segment.at(-2), y: segment.at(-1) } as Point;
        lines.push({ prevPoint, nextPoint, id: i, idx: i2 });
      } else {
        nextPoint = { x: segment.at(-2), y: segment.at(-1) } as Point;
      }
      points.push({ ...nextPoint, id: i, idx: i2 });
    }
  }
  return { lines, points };
};

const isPointOnLine = (
  { prevPoint, nextPoint }: { prevPoint: Point; nextPoint: Point },
  point: Point
) => {
  const dxc = point.x - prevPoint.x;
  const dyc = point.y - prevPoint.y;
  const dxl = nextPoint.x - prevPoint.x;
  const dyl = nextPoint.y - prevPoint.y;

  return Math.abs(dxc * dyl - dyc * dxl) < 0.1;
};

const isPointInLine = (
  { prevPoint, nextPoint }: { prevPoint: Point; nextPoint: Point },
  point: Point
) => {
  if (point.x > Math.max(prevPoint.x, nextPoint.x)) return false;
  if (point.x < Math.min(prevPoint.x, nextPoint.x)) return false;
  if (point.y > Math.max(prevPoint.y, nextPoint.y)) return false;
  if (point.y < Math.min(prevPoint.y, nextPoint.y)) return false;
  return isPointOnLine({ prevPoint, nextPoint }, point);
};

const fixDots = (svg: string) => {
  const data = parseSync(svg);
  const { lines, points } = getLinesAndPoints(data.children);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const command = commander(data.children[i].attributes.d);
      if (command.getTotalLength() <= 0.1) {
        const { x, y } = command.getPointAtLength(0);
        if (
          lines.some((line) => line.id !== i && isPointInLine(line, { x, y })) ||
          points.some((point) => point.id !== i && isDistanceSmaller(point, { x, y }, 0.1))
        ) {
          data.children[i] = undefined;
        } else {
          data.children[i].attributes.d = `M ${x} ${y}h0.01`;
        }
      }
    }
  }
  data.children = data.children.filter(Boolean);
  return stringify(data);
};

const removeTinySegments = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const pathData = new SVGPathData(data.children[i].attributes.d)
        .toAbs()
        .transform(SVGPathDataTransformer.NORMALIZE_HVZ());
      const command = commander(data.children[i].attributes.d);
      for (let j = 1; j < command.segments.length; j++) {
        if (
          isDistanceSmaller(pathData.commands[j] as Point, pathData.commands[j - 1] as Point, 0.05)
        ) {
          command.segments.splice(j, 1);
          pathData.commands.splice(j, 1);
          j--;
        }
        data.children[i].attributes.d = command.toString();
      }
    }
  }
  return stringify(data);
};

const mergeLines = (svg: string) => {
  const data = parseSync(svg);
  const { lines } = getLinesAndPoints(data.children);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const command = commander(data.children[i].attributes.d);
      for (let i2 = 0; i2 < command.segments.length; i2++) {
        const i3 = lines.findIndex((line) => line.id === i && line.idx === i2);
        if (i3 !== -1) {
          for (let i4 = 0; i4 < lines.length; i4++) {
            const line = lines[i4];
            if (line.id !== i || line.idx !== i2) {
              if (
                ((isPointOnLine(line, lines[i3].prevPoint) &&
                  isPointInLine(line, lines[i3].nextPoint)) ||
                  (isPointInLine(line, lines[i3].prevPoint) &&
                    isPointOnLine(line, lines[i3].nextPoint))) &&
                !isDistanceSmaller(lines[i3].prevPoint, lines[i3].nextPoint, 0.1) &&
                !isDistanceSmaller(line.prevPoint, line.nextPoint, 0.1)
              ) {
                const [{ val: prevPoint }, { val: nextPoint }] = [
                  line.prevPoint,
                  line.nextPoint,
                  lines[i3].prevPoint,
                  lines[i3].nextPoint,
                ]
                  .map((val, _, arr) => ({
                    val,
                    distance: Math.max(...arr.map((b) => getDistance([val.x, val.y], [b.x, b.y]))),
                  }))
                  .sort((a, b) => b.distance - a.distance);

                data.children.push({
                  name: 'path',
                  value: undefined,
                  children: undefined,
                  type: 'element',
                  attributes: {
                    d: `M ${prevPoint.x} ${prevPoint.y} L ${nextPoint.x} ${nextPoint.y}`,
                  },
                });
                lines.push({ prevPoint, nextPoint, id: data.children.length, idx: 1 });
                lines.splice(i3, 1);
                lines.splice(i4, 1);
                break;
              }
            }
          }
        }
      }
    }
  }

  return removeOverlappingLineSegments(stringify(data));
};

const removeOverlappingLineSegments = (svg: string) => {
  const data = parseSync(svg);
  const { lines } = getLinesAndPoints(data.children);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const command = commander(data.children[i].attributes.d);
      for (let i2 = 0; i2 < command.segments.length; i2++) {
        const i3 = lines.findIndex((line) => line.id === i && line.idx === i2);
        if (
          i3 !== -1 &&
          lines.some(
            (line) =>
              (line.id !== i || line.idx !== i2) &&
              isPointInLine(line, lines[i3].prevPoint) &&
              isPointInLine(line, lines[i3].nextPoint)
          )
        ) {
          if (command.segments[command.segments.length - 1][0] === 'Z') {
            command.segments[command.segments.length - 1] = [
              'L',
              command.segments[0][1],
              command.segments[0][2],
            ];
          }
          command.segments[i2] = ['M', lines[i3].nextPoint.x, lines[i3].nextPoint.y];
          lines.splice(i3, 1);
          // remove all trailing Move commands
          for (let i4 = command.segments.length - 1; i4 >= 0; i4--) {
            if (command.segments[i4][0] === 'M') {
              command.segments.splice(i4, 1);
            } else {
              break;
            }
          }
          if (command.segments.some((val) => val[0] !== 'M')) {
            data.children[i].attributes.d = command.toString();
          } else {
            data.children[i] = undefined;
            break;
          }
        }
      }
    }
  }
  data.children = data.children.filter(Boolean);
  return format(stringify(data));
};

const elementsToPath = (svg: string) => {
  const data = parseSync(svg);
  data.children = data.children.map((c) =>
    ['line', 'polyline', 'polygon'].includes(c.name)
      ? { ...c, name: 'path', attributes: { d: toPath(c) } }
      : c
  );
  return stringify(data);
};

const smartRound = (val: string) =>
  val.replace(
    /\d*\.(99|98|97|96|01|02|03|04|49|48|47|46|51|52|53|54|11|21|31|41|51|61|71|81|91|09|19|29|39|49|59|69|79|89)\d*/g,
    (val) => Math.round(parseFloat(val) * 10) / 10 + ''
  );
const snapToGrid = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    data.children[i].attributes = Object.keys(data.children[i].attributes).reduce((acc, key) => {
      if (key === 'd') {
        const command = commander(data.children[i].attributes.d);
        command.segments.forEach((s) => {
          if (s[0] === 'A') {
            if (typeof s[s.length - 2] === 'number') {
              s[1] = smartRound(Math.round(s[1] * 100) / 100 + '') as any;
            }
            if (typeof s[s.length - 1] === 'number') {
              s[2] = smartRound(Math.round(s[2] * 100) / 100 + '') as any;
            }
          } else {
            if (typeof s[s.length - 2] === 'number') {
              s[s.length - 2] = smartRound(Math.round((s.at(-2) as number) * 10) / 10 + '') as any;
            }
            if (typeof s[s.length - 1] === 'number') {
              s[s.length - 1] = smartRound(Math.round((s.at(-1) as number) * 10) / 10 + '') as any;
            }
          }
        });
        acc[key] = command.toString();
      } else {
        acc[key] = smartRound(data.children[i].attributes[key]);
      }

      return acc;
    }, {});
  }
  return stringify(data);
};

function radian(ux, uy, vx, vy) {
  const dot = ux * vx + uy * vy;
  const mod = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
  let rad = Math.acos(dot / mod);
  if (ux * vy - uy * vx < 0.0) {
    rad = -rad;
  }
  return rad;
}
function getArcCenter(
  x1: number,
  y1: number,
  rx: number,
  ry: number,
  phi: number,
  fA: number,
  fS: number,
  x2: number,
  y2: number
) {
  if (rx < 0) {
    rx = -rx;
  }
  if (ry < 0) {
    ry = -ry;
  }
  if (rx == 0.0 || ry == 0.0) {
    throw Error('rx and ry can not be 0');
  }

  const s_phi = Math.sin(phi);
  const c_phi = Math.cos(phi);
  const hd_x = (x1 - x2) / 2.0; // half diff of x
  const hd_y = (y1 - y2) / 2.0; // half diff of y
  const hs_x = (x1 + x2) / 2.0; // half sum of x
  const hs_y = (y1 + y2) / 2.0; // half sum of y

  const x1_ = c_phi * hd_x + s_phi * hd_y;
  const y1_ = c_phi * hd_y - s_phi * hd_x;

  const lambda = (x1_ * x1_) / (rx * rx) + (y1_ * y1_) / (ry * ry);
  if (lambda > 1) {
    rx = rx * Math.sqrt(lambda);
    ry = ry * Math.sqrt(lambda);
  }

  const rx_ry = rx * ry;
  const rxy1_ = rx * y1_;
  const ryx1_ = ry * x1_;
  const sum_of_sq = rxy1_ * rxy1_ + ryx1_ * ryx1_; // sum of square
  if (!sum_of_sq) {
    throw Error('start point can not be same as end point');
  }
  let coe = Math.sqrt(Math.abs((rx_ry * rx_ry - sum_of_sq) / sum_of_sq));
  if (fA == fS) {
    coe = -coe;
  }

  const cx = (coe * rxy1_) / ry;
  const cy = (-coe * ryx1_) / rx;

  const xcr1 = (x1_ - cx) / rx;
  const xcr2 = (x1_ + cx) / rx;
  const ycr1 = (y1_ - cy) / ry;
  const ycr2 = (y1_ + cy) / ry;

  const startAngle = radian(1.0, 0.0, xcr1, ycr1);

  const PIx2 = Math.PI * 2.0;
  let deltaAngle = radian(xcr1, ycr1, -xcr2, -ycr2);
  while (deltaAngle > PIx2) {
    deltaAngle -= PIx2;
  }
  while (deltaAngle < 0.0) {
    deltaAngle += PIx2;
  }
  if (fS == 0) {
    deltaAngle -= PIx2;
  }
  let endAngle = startAngle + deltaAngle;
  while (endAngle > PIx2) {
    endAngle -= PIx2;
  }
  while (endAngle < 0.0) {
    endAngle += PIx2;
  }

  return {
    rx,
    ry,
    x: c_phi * cx - s_phi * cy + hs_x,
    y: s_phi * cx + c_phi * cy + hs_y,
    startAngle: startAngle,
    deltaAngle: deltaAngle,
    endAngle: endAngle,
    clockwise: fS == 1,
  };
}

const getCircle = (segments: PathSegment[]): INode | undefined => {
  let startPoint: Point;
  let prevPoint: Point;
  const prevCenters: ReturnType<typeof getArcCenter>[] = [];
  for (let j = 0; j < segments.length; j++) {
    const segment = segments[j];
    if (segment[0] === 'M') {
      startPoint = { x: segment[1], y: segment[2] };
      prevPoint = startPoint;
    } else if (segment[0] === 'A' && segment[1] === segment[2]) {
      const center = getArcCenter(
        prevPoint.x,
        prevPoint.y,
        segment[1],
        segment[2],
        segment[3],
        segment[4],
        segment[5],
        segment[6],
        segment[7]
      );
      if (!center) return undefined;
      if (prevCenters.at(-1) && !isDistanceSmaller(center, prevCenters.at(-1), 0.1)) {
        return undefined;
      }
      prevPoint = { x: segment[6], y: segment[7] };
      prevCenters.push(center);
    } else {
      return undefined;
    }
  }
  if (!isDistanceSmaller(prevPoint, startPoint, 0.1)) {
    return undefined;
  }
  return {
    name: 'circle',
    type: 'element',
    value: undefined,
    children: undefined,
    attributes: {
      cx: prevCenters.reduce((acc, { x }) => acc + x, 0) / prevCenters.length + '',
      cy: prevCenters.reduce((acc, { y }) => acc + y, 0) / prevCenters.length + '',
      r: prevCenters.reduce((acc, { rx, ry }) => acc + rx + ry, 0) / (prevCenters.length * 2) + '',
    },
  };
};

const getRect = (segments: PathSegment[]): INode | undefined => {
  const [start, ...rest] = segments;
  let prevPoint = { x: start[1], y: start[2] };
  const points: Point[] = [];
  let radius = 0;
  for (let i = 0; i < rest.length; i++) {
    const segment = rest[i];
    if (segment[0] === 'L') {
      if (Math.abs(segment[1] - prevPoint.x) > 0.1 && Math.abs(segment[2] - prevPoint.y) > 0.1) {
        return undefined;
      }
      prevPoint = { x: segment[1], y: segment[2] };
    } else if (segment[0] === 'V') {
      prevPoint = { x: prevPoint.x, y: segment[1] };
    } else if (segment[0] === 'H') {
      prevPoint = { x: segment[1], y: prevPoint.y };
    } else if (segment[0] === 'Z') {
      prevPoint = { x: start[1], y: start[2] };
    } else if (
      segment[0] === 'A' &&
      segment[1] === segment[2] &&
      (!radius || radius === segment[1])
    ) {
      radius = segment[1];
      const center = getArcCenter(
        prevPoint.x,
        prevPoint.y,
        segment[1],
        segment[2],
        segment[3],
        segment[4],
        segment[5],
        segment[6],
        segment[7]
      );
      if (!center) return undefined;
      if (Math.abs(Math.abs(center.deltaAngle) - Math.PI) < 0.1) {
        points.push(center);
        points.push(center);
      } else if (Math.abs(Math.abs(center.deltaAngle) - Math.PI / 2) >= 0.1) {
        return undefined;
      }
      if (!points.length || !isDistanceSmaller(center, points.at(-1), 0.1)) {
        points.push(center);
      }
      prevPoint = { x: segment[6], y: segment[7] };
    } else {
      return undefined;
    }
    if (segments.every(([c]) => ['M', 'L', 'V', 'H', 'Z'].includes(c))) {
      points.push(prevPoint);
    }
  }
  if (points.length !== 4 || !isDistanceSmaller(prevPoint, { x: start[1], y: start[2] }, 0.1)) {
    return undefined;
  }
  const [p1, p2, p3, p4] = points;
  const x1 = Math.min(p1.x, p2.x, p3.x, p4.x);
  const x2 = Math.max(p1.x, p2.x, p3.x, p4.x);
  const y1 = Math.min(p1.y, p2.y, p3.y, p4.y);
  const y2 = Math.max(p1.y, p2.y, p3.y, p4.y);
  if (
    x1 !== x2 &&
    y1 !== y2 &&
    (points.filter(({ x }) => Math.abs(x - x1) < 0.01).length !== 2 ||
      points.filter(({ x }) => Math.abs(x - x2) < 0.01).length !== 2 ||
      points.filter(({ y }) => Math.abs(y - y1) < 0.01).length !== 2 ||
      points.filter(({ y }) => Math.abs(y - y2) < 0.01).length !== 2)
  ) {
    return undefined;
  }

  return {
    name: 'rect',
    type: 'element',
    value: undefined,
    children: undefined,
    attributes: {
      ...(radius
        ? {
            rx: radius + '',
          }
        : {}),
      x: x1 - radius + '',
      y: y1 - radius + '',
      width: x2 - x1 + radius * 2 + '',
      height: y2 - y1 + radius * 2 + '',
    },
  };
};

const pathsToElement = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const command = commander(data.children[i].attributes.d);
      const element = getCircle(command.segments) || getRect(command.segments);
      if (element) {
        data.children[i] = element;
      }
    }
  }
  return stringify(data);
};

function getDistance(point1: [number, number], point2: [number, number]) {
  return Math.hypot(point1[0] - point2[0], point1[1] - point2[1]);
}

const getArcFromCurve = (segment: CSegment, prevPoint: Point): ASegment | undefined => {
  const arcs = new Bezier(
    prevPoint.x * 100,
    prevPoint.y * 100,
    segment[1] * 100,
    segment[2] * 100,
    segment[3] * 100,
    segment[4] * 100,
    segment[5] * 100,
    segment[6] * 100
  ).arcs();
  if (
    arcs.length > 2 ||
    arcs.filter(
      (val) => Math.abs(arcs[0].r - val.r) > 0.01 && isDistanceSmaller(arcs[0], val, arcs[0].r / 30)
    ).length
  )
    return undefined;
  const sweep =
    (segment[6] - prevPoint.y) * (segment[1] - prevPoint.x) -
      (segment[5] - prevPoint.x) * (segment[2] - prevPoint.y) >
    0
      ? 1
      : 0;
  return ['A', arcs[0].r / 100, arcs[0].r / 100, 0, 0, sweep, segment[5], segment[6]];
};

const segmentsToArc = (svg: string) => {
  const data = parseSync(svg);
  let prevPoint: Point;
  data.children.forEach((c, idx) => {
    if (c.name === 'path') {
      const command = commander(
        new SVGPathData(c.attributes.d).transform(SVGPathDataTransformer.NORMALIZE_ST()).encode()
      );
      for (let i = 0; i < command.segments.length; i++) {
        const segment = command.segments[i];
        if (segment[0] === 'C') {
          const arc = getArcFromCurve(segment, prevPoint);
          if (arc) {
            command.segments[i] = arc;
            data.children[idx].attributes.d = command.toString();
          }
        }
        if (segment[0] === 'Z') {
          prevPoint = { x: command.segments[0][1], y: command.segments[0][2] };
        } else if (segment[0] === 'V') {
          prevPoint = { x: prevPoint.x, y: segment[1] };
        } else if (segment[0] === 'H') {
          prevPoint = { x: segment[1], y: prevPoint.y };
        } else {
          prevPoint = { x: segment.at(-2), y: segment.at(-1) } as Point;
        }
      }
    }
  });
  return stringify(data);
};

const svgo = (svg: string) => {
  return optimize(svg, {
    floatPrecision: 3,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            convertShapeToPath: false,
            mergePaths: false,
          },
        },
      },
    ],
  }).data;
};

const optimizeRect = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'rect') {
      const x = parseFloat(data.children[i].attributes.x);
      const y = parseFloat(data.children[i].attributes.y);
      const width = parseFloat(data.children[i].attributes.width);
      const height = parseFloat(data.children[i].attributes.height);
      const rx = parseFloat(data.children[i].attributes.rx) || 0;
      const ry = parseFloat(data.children[i].attributes.ry) || 0;
      if (!rx || ry >= width / 2) {
        delete data.children[i].attributes.rx;
      } else if (rx > width / 2) {
        data.children[i].attributes.rx = width / 2 + '';
      } else if (!ry || rx >= height / 2 || rx === ry) {
        delete data.children[i].attributes.ry;
      } else if (ry > height / 2) {
        data.children[i].attributes.ry = height / 2 + '';
      }
      if (
        (data.children[i].attributes.ry !== undefined ? ry : rx) === width / 2 &&
        rx === height / 2
      ) {
        data.children[i] = {
          name: 'circle',
          type: 'element',
          children: undefined,
          value: undefined,
          attributes: {
            cx: x + width / 2 + '',
            cy: y + width / 2 + '',
            r: width / 2 + '',
          },
        };
      }
    }
  }
  return stringify(data);
};

const optimizeEllipse = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'ellipse') {
      if (data.children[i].attributes.rx === data.children[i].attributes.ry) {
        data.children[i] = {
          name: 'circle',
          type: 'element',
          children: undefined,
          value: undefined,
          attributes: {
            cx: data.children[i].attributes.cx,
            cy: data.children[i].attributes.cy,
            r: data.children[i].attributes.rx,
          },
        };
      }
    }
  }
  return stringify(data);
};

const smartClose = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const { command, start, end } = getSegmentInfo(data.children[i].attributes.d);
      if (command.segments.length > 2 && isDistanceSmaller(start, end, 0.1)) {
        if (['H', 'V', 'L'].includes(command.segments.at(-1)[0])) {
          command.segments[command.segments.length - 1] = ['z'];
          data.children[i].attributes.d = command.toString();
        } else if (['H', 'V', 'L'].includes(command.segments[1][0])) {
          const reversed = command.reverse();
          reversed.segments[reversed.segments.length - 1] = ['z'];
          data.children[i].attributes.d = reversed.reverse().toString();
        } else if (
          command.segments.at(-1)[0] === 'Z' &&
          isDistanceSmaller(
            start,
            {
              x: command.segments.at(-2).at(-2) as number,
              y: command.segments.at(-2).at(-1) as number,
            },
            0.1
          )
        ) {
          command.segments.splice(command.segments.length - 1, 1);
          command.segments[command.segments.length - 1][
            command.segments[command.segments.length - 1].length - 2
          ] = command.segments[0][1];
          command.segments[command.segments.length - 1][
            command.segments[command.segments.length - 1].length - 1
          ] = command.segments[0][2];
          data.children[i].attributes.d = command.toString();
        }
      }
    }
  }
  return stringify(data);
};

const getArcs = (paths: ReturnType<typeof getPaths>) =>
  paths
    .filter(({ c }) => c.name === 'path' && c.type === SVGPathData.ARC)
    .map(({ d }) => ({
      name: 'path',
      type: 'element',
      children: undefined,
      value: undefined,
      attributes: {
        d: d,
      },
    }));

const mergeArcs = (svg: string) => {
  const before = _mergeArcs(svg);
  const paths = getPaths(before);
  const data = parseSync(before);
  const arcs = getArcs(paths);
  const notArcs = data.children.flatMap((node, idx) => {
    if (node.name !== 'path') return [node];
    const segments = paths.filter(({ c }) => c.id === idx && c.type !== SVGPathData.ARC);
    return segments.map(({ d }) => ({
      ...node,
      attributes: {
        d: d,
      },
    }));
  });

  const after = flow(
    stringify,
    getPaths,
    getArcs,
    (children) => ({ ...data, children: [...children, ...notArcs] }),
    stringify,
    mergePaths,
    _mergeArcs
  )({ ...data, children: arcs });

  return getArcs(getPaths(after)).length < arcs.length ? after : before;
};

const _mergeArcs = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const command = commander(data.children[i].attributes.d);
      const segments = command.segments;
      for (let j = 0; j < segments.length; j++) {
        const prevSegment = segments[j - 1];
        const prevPrevSegment = segments[j - 2];
        const segment = segments[j];
        if (
          segment &&
          prevSegment &&
          prevPrevSegment &&
          prevSegment[0] === 'A' &&
          prevSegment[1] === prevSegment[2] &&
          segment[0] === 'A' &&
          segment[1] === segment[2]
        ) {
          const prevCenter = getArcCenter(
            prevPrevSegment.at(-2) as number,
            prevPrevSegment.at(-1) as number,
            prevSegment[1],
            prevSegment[2],
            prevSegment[3],
            prevSegment[4],
            prevSegment[5],
            prevSegment[6],
            prevSegment[7]
          );
          const center = getArcCenter(
            prevSegment[6],
            prevSegment[7],
            segment[1],
            segment[2],
            segment[3],
            segment[4],
            segment[5],
            segment[6],
            segment[7]
          );
          if (
            center.clockwise === prevCenter.clockwise &&
            isDistanceSmaller(center, prevCenter, 0.1) &&
            Math.abs(prevCenter.deltaAngle + center.deltaAngle) < Math.PI * 2
          ) {
            const newCenter = getArcCenter(
              prevPrevSegment.at(-2) as number,
              prevPrevSegment.at(-1) as number,
              prevSegment[1],
              prevSegment[2],
              prevSegment[3],
              1,
              prevSegment[5],
              segment[6],
              segment[7]
            );
            segments[j - 1][4] = isDistanceSmaller(center, newCenter, 0.1) ? 1 : 0;
            segments[j - 1][6] = segment[6];
            segments[j - 1][7] = segment[7];
            segments.splice(j, 1);
            j--;
          }
          command.segments = segments;
        }
        data.children[i].attributes.d = command.toString();
      }
    }
  }
  return stringify(data);
};

const removeBackdrop = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'rect') {
      const { x = '0', y = '0', width, height } = data.children[i].attributes;
      if (x === '0' && y === '0' && width === '24' && height === '24') {
        data.children.splice(i, 1);
      }
    }
  }
  return stringify(data);
};

const runOptimizations = flow(
  elementsToPath,
  fixDots,
  mergeLines,
  removeTinySegments,
  mergeArcs,
  mergePaths,
  segmentsToArc,
  pathsToElement,
  removeBackdrop,
  optimizeRect,
  optimizeEllipse,
  smartClose,
  snapToGrid,
  svgo,
  fixDots,
  format
);

export default async function handler(req, res) {
  const before = format(req.body);
  const after = runOptimizations(runOptimizations(before));
  res.status(200).end(before === after ? req.body : after);
}
