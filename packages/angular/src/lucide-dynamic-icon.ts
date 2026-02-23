import { Component, computed, inject, input } from '@angular/core';
import { isLucideIconComponent, isLucideIconData, LucideIconInput } from './types';
import { LucideIconBase } from './lucide-icon-base';
import { LUCIDE_ICONS } from './lucide-icons';

/**
 * Generic icon component for rendering LucideIconData.
 */
@Component({
  selector: 'svg[lucideIcon]',
  templateUrl: './lucide-icon.html',
  standalone: true,
})
export class LucideDynamicIcon extends LucideIconBase {
  protected readonly icons = inject(LUCIDE_ICONS);
  public readonly lucideIcon = input.required<LucideIconInput | null>();

  protected override readonly icon = computed(() => {
    const icon = this.lucideIcon();
    if (isLucideIconData(icon)) {
      return icon;
    } else if (isLucideIconComponent(icon)) {
      return icon.icon;
    } else if (typeof icon === 'string') {
      if (icon in this.icons) {
        return this.icons[icon];
      } else {
        throw new Error(`Unable to resolve icon '${icon}'`);
      }
    }
    return null;
  });
}
