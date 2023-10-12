import { ComponentType, FunctionComponent, h, JSX, RefObject, toChildArray } from 'preact';
import defaultAttributes from './defaultAttributes';
import { toKebabCase} from '../../../scripts/helpers.mjs';

type IconNode = [elementName: keyof JSX.IntrinsicElements, attrs: Record<string, string>][]

interface LucideProps extends Partial<Omit<JSX.SVGAttributes, "ref" | "size">> {
  color?: string
  size?: string | number
  strokeWidth?: string | number
  absoluteStrokeWidth?: boolean
}

const createLucideIcon = (iconName: string, iconNode: IconNode): FunctionComponent<LucideProps> => {
  const Component = (
    { color = 'currentColor', size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }: LucideProps
  ) =>
    h(
      'svg' as unknown as ComponentType<Partial<JSX.SVGAttributes<SVGElement> & { 'stroke-width': number | string }>>,
      {
        ...defaultAttributes,
        width:  String(size),
        height: size,
        stroke: color,
        ['stroke-width' as 'strokeWidth']: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        class: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest,
      },
      [...iconNode.map(([tag, attrs]) => h(tag, attrs)), ...toChildArray(children)],
    );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon
