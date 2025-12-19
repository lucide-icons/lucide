import { InjectionToken, Provider } from '@angular/core';

/**
 * A configuration service for Lucide icon components.
 *
 * You can inject this service, typically in AppComponent, and customize its property values in
 * order to provide default values for all the icons used in the application.
 */
export interface LucideConfig {
  color: string;
  size: number;
  strokeWidth: number;
  absoluteStrokeWidth: boolean;
}

export const lucideDefaultConfig: LucideConfig = {
  color: 'currentColor',
  size: 24,
  strokeWidth: 2,
  absoluteStrokeWidth: false,
};

export const LUCIDE_CONFIG = new InjectionToken<LucideConfig>(
  'Lucide icon config',
  {
    factory: () => lucideDefaultConfig,
  },
);

export function provideLucideConfig(config: Partial<LucideConfig>): Provider {
  return {
    provide: LUCIDE_CONFIG,
    useValue: {
      ...lucideDefaultConfig,
      ...config,
    },
  };
}
