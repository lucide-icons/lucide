import { SVGProps } from 'react';
import { getCommands } from './utils';

export type Point = { x: number; y: number };

export type Path = {
  d: string;
  prev: Point;
  next: Point;
  isStart: boolean;
  circle?: { x: number; y: number; r: number; tangentIntersection?: Point };
  cp1?: Point;
  cp2?: Point;
  c: ReturnType<typeof getCommands>[number];
};

export type PathProps<
  RequiredProps extends keyof SVGProps<SVGPathElement | SVGRectElement | SVGCircleElement>,
  NeverProps extends keyof SVGProps<SVGPathElement | SVGRectElement | SVGCircleElement>,
> = Required<Pick<React.SVGProps<SVGElement & SVGRectElement & SVGCircleElement>, RequiredProps>> &
  Omit<
    React.SVGProps<SVGPathElement & SVGRectElement & SVGCircleElement>,
    RequiredProps & NeverProps
  >;
