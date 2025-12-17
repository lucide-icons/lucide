import { Component, computed, inject, input } from '@angular/core';
import { isLucideIconComponent, isLucideIconData, LucideIconInput } from './types';
import { LucideIconBase } from './lucide-icon-base';
import { LUCIDE_ICONS } from './lucide-icons';
import { LucideIconData } from './types';
import { toKebabCase } from './utils/to-kebab-case';

interface LucideResolvedIcon {
  name?: string | null;
  data: LucideIconData;
}

@Component({
  selector: 'svg[lucideIcon]',
  templateUrl: './lucide-icon.html',
  standalone: true,
})
export class LucideIcon extends LucideIconBase {
  protected readonly icons = inject(LUCIDE_ICONS);
  readonly nameInput = input<string | null>(null, { alias: 'name' });
  readonly iconInput = input.required<LucideIconInput | null>({
    alias: 'lucideIcon',
  });
  readonly resolvedIcon = computed<LucideResolvedIcon | null>(() => {
    return this.resolveIcon(this.nameInput(), this.iconInput());
  });
  override readonly name = computed<string | null>(() => {
    return this.resolvedIcon()?.name ?? null;
  });
  override readonly icon = computed<LucideIconData | null>(() => {
    return this.resolvedIcon()?.data ?? null;
  });

  protected resolveIcon(
    name: string | null | undefined,
    icon: LucideIconInput | null | undefined,
  ): LucideResolvedIcon | null {
    if (isLucideIconData(icon)) {
      return {
        name,
        data: icon,
      };
    } else if (isLucideIconComponent(icon)) {
      return {
        name: name ?? icon.iconName,
        data: icon.iconData,
      };
    } else if (typeof icon === 'string') {
      const name = toKebabCase(icon);
      if (name in this.icons) {
        return {
          name,
          data: this.icons[name],
        };
      } else {
        throw new Error(`Unable to resolve icon '${icon}'`);
      }
    }

    return null;
  }
}
