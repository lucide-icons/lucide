import { computed } from 'vue';
import { useExternalLibs } from '~/.vitepress/theme/composables/useExternalLibs';
import { IconEntity } from '../types';

const useIconsWithExternalLibs = (initialIcons?: IconEntity[]) => {
  const { externalIconNodes } = useExternalLibs();

  return computed(() => {
    let icons = [];

    if (initialIcons) {
      icons = icons.concat(initialIcons);
    }

    const externalIconNodesArray = Object.values(externalIconNodes.value);

    if (externalIconNodesArray?.length) {
      externalIconNodesArray.forEach((iconNodes) => {
        if (iconNodes?.length) {
          icons = icons.concat(iconNodes);
        }
      });
    }

    return icons;
  });
};

export default useIconsWithExternalLibs;
