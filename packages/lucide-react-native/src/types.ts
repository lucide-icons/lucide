import type { ForwardRefExoticComponent } from "react";
import type { SvgProps } from "react-native-svg";

/**
 * Taken from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/776263e47903cf03cf64cfcc692defefcc5513ab/types/react/index.d.ts#L3873
 * This type was added in @types/react 19, and is duplicated here in order to
 * support usage with older versions.
 */
type SVGElementType =
  | "circle"
  | "ellipse"
  | "g"
  | "line"
  | "path"
  | "polygon"
  | "polyline"
  | "rect";

export type IconNode = [elementName: SVGElementType, attrs: Record<string, string>][];

export interface LucideProps extends SvgProps {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  "data-testid"?: string;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
