import { h } from 'vue';
import type { FunctionalComponent } from 'vue';
import { IconNode, LucideProps } from './types';
import Icon from './Icon';

var showDeprecationWarning = true;

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionalComponent} LucideIcon
 */
const createLucideIcon =
  (iconName: string, iconNode: IconNode): FunctionalComponent<LucideProps> =>
  (props, { slots }) => {
  if (showDeprecationWarning) {
      console.warn(
        '[lucide-vue-nuxt]: This package is renamed to `@lucide/vue`. Please update your imports to avoid potential issues in the future.',
      );
      showDeprecationWarning = false;
    }

  return h(
    Icon,
    {
      ...props,
      iconNode,
      name: iconName,
    },
    slots,
  );
}

export default createLucideIcon;
