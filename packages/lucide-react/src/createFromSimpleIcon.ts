import createLucideIcon from './createLucideIcon';
import type { IconNode } from './types';
import type { SimpleIcon } from 'simple-icons';

const createIconNodeFromSimpleIcon = (simpleIcon: SimpleIcon): IconNode => [
  [
    'path',
    {
      d: simpleIcon.path,
      fill: 'currentColor',
    },
  ],
];

/**
 * Converts a simple-icon into a Lucide icon component
 * @param name The name of the icon (will be used as component name)
 * @param simpleIcon The simple-icon object
 * @returns A Lucide icon component
 */
const createFromSimpleIcon = (name: string, simpleIcon: SimpleIcon) =>
  createLucideIcon(name, createIconNodeFromSimpleIcon(simpleIcon));

export default createFromSimpleIcon;
