import { ref, inject, Ref, watch, onMounted } from 'vue';
import { useLocalStorage } from '@vueuse/core';
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
// Repeat it for several libraries: ?library=lab&library=other
const URL_PARAM = 'library';

const storedLibs = useLocalStorage<ExternalLibs[]>('external-libs', [], { initOnMounted: false });

const isExternalLib = (value: string): value is ExternalLibs =>
  Object.keys(externalLibIconNodesAPI).includes(value);

/**
 * Writes the current library selection into `url` as `?library=` params, replacing any
 * existing ones. Use it when building URLs for history.pushState so the param survives.
 */
export const setLibraryParams = (url: URL, libs = externalLibContext.selectedLibs.value) => {
  url.searchParams.delete(URL_PARAM);

  for (const lib of libs) {
    url.searchParams.append(URL_PARAM, lib);
  }

  return url;
};

// Keep the URL shareable and remember the selection for the next visit.
const persistSelection = (libs: ExternalLibs[]) => {
  storedLibs.value = libs;

  const url = setLibraryParams(new URL(window.location.href), libs);
  window.history.replaceState(window.history.state, '', url);
};

// `?library=` wins (shared links, Back/Forward); otherwise use the last selection.
const syncSelection = () => {
  const { selectedLibs } = externalLibContext;
  const libsFromUrl = new URLSearchParams(window.location.search)
    .getAll(URL_PARAM)
    .filter(isExternalLib);
  const libs = libsFromUrl.length
    ? [...new Set(libsFromUrl)]
    : storedLibs.value.filter(isExternalLib);

  if (String(libs) !== String(selectedLibs.value)) {
    selectedLibs.value = libs;
  }

  // Also when nothing changed, to restore the param on URLs that dropped it.
  persistSelection(libs);
};

const fetchExternalIconNodes = async (selectedLibs: ExternalLibs[]) => {
  const { externalIconNodes } = externalLibContext;
  const savedIconNodes = { ...externalIconNodes.value };
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

    externalIconNodes.value = newExternalIconNodes;
  } catch (error) {
    console.error(error);
  }
};

// Registered once at module level so they outlive any single component. The selection only
// changes in the browser, so the watchers never run during SSR.
watch(externalLibContext.selectedLibs, persistSelection);
watch(externalLibContext.selectedLibs, fetchExternalIconNodes);

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', syncSelection);
}

export function useExternalLibs(): ExternalLibContext {
  const context = inject<ExternalLibContext>(EXTERNAL_LIBS_CONTEXT);

  if (!context) {
    throw new Error('useExternalLibs must be used with externalLibs context');
  }

  // Apply the URL/stored selection after hydration to avoid an SSR mismatch on the checkbox.
  // Runs on every mount so client-side navigation to a URL carrying the param reapplies it.
  onMounted(syncSelection);

  return context;
}
