'use client';

import { createElement, forwardRef, type ReactElement } from 'react';
import { defaultReactAttributes, hasA11yProp, mergeClasses } from '@lucide/shared';
import { LucideIconData, LucideIconNode, LucideProps } from './types';
import { useLucideContext } from './context';

type IconComponentProps = LucideProps &
  (
    | {
        iconNode: LucideIconNode[];
        icon?: never;
      }
    | {
        icon: LucideIconData;
        iconNode?: never;
      }
  );

/**
 * Everything about an icon that doesn't depend on the props it is rendered with.
 */
type StaticIcon = {
  viewBox: string;
  classNames: string[];
  className: string;
  children: ReactElement[];
  nonScalingChildren?: ReactElement[];
};

const DEFAULT_SIZE = defaultReactAttributes.width;
const EMPTY_ICON_NODE: LucideIconNode[] = [];
const NON_SCALING_STROKE = { vectorEffect: 'non-scaling-stroke' } as const;

const staticIcons = new WeakMap<LucideIconData, StaticIcon>();
const legacyIcons = new WeakMap<LucideIconNode[], LucideIconData>();

const createNodeElement = (
  [tag, attrs, children]: LucideIconNode,
  index: number,
  extraAttrs?: object,
): ReactElement =>
  createElement(
    tag,
    // The generated icons carry a key per node, custom icon nodes may not.
    { key: index, ...extraAttrs, ...attrs },
    children?.map((child, childIndex) => createNodeElement(child, childIndex)),
  );

/**
 * Icon data is static, so the class names, the view box and the child elements are created once
 * per icon instead of on every render. Handing React the very same child elements again also lets
 * it skip them when an icon re-renders.
 */
const getStaticIcon = (icon: LucideIconData): StaticIcon => {
  let staticIcon = staticIcons.get(icon);

  if (staticIcon == null) {
    const classNames = ['lucide'];

    if (icon.name) {
      classNames.push(`lucide-${icon.name}`);
    }

    for (const alias of icon.aliases ?? []) {
      if (typeof alias === 'string' && alias.trim() !== '') {
        classNames.push(`lucide-${alias}`);
      }
    }

    staticIcon = {
      viewBox: `0 0 ${icon.size ?? icon.width ?? DEFAULT_SIZE} ${icon.size ?? icon.height ?? DEFAULT_SIZE}`,
      classNames,
      className: mergeClasses(...classNames),
      children: icon.node.map((node, index) => createNodeElement(node, index)),
    };
    staticIcons.set(icon, staticIcon);
  }

  return staticIcon;
};

const getLegacyIcon = (iconNode: LucideIconNode[]): LucideIconData => {
  let icon = legacyIcons.get(iconNode);

  if (icon == null) {
    icon = { node: iconNode, size: DEFAULT_SIZE };
    legacyIcons.set(iconNode, icon);
  }

  return icon;
};

/**
 * Lucide icon component
 *
 * @component Icon
 * @param {object} props
 * @param {string} props.color - The color of the icon
 * @param {number} props.size - The size of the icon
 * @param {number} props.strokeWidth - The stroke width of the icon
 * @param {boolean} props.absoluteStrokeWidth - Whether to use absolute stroke width
 * @param {boolean} props.nonScalingStroke - Whether to use non scaling strokes
 * @param {string} props.className - The class name of the icon
 * @param {LucideIconNode[]} props.children - The children of the icon
 * @param {LucideIconNode[]} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color,
      size,
      width,
      height,
      strokeWidth,
      absoluteStrokeWidth,
      nonScalingStroke,
      className,
      children,
      iconNode = EMPTY_ICON_NODE,
      icon = getLegacyIcon(iconNode),
      ...rest
    },
    ref,
  ) => {
    const context = useLucideContext();
    const staticIcon = getStaticIcon(icon);

    const resolvedWidth = width ?? size ?? context.size ?? DEFAULT_SIZE;
    const resolvedStrokeWidth =
      strokeWidth ?? context.strokeWidth ?? defaultReactAttributes.strokeWidth;
    const contextClassName = context.className;

    let iconChildren = staticIcon.children;

    if (nonScalingStroke ?? context.nonScalingStroke) {
      iconChildren = staticIcon.nonScalingChildren ??= icon.node.map((node, index) =>
        createNodeElement(node, index, NON_SCALING_STROKE),
      );
    }

    return createElement(
      'svg',
      {
        ref,
        ...defaultReactAttributes,
        width: resolvedWidth,
        height: height ?? size ?? context.size ?? DEFAULT_SIZE,
        viewBox: staticIcon.viewBox,
        stroke: (color ?? context.color) || defaultReactAttributes.stroke,
        strokeWidth:
          (absoluteStrokeWidth ?? context.absoluteStrokeWidth)
            ? (Number(resolvedStrokeWidth) * Number(icon.size ?? icon.width ?? DEFAULT_SIZE)) /
              Number(resolvedWidth)
            : resolvedStrokeWidth,
        className:
          className || contextClassName
            ? mergeClasses(
                ...staticIcon.classNames,
                ...`${contextClassName ?? ''} ${className ?? ''}`.split(' '),
              )
            : staticIcon.className,
        ...(!children && !hasA11yProp(rest) && { 'aria-hidden': 'true' }),
        ...rest,
      },
      iconChildren,
      children,
    );
  },
);

export default Icon;
