import { ref, inject, Ref, watch } from 'vue';
import { ExternalLibs, IconEntity } from '../types';

export const EXTERNAL_LIBS_CONTEXT = Symbol('externalLibs');

type ExternalIconNodes = Partial<Record<ExternalLibs, IconEntity[]>>;

interface ExternalLibContext {
  selectedLibs: Ref<[ExternalLibs]>;
  externalIconNodes: Ref<ExternalIconNodes>;
}

export const externalLibContext = {
  selectedLibs: ref([]),
  externalIconNodes: ref({}),
};

const externalLibIconNodesAPI = {
  lab: 'https://lab.lucide.dev/api/icon-details',
};

export function useExternalLibs(): ExternalLibContext {
  const context = inject<ExternalLibContext>(EXTERNAL_LIBS_CONTEXT);

  watch(context?.selectedLibs, async (selectedLibs) => {
    const savedIconNodes = { ...context?.externalIconNodes.value };
    const newExternalIconNodes: ExternalIconNodes = {};

    try {
      for (const lib of selectedLibs) {
        if (savedIconNodes[lib]) {
          newExternalIconNodes[lib] = savedIconNodes[lib];
        } else {
          const response = await fetch(externalLibIconNodesAPI[lib]);
          const iconNodes = await response.json();

          if (iconNodes) {
            newExternalIconNodes[lib] = Object.values(iconNodes).map((iconEntity: IconEntity) => ({
              ...iconEntity,
              externalLibrary: lib,
            }));
          }
        }
      }

      context.externalIconNodes.value = newExternalIconNodes;
    } catch (error) {
      console.error(error);
    }
  });

  if (!context) {
    throw new Error('useExternalLibs must be used with externalLibs context');
  }

  return context;
}
