import { createContext, type Element } from 'solid-js';

export const LucideContext = createContext<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
  class?: string;
}>({
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  nonScalingStroke: false,
  class: '',
});

interface LucideProviderProps {
  children: Element;
  size?: number;
  color?: string;
  strokeWidth?: number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
  class?: string;
}

export function LucideProvider(props: LucideProviderProps) {
  const value = {
    get size() {
      return props.size;
    },
    get color() {
      return props.color;
    },
    get strokeWidth() {
      return props.strokeWidth;
    },
    get absoluteStrokeWidth() {
      return props.absoluteStrokeWidth;
    },
    get nonScalingStroke() {
      return props.nonScalingStroke;
    },
    get class() {
      return props.class;
    },
  };

  return <LucideContext value={value}>{props.children}</LucideContext>;
}
