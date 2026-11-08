import { ref, inject, Ref, watch, onMounted } from 'vue';
import { ExternalLibs, IconEntity } from '../types';

export const EXTERNAL_LIBS_CONTEXT = Symbol('externalLibs');

type ExternalIconNodes = Partial<Record<ExternalLibs, IconEntity[]>>;

interface ExternalLibContext {
  selectedLibs: Ref<ExternalLibs[]>;
  externalIconNodes: Ref<ExternalIconNodes>;
}

export const externalLibContext: ExternalLibContext = {
  selectedLibs: ref([]),
  externalIconNodes: ref({}),
};

const externalLibIconNodesAPI = {
  lab: `${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/lab/icon-details`,
};

// URL query parameter for preselecting external libraries, e.g. /icons/?library=lab
// Repeat it for several libraries: ?library=lab&library=other (a comma list is also accepted).
const URL_PARAM = 'library';

const isExternalLib = (value: string): value is ExternalLibs =>
  Object.keys(externalLibIconNodesAPI).includes(value);

const getLibsFromUrl = (): ExternalLibs[] => {
  const values = new URLSearchParams(window.location.search)
    .getAll(URL_PARAM)
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(isExternalLib);

  return [...new Set(values)];
};

let hasAppliedUrlLibs = false;

// Keep the address bar in sync so the current selection can be copied as a link.
// Registered once at module level (browser only) so it outlives any single component.
if (typeof window !== 'undefined') {
  watch(externalLibContext.selectedLibs, (libs) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(URL_PARAM);

    for (const lib of libs) {
      url.searchParams.append(URL_PARAM, lib);
    }

    if (url.href !== window.location.href) {
      window.history.replaceState(window.history.state, '', url);
    }
  });
}

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

  // Apply ?library= after mount, not during setup: the watchers above are lazy, so the
  // selection has to change after they exist for the icons to be fetched, and
  // changing it after hydration avoids an SSR mismatch on the checkbox.
  onMounted(() => {
    if (hasAppliedUrlLibs) return;
    hasAppliedUrlLibs = true;

    const libsFromUrl = getLibsFromUrl();

    if (libsFromUrl.length) {
      context.selectedLibs.value = libsFromUrl;
    }
  });

  return context;
}
