import { createElement, forwardRef } from 'react';
import { mergeClasses } from '@lucide/shared';
import { IconNode, LucideProps } from './types';

// 定义图标组件接收的 Props（继承所有 img 标签属性 + Lucide 标准属性）
export interface LucideIconComponentProps extends LucideProps {
  className?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  fill?: string;
  alt?: string;
}

/**
 * 将图标节点 + 配置 转换为 Img 可用的 Data URL
 */
const LucideIconToString = ({
  color = 'currentColor',
  size = 24,
  strokeWidth = 2,
  fill = 'none',
  iconNode,
}: {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  fill?: string;
  iconNode: IconNode;
}) => {
  const innerSVG = iconNode
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${tag} ${attrStr}/>`;
    })
    .join('');

  // 标准 SVG 结构，支持动态颜色/尺寸/描边
  const svg = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 24 24" 
      fill="${fill}" 
      stroke="${color}" 
      stroke-width="${strokeWidth}" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      ${innerSVG}
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * 改造核心：返回 React 组件，而非直接返回 img 元素
 * 支持 props 传入 + ref 转发 + Tailwind className
 */
const createLucideIcon = (iconName: string, iconNode: IconNode) => {
  // 使用 forwardRef 支持组件 ref 转发（React 最佳实践）
  const LucideIcon = forwardRef<HTMLImageElement, LucideIconComponentProps>((props, ref) => {
    // 解构自定义 props + 剩余原生 img props
    const { color, size, strokeWidth, className, alt = iconName, ...restProps } = props;

    // 动态生成 SVG Data URL（根据传入的 props 变化）
    const src = LucideIconToString({
      color,
      size,
      strokeWidth,
      iconNode,
    });

    // 合并 className（支持 Tailwind CSS）
    const mergedClass = mergeClasses(className);

    // 底层渲染 img 标签！
    return createElement('img', {
      ref,
      src,
      alt,
      className: mergedClass,
      ...restProps,
    });
  });

  // 组件名称（方便 React DevTools 调试）
  LucideIcon.displayName = `${iconName}`;
  return LucideIcon;
};

export default createLucideIcon;
