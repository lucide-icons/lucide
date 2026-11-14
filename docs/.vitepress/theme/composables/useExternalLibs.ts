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

const isSameSelection = (a: ExternalLibs[], b: ExternalLibs[]) =>
  a.length === b.length && a.every((lib, index) => lib === b[index]);

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

const replaceUrlWithSelection = (libs: ExternalLibs[]) => {
  const url = setLibraryParams(new URL(window.location.href), libs);

  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, '', url);
  }
};

/**
 * Reconciles the selection with the current URL: valid `?library=` params win (so Back/Forward
 * and shared links restore them); without them, the current selection is written back so the
 * address bar stays shareable after navigating to a URL that dropped the param.
 */
const syncSelectionWithUrl = () => {
  const { selectedLibs } = externalLibContext;
  const libsFromUrl = getLibsFromUrl();

  if (libsFromUrl.length) {
    if (!isSameSelection(libsFromUrl, selectedLibs.value)) {
      selectedLibs.value = libsFromUrl;
    }
  } else if (selectedLibs.value.length) {
    replaceUrlWithSelection(selectedLibs.value);
  }
};

// Keep the address bar in sync so the current selection can be copied as a link, and
// reapply ?library= when history navigation restores an entry that has it.
// Registered once at module level (browser only) so it outlives any single component.
if (typeof window !== 'undefined') {
  watch(externalLibContext.selectedLibs, replaceUrlWithSelection);
  window.addEventListener('popstate', syncSelectionWithUrl);
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
  // Runs on every mount (not just the first) so client-side navigation to a URL carrying
  // the param reapplies it; the sync is a no-op when the selection already matches.
  onMounted(syncSelectionWithUrl);

  return context;
}
