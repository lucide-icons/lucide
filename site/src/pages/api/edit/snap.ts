import { format } from './format';
import Commander from 'svg-path-commander';
import toPath from 'element-to-path';
import { parseSync, stringify } from 'svgson';
import { getSegmentInfo } from './optimize';
import { Point } from 'src/components/SvgPreview/types';

const commander = (d: string) => new Commander(d).toAbsolute();

const getDistance = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) => {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
};

const snapToPath = (svg: string, maxDistance = 3, minDistance = 0.01) => {
  if (minDistance > maxDistance) {
    throw new Error('minDistance must be smaller than maxDistance');
  }
  const data = parseSync(svg);
  const tessellatedPoints: {
    x: number;
    y: number;
    idx: number;
    distanceToEnd: number;
    distanceToStart: number;
  }[] = [];
  for (let i = 0; i < data.children.length; i++) {
    const command = commander(
      data.children[i].name === 'path' ? data.children[i].attributes.d : toPath(data.children[i])
    );
    const length = command.getTotalLength();
    for (let i2 = 0; i2 < length; i2 += minDistance * 10) {
      tessellatedPoints.push({
        ...command.getPointAtLength(i2),
        idx: i,
        distanceToStart: i2,
        distanceToEnd: length - i2,
      });
    }
  }
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].name === 'path') {
      const segmentInfo = getSegmentInfo(data.children[i].attributes.d);
      const closestToStart = tessellatedPoints
        .map((val) => ({
          distance:
            val.idx === i && val.distanceToStart < 2
              ? Infinity
              : getDistance(val, segmentInfo.start),
          ...val,
        }))
        .sort((a, b) => a.distance - b.distance)[0];
      const closestToEnd = tessellatedPoints
        .map((val) => ({
          distance:
            val.idx === i && val.distanceToEnd < 2 ? Infinity : getDistance(val, segmentInfo.end),
          ...val,
        }))
        .sort((a, b) => a.distance - b.distance)[0];
      if (closestToStart.distance < maxDistance && closestToStart.distance > minDistance) {
        segmentInfo.command.segments[0][1] = closestToStart.x;
        segmentInfo.command.segments[0][2] = closestToStart.y;
        data.children[i].attributes.d = Commander.pathToString(segmentInfo.command.segments);
      }
      if (closestToEnd.distance < maxDistance && closestToEnd.distance > minDistance) {
        const reversedSegments = commander(data.children[i].attributes.d)
          .toAbsolute()
          .reverse().segments;
        reversedSegments[0][1] = closestToEnd.x;
        reversedSegments[0][2] = closestToEnd.y;
        data.children[i].attributes.d = commander(Commander.pathToString(reversedSegments))
          .reverse()
          .toString();
      }
    }
  }
  return stringify(data);
};

export default async function handler(req, res) {
  const before = format(req.body);
  const after = format(snapToPath(before));
  res.status(200).end(before === after ? req.body : after);
}
