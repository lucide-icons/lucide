import { format } from './format';
import Commander from 'svg-path-commander';
import toPath from 'element-to-path';
import { parseSync } from 'svgson';
import { Point } from 'src/components/SvgPreview/types';

const commander = (d: string) => new Commander(d).toAbsolute();

function getConvexHull(points) {
  points.sort(function (a, b) {
    return a.x != b.x ? a.x - b.x : a.y - b.y;
  });

  const n = points.length;
  const hull = [];

  for (let i = 0; i < 2 * n; i++) {
    const j = i < n ? i : 2 * n - 1 - i;
    while (
      hull.length >= 2 &&
      removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j])
    )
      hull.pop();
    hull.push(points[j]);
  }

  hull.pop();
  return hull;
}

function removeMiddle(a, b, c) {
  const cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
  const dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
  return cross < 0 || (cross == 0 && dot <= 0);
}

function calcPolygonArea(vertices: Point[]) {
  let total = 0;

  for (let i = 0, l = vertices.length; i < l; i++) {
    const addX = vertices[i].x;
    const addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
    const subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
    const subY = vertices[i].y;

    total += addX * addY * 0.5;
    total -= subX * subY * 0.5;
  }

  return Math.abs(total);
}

const getVolume = (svg: string) => {
  const data = parseSync(svg);
  const tessellatedPoints: Point[] = [];
  for (let i = 0; i < data.children.length; i++) {
    const command = commander(
      data.children[i].name === 'path' ? data.children[i].attributes.d : toPath(data.children[i])
    );
    const length = command.getTotalLength();
    for (let i2 = 0; i2 < length; i2 += 0.5) {
      tessellatedPoints.push(command.getPointAtLength(i2));
    }
  }
  return calcPolygonArea(getConvexHull(tessellatedPoints));
};

export default async function handler(req, res) {
  res.status(200).end(JSON.stringify(getVolume(format(req.body))));
}
