import { ref, inject, Ref, watch, onMounted } from 'vue';
import { ExternalLibs, IconEntity } from '../types';

export const EXTERNAL_LIBS_CONTEXT = Symbol('externalLibs');

type ExternalIconNodes = Partial<Record<ExternalLibs, IconEntity[]>>;

interface ExternalLibContext {
  selectedLibs: Ref<ExternalLibs[]>;
  externalIconNodes: Ref<ExternalIconNodes>;
}

export const externalLibContext: ExternalLibContext = {
  selectedLibs: ref<ExternalLibs[]>(['lab']),
  externalIconNodes: ref<ExternalIconNodes>({}),
};

const externalLibIconNodesAPI: Record<ExternalLibs, string> = {
  lab: 'https://lab.lucide.dev/api/icon-details',
};

let isWatchingSelectedLibs = false;

function watchSelectedLibs(context: ExternalLibContext) {
  if (isWatchingSelectedLibs) {
    return;
  }

  isWatchingSelectedLibs = true;

  watch(
    context.selectedLibs,
    async (selectedLibs) => {
      const savedIconNodes = { ...context.externalIconNodes.value };
      const newExternalIconNodes: ExternalIconNodes = {};

      try {
        for (const lib of selectedLibs) {
          if (savedIconNodes[lib]) {
            newExternalIconNodes[lib] = savedIconNodes[lib];
          } else {
            const response = await fetch(externalLibIconNodesAPI[lib]);
            const iconNodes = await response.json();

            if (iconNodes) {
              newExternalIconNodes[lib] = Object.values(iconNodes).map(
                (iconEntity: IconEntity) => ({
                  ...iconEntity,
                  externalLibrary: lib,
                }),
              );
            }
          }
        }

        context.externalIconNodes.value = newExternalIconNodes;
      } catch (error) {
        console.error(error);
      }
    },
    { immediate: true },
  );
}

export function useExternalLibs(): ExternalLibContext {
  const context = inject<ExternalLibContext>(EXTERNAL_LIBS_CONTEXT);

  if (!context) {
    throw new Error('useExternalLibs must be used with externalLibs context');
  }

  onMounted(() => {
    watchSelectedLibs(context);
  });

  return context;
}
