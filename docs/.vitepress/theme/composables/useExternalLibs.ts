import { ref, inject, Ref, watch, onMounted } from 'vue';
import { ExternalLibs, IconEntity } from '../types';

export const EXTERNAL_LIBS_CONTEXT = Symbol('externalLibs');

type ExternalIconNodes = Partial<Record<ExternalLibs, IconEntity[]>>;

interface ExternalLibContext {
  includeLab: Ref<boolean>;
  externalIconNodes: Ref<ExternalIconNodes>;
}

export const externalLibContext: ExternalLibContext = {
  includeLab: ref(true),
  externalIconNodes: ref<ExternalIconNodes>({}),
};

const labIconNodesAPI = 'https://lab.lucide.dev/api/icon-details';

let isWatchingLab = false;
let labIcons: IconEntity[] | undefined;

function watchLab(context: ExternalLibContext) {
  if (isWatchingLab) {
    return;
  }

  isWatchingLab = true;

  watch(
    context.includeLab,
    async (includeLab) => {
      try {
        if (!includeLab) {
          context.externalIconNodes.value = {};
          return;
        }

        if (labIcons) {
          context.externalIconNodes.value = { lab: labIcons };
          return;
        }

        const response = await fetch(labIconNodesAPI);
        const iconNodes = await response.json();
        labIcons = Object.values(iconNodes).map((iconEntity: IconEntity) => ({
          ...iconEntity,
          externalLibrary: 'lab',
        }));

        context.externalIconNodes.value = {
          lab: labIcons,
        };
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
    watchLab(context);
  });

  return context;
}
