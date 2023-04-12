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
  RequiredProps extends keyof SVGProps<ElementType>,
  NeverProps extends keyof SVGProps<ElementType>,
  ElementType extends SVGElement = SVGGElement
> = Required<Pick<SVGProps<ElementType>, RequiredProps>> &
  Omit<
    SVGProps<ElementType>,
    RequiredProps & NeverProps
  >;
