type IconNodeElement =
  'circle' |
  'ellipse' |
  'line' |
  'path' |
  'polygon' |
  'polyline' |
  'rect'

export type SVGProps = Record<string, string | number>;
export type IconNodeChild = [elementName: IconNodeElement, attrs: Record<string, string>];
export type IconNode =  IconNodeChild[];
