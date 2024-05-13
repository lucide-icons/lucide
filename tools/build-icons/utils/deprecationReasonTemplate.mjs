export function deprecationReasonTemplate(
  deprecationReason,
  { componentName, iconName, toBeRemovedInVersion },
) {
  const removalNotice = toBeRemovedInVersion ? ` This ${deprecationReason.startsWith('icon') ? 'icon' : 'alias'} will be removed in ${toBeRemovedInVersion}` : undefined

  switch (deprecationReason) {
    case 'alias.typo':
      return `Renamed because of typo, use {@link ${componentName}} instead.${removalNotice}`;
    case 'alias.naming':
      return `This name is no longer compliant with our guidelines, use {@link ${componentName}} instead.${removalNotice}`;
    case 'icon.brand':
      return `Brand icons have been deprecated and are due to be removed, please refer to https://github.com/lucide-icons/lucide/issues/670. We recommend using https://simpleicons.org/?q=${iconName} instead.${removalNotice}`;
  }
}
