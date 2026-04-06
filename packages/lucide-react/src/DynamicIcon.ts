'use client';

import { createElement, forwardRef, useEffect, useState } from 'react';
import { LucideIcon, LucideIconData, LucideIconNode, LucideProps } from './types';
import dynamicIconImports from './dynamicIconImports';
import Icon from './Icon';

export type DynamicIconModule = {
  default: LucideIcon;
  __iconNode?: LucideIconNode;
  __iconData?: LucideIconData;
};

export type IconName = keyof typeof dynamicIconImports;

export const iconNames = Object.keys(dynamicIconImports) as Array<IconName>;

interface DynamicIconComponentProps extends LucideProps {
  name: IconName;
  fallback?: () => JSX.Element | null;
}

async function getIconNode(name: IconName) {
  if (!(name in dynamicIconImports)) {
    throw new Error('[lucide-react]: Name in Lucide DynamicIcon not found');
  }

  // TODO: Replace this with a generic iconNode package.
  const icon = (await dynamicIconImports[name]()) as DynamicIconModule;

  if (icon.__iconData != null) {
    return icon.__iconData.node;
  }

  if (icon.__iconNode != null) {
    return icon.__iconNode;
  }

  throw new Error('[lucide-react]: Failed to resolve icon data for DynamicIcon');
}

/**
 * Dynamic Lucide icon component
 *
 * @component Icon
 * @param {object} props
 * @param {string} props.color - The color of the icon
 * @param {number} props.size - The size of the icon
 * @param {number} props.strokeWidth - The stroke width of the icon
 * @param {boolean} props.absoluteStrokeWidth - Whether to use absolute stroke width
 * @param {string} props.className - The class name of the icon
 * @param {LucideIconNode} props.children - The children of the icon
 * @param {LucideIconNode} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const DynamicIcon = forwardRef<SVGSVGElement, DynamicIconComponentProps>(
  ({ name, fallback: Fallback, ...props }, ref) => {
    const [iconNode, setIconNode] = useState<LucideIconNode>();

    useEffect(() => {
      getIconNode(name)
        .then(setIconNode)
        .catch((error) => {
          console.error(error);
        });
    }, [name]);

    if (iconNode == null) {
      if (Fallback == null) {
        return null;
      }

      return createElement(Fallback);
    }

    return createElement(Icon, {
      ref,
      ...props,
      iconNode,
    });
  },
);

export default DynamicIcon;
