import { SVGProps } from 'react';
import { getCommands } from './utils';

export type Point = { x: number; y: number };

export type Path = {
  d: string;
  prev: Point;
  next: Point;
  isStart: boolean;
  c: ReturnType<typeof getCommands>[number];
};

export type PathProps<
  RequiredProps extends keyof SVGProps<SVGPathElement | SVGRectElement | SVGCircleElement>,
  NeverProps extends keyof SVGProps<SVGPathElement | SVGRectElement | SVGCircleElement>
> = Required<Pick<React.SVGProps<SVGElement & SVGRectElement & SVGCircleElement>, RequiredProps>> &
  Omit<
    React.SVGProps<SVGPathElement & SVGRectElement & SVGCircleElement>,
    RequiredProps & NeverProps
  >;
