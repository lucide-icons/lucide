import { LucideIconData, LucideIcons } from '../icons/types';
import { InjectionToken } from '@angular/core';

export interface LucideIconProviderInterface {
  hasIcon(name: string): boolean;

  getIcon(name: string): LucideIconData | null;
}

export const LUCIDE_ICONS = new InjectionToken<LucideIconProviderInterface>('LucideIcons', {
  factory: () => new LucideIconProvider({}),
});

export class LucideIconProvider implements LucideIconProviderInterface {
  constructor(private icons: LucideIcons) {}

  getIcon(name: string): LucideIconData | null {
    return this.hasIcon(name) ? this.icons[name] : null;
  }

  hasIcon(name: string): boolean {
    return typeof this.icons === 'object' && name in this.icons;
  }
}
