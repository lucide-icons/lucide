import { format } from './format';
import { optimize } from 'svgo';
import commander from 'svg-path-commander';
import { parseSync, stringify, INode } from 'svgson';
import toPath from 'element-to-path';

const isDistanceSmaller = ({ x: x1, y: y1 }, { x: x2, y: y2 }, threshold: number) => {
  const x = x1 - x2;
  const y = y1 - y2;
  return x * x + y * y <= threshold * threshold;
};

const getSegmentInfo = (d: string) => {
  const command = new commander(d);
  const start = command.getPointAtLength(0);
  const end = command.getPointAtLength(command.getTotalLength());
  return { command, start, end };
};

const mergePaths = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const b = getSegmentInfo(data.children[i].attributes.d);
      if (!isDistanceSmaller(b.start, b.end, 0.1)) {
        for (let i2 = 0; i2 < i; i2++) {
          if (data.children[i2].name === 'path' && i !== i2) {
            const a = getSegmentInfo(data.children[i2].attributes.d);
            if (data.children[i].attributes.d) {
              if (
                isDistanceSmaller(a.end, b.end, 0.1) &&
                isDistanceSmaller(a.start, b.start, 0.1)
              ) {
                data.children[i2].attributes.d = commander.pathToString(
                  a.command
                    .toAbsolute()
                    .segments.concat(b.command.toAbsolute().reverse().segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (
                isDistanceSmaller(a.end, b.start, 0.1) &&
                isDistanceSmaller(a.start, b.end, 0.1)
              ) {
                data.children[i2].attributes.d = commander.pathToString(
                  a.command
                    .toAbsolute()
                    .segments.concat(b.command.toAbsolute().segments.slice(1)) as any
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
            if (!isDistanceSmaller(a.start, a.end, 0.1)) {
              if (isDistanceSmaller(a.end, b.end, 0.1)) {
                data.children[i2].attributes.d = commander.pathToString(
                  a.command
                    .toAbsolute()
                    .segments.concat(b.command.toAbsolute().reverse().segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (isDistanceSmaller(a.end, b.start, 0.1)) {
                data.children[i2].attributes.d = commander.pathToString(
                  a.command
                    .toAbsolute()
                    .segments.concat(b.command.toAbsolute().segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (isDistanceSmaller(a.start, b.end, 0.1)) {
                data.children[i2].attributes.d = commander.pathToString(
                  b.command
                    .toAbsolute()
                    .segments.concat(a.command.toAbsolute().segments.slice(1)) as any
                );
                data.children[i].name = undefined;
                i = 0;
                break;
              } else if (isDistanceSmaller(a.start, b.start, 0.1)) {
                data.children[i2].attributes.d = commander.pathToString(
                  b.command
                    .toAbsolute()
                    .reverse()
                    .segments.concat(a.command.toAbsolute().segments.slice(1)) as any
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

const fixDots = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const command = new commander(data.children[i].attributes.d);
      if (command.getTotalLength() <= 0.1) {
        const { x, y } = command.getPointAtLength(0);
        data.children[i].attributes.d = `M ${x} ${y}h0.01`;
      }
    }
  }
  return stringify(data);
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

const snapToGrid = (svg: string) => {
  const data = parseSync(svg);
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      data.children[i].attributes.d = data.children[i].attributes.d.replace(
        /\d*\.(99|98|97|96|01|02|03|04|49|48|47|46|51|52|53|54|11|21|31|41|51|61|71|81|91|09|19|29|39|49|59|69|79|89)\d*/g,
        (val) => Math.round(parseFloat(val) * 10) / 10 + ''
      );
    }
  }
  return stringify(data);
};

const pathsToElement = (svg: string) => {
  return svg;
  const data = parseSync(svg);
  // TODO convert path to rect
  // TODO convert path to circle
  return stringify(data);
};

export const svgo = (svg: string) => {
  const data = parseSync(svg);
  data.children.forEach((c) => {
    if (c.name === 'path') {
      const d = c.attributes.d;
      c.attributes.d = new commander(d).toCurve().toString();
    }
  });
  return optimize(svg, {
    floatPrecision: 2,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            convertShapeToPath: false,
            mergePaths: false,
            convertPathData: {
              makeArcs: {
                threshold: 20,
                tolerance: 10,
              },
            },
          },
        },
      },
    ],
  }).data;
};

export default async function handler(req, res) {
  const before = format(req.body);
  const after = format(
    svgo(
      fixDots(snapToGrid(svgo(mergePaths(pathsToElement(elementsToPath(before)))))).replace(
        /stroke-linecap="round"/,
        'stroke-linecap="butt"'
      )
    )
  );
  res.status(200).end(before === after ? req.body : after);
}
