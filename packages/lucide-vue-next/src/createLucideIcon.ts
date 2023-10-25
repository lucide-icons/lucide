import { h } from 'vue';
import type { SVGAttributes, FunctionalComponent } from 'vue';
import defaultAttributes from './defaultAttributes';
import { toKebabCase} from '@lucide/utils';

// Create interface extending SVGAttributes
export interface SVGProps extends Partial<SVGAttributes> {
  size?: 24 | number
  strokeWidth?: number | string
  absoluteStrokeWidth?: boolean
}


type IconNode = [elementName: string, attrs: Record<string, string>][]


const createLucideIcon = (iconName: string, iconNode: IconNode): FunctionalComponent<SVGProps> => (
  { size, strokeWidth = 2, absoluteStrokeWidth, color, ...props }, // props
  { attrs, slots } // context
  ) => {
  return h(
    'svg',
    {
      ...defaultAttributes,
      width: size || defaultAttributes.width,
      height: size || defaultAttributes.height,
      stroke: color || defaultAttributes.stroke,
      'stroke-width': absoluteStrokeWidth ?  Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      ...attrs,
      class: ['lucide', `lucide-${toKebabCase(iconName)}`, attrs?.class || ''],
      ...props,
    },
    [
      ...iconNode.map(child => h(...child)),
      ...(slots.default ? [slots.default()] : [])
    ],
  );
};

export default createLucideIcon;
