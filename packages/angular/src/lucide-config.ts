import { InjectionToken, Provider } from '@angular/core';

/**
 * Lucide icon configuration options.
 */
export interface LucideConfig {
  /**
   * Stroke color.
   * @default currentColor
   */
  color: string;
  /**
   * Width and height.
   * @default 24
   */
  size: number;
  /**
   * Stroke width
   * @default 2
   */
  strokeWidth: number;
  /**
   * Whether stroke width should be scaled to appear uniform regardless of icon size.
   * @default false
   *
   * @remarks
   * Use CSS to set on SVG paths instead:
   * ```css
   * .lucide * {
   *   vector-effect: non-scaling-stroke;
   * }
   * ```
   */
  absoluteStrokeWidth: boolean;
}

/**
 * Default icon configuration options.
 */
export const lucideDefaultConfig: LucideConfig = {
  color: 'currentColor',
  size: 24,
  strokeWidth: 2,
  absoluteStrokeWidth: false,
};

/**
 * Injection token for providing default configuration options.
 *
 * @internal Use {@link provideLucideConfig}
 */
export const LUCIDE_CONFIG = new InjectionToken<LucideConfig>('Lucide icon config', {
  factory: () => lucideDefaultConfig,
});

/**
 * Provider for default icon configuration options.
 */
export function provideLucideConfig(config: Partial<LucideConfig>): Provider {
  return {
    provide: LUCIDE_CONFIG,
    useValue: {
      ...lucideDefaultConfig,
      ...config,
    },
  };
}
