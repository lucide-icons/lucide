import type { FunctionalComponent, SVGAttributes } from 'vue';

export interface LucideProps extends Partial<SVGAttributes> {
  size?: 24 | number;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  'absolute-stroke-width'?: boolean;
}

export type IconNode = [elementName: string, attrs: Record<string, string | number>][];
export type LucideIcon = FunctionalComponent<LucideProps>;
