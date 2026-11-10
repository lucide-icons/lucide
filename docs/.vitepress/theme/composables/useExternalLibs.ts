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
  lab: `${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/lab/icon-details`,
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
          const iconDetails = await response.json();

          if (iconDetails) {
            newExternalIconNodes[lib] = Object.values(iconDetails).map((iconEntity: IconEntity) => {
              return {
                ...iconEntity,
                externalLibrary: lib,
              };
            });
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
