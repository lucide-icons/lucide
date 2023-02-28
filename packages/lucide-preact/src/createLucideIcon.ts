import { ComponentType, FunctionComponent, h, JSX, RefObject, toChildArray } from 'preact';
import defaultAttributes from './defaultAttributes';

type IconNode = [elementName: keyof JSX.IntrinsicElements, attrs: Record<string, string>][]

interface LucideProps extends Partial<Omit<JSX.SVGAttributes, "ref" | "size">> {
  color?: string
  size?: string | number
  strokeWidth?: string | number
}

/**
 * Converts string to KebabCase
 * Copied from scripts/helper. If anyone knows how to properly import it here
 * then please fix it.
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const createLucideIcon = (iconName: string, iconNode: IconNode): FunctionComponent<LucideProps> => {
  const Component = (
    { color = 'currentColor', size = 24, strokeWidth = 2, children, ...rest }: LucideProps
  ) =>
    h(
      'svg' as unknown as ComponentType<Partial<JSX.SVGAttributes<SVGElement> & { 'stroke-width': number | string }>>,
      {
        ...defaultAttributes,
        width:  String(size),
        height: size,
        stroke: color,
        ['stroke-width' as 'strokeWidth']: strokeWidth,
        class: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest,
      },
      [...iconNode.map(([tag, attrs]) => h(tag, attrs)), ...toChildArray(children)],
    );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon
