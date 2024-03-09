export function deprecationReasonTemplate(
  deprecationReason,
  { componentName, iconName, toBeRemovedInVersion },
) {
  switch (deprecationReason) {
    case 'alias.typo':
      return `Renamed because of typo, use {@link ${componentName}} instead. This alias will be removed in ${toBeRemovedInVersion}`;
    case 'icon.brand':
      return `Brand icons have been deprecated and are due to be removed, please refer to https://github.com/lucide-icons/lucide/issues/670. We recommend using https://simpleicons.org/?q=${iconName} instead. This icon will be removed in ${toBeRemovedInVersion}`;
  }
}
