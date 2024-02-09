import { type FunctionComponent, h, type JSX, toChildArray } from 'preact';
import defaultAttributes from './defaultAttributes';
import { toKebabCase} from '@lucide/utils';

export type IconNode = [elementName: keyof JSX.IntrinsicElements, attrs: Record<string, string>][];

export interface LucideProps extends Partial<Omit<JSX.SVGAttributes, 'ref' | 'size'>> {
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = FunctionComponent<LucideProps>;

const createLucideIcon = (iconName: string, iconNode: IconNode): LucideIcon => {
  const Component = ({
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    children,
    class: classes = '',
    ...rest
  }: LucideProps) =>
    h(
      'svg',
      {
        ...defaultAttributes,
        width: String(size),
        height: size,
        stroke: color,
        ['stroke-width' as 'strokeWidth']: absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth,
        class: ['lucide', `lucide-${toKebabCase(iconName)}`, classes].join(' '),
        ...rest,
      },
      [...iconNode.map(([tag, attrs]) => h(tag, attrs)), ...toChildArray(children)],
    );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
