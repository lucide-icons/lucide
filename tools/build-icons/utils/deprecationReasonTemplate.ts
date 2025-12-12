import type { AliasDeprecationReason, IconDeprecationReason } from '../types.ts';

export default function deprecationReasonTemplate(
  deprecationReason: AliasDeprecationReason | IconDeprecationReason,
  {
    componentName,
    toBeRemovedInVersion,
  }: {
    componentName: string;
    iconName: string;
    toBeRemovedInVersion?: string;
  },
) {
  const removalNotice = toBeRemovedInVersion
    ? ` This ${
        deprecationReason.startsWith('icon') ? 'icon' : 'alias'
      } will be removed in ${toBeRemovedInVersion}`
    : '';

  switch (deprecationReason) {
    case 'alias.typo':
      return `Renamed because of typo, use {@link ${componentName}} instead.${removalNotice}`;
    case 'alias.duplicate':
      return `The icon was combined with another icon that shares the same use case, use {@link ${componentName}} instead.${removalNotice}`;
    case 'alias.name':
      return `The name of this icon was changed because it didn't meet our guidelines anymore, use {@link ${componentName}} instead.${removalNotice}`;
      throw new Error(`Unknown deprecation reason: ${deprecationReason}`);
  }
}
