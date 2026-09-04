import type { AliasDeprecationReason, IconDeprecationReason } from '../types.ts';

export default function deprecationReasonTemplate(
  deprecationReason: AliasDeprecationReason | IconDeprecationReason,
  {
    componentName,
  }: {
    componentName: string;
    iconName: string;
  },
) {
  switch (deprecationReason) {
    case 'alias.typo':
      return `Renamed because of typo, use {@link ${componentName}} instead.`;
    case 'alias.duplicate':
      return `The icon was combined with another icon that shares the same use case, use {@link ${componentName}} instead.`;
    case 'alias.name':
      return `The name of this icon was changed because it didn't meet our guidelines anymore, use {@link ${componentName}} instead.`;
    case 'icon.design':
      return `Removed because the design didn't meet our guidelines anymore.`;
    case 'icon.obsolete':
      return `Removed because the depicted concept became obsolete and no longer had relevant use cases.`;
    default:
      throw new Error(`Unknown deprecation reason: ${deprecationReason}`);
  }
}
