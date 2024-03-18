import { type FunctionComponent, h, type JSX } from 'preact';
import { mergeClasses, toKebabCase } from '@lucide/shared';
import Icon from './Icon';

export type IconNode = [elementName: keyof JSX.IntrinsicElements, attrs: Record<string, string>][];

export interface LucideProps extends Partial<Omit<JSX.SVGAttributes, 'ref' | 'size'>> {
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = FunctionComponent<LucideProps>;

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionComponent} LucideIcon
 */
const createLucideIcon = (iconName: string, iconNode: IconNode): LucideIcon => {
  const Component = ({
    class: classes = '',
    children,
    ...props
  }: LucideProps) =>
    h(
      Icon,
      {
        ...props,
        iconNode,
        class: mergeClasses<string | JSX.SignalLike<string | undefined>>(
          `lucide-${toKebabCase(iconName)}`,
          classes
        ),
      },
      children,
    );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
