import { type IconAliases } from '@lucide/helpers';
import { type CodePoints } from './allocateCodepoints.ts';

export function hasMissingCodePoints(
  iconsWithAliases: IconAliases,
  codePoints: CodePoints,
): boolean {
  return iconsWithAliases
    .map(([iconName, aliases]) => [iconName, ...aliases])
    .flat()
    .some((name) => {
      if (!codePoints?.[name]) {
        console.log(`Missing code point for icon/alias: ${name}`);
        return true;
      }

      return false;
    });
}
