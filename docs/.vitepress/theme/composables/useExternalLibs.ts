import { ref, inject, Ref, watch, onMounted, nextTick } from 'vue';
import { useLocalStorage, useUrlSearchParams } from '@vueuse/core';
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
const STORAGE_KEY = 'external-libs';

const isExternalLib = (value: string): value is ExternalLibs =>
  Object.keys(externalLibIconNodesAPI).includes(value);

const parseLibs = (values: unknown): ExternalLibs[] => {
  const list = Array.isArray(values) ? values : values == null ? [] : [values];
  const libs = list
    .flatMap((value) => String(value).split(','))
    .map((value) => value.trim())
    .filter(isExternalLib);

  return [...new Set(libs)];
};

const getLibsFromLocation = () =>
  parseLibs(new URLSearchParams(window.location.search).getAll(URL_PARAM));

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

// useUrlSearchParams only re-reads the URL on popstate, but other code changes it with
// pushState/replaceState (e.g. ?search=). So when writing, start from the live URL and only
// swap in the library values; otherwise its out-of-date copy would overwrite other params.
const params = useUrlSearchParams<{ [URL_PARAM]?: string | string[] }>('history', {
  stringify: (state) => {
    const live = new URLSearchParams(window.location.search);
    live.delete(URL_PARAM);
    state.getAll(URL_PARAM).forEach((lib) => live.append(URL_PARAM, lib));

    return live.toString();
  },
});

const storedLibs = useLocalStorage<ExternalLibs[]>(STORAGE_KEY, [], { initOnMounted: false });

const writeLibsToUrl = (libs: ExternalLibs[]) => {
  params[URL_PARAM] = [...libs];
};

// Persist every selection change to the URL (shareable link) and localStorage (next visit).
watch(externalLibContext.selectedLibs, (libs) => {
  storedLibs.value = libs;
  writeLibsToUrl(libs);
});

/**
 * Reconciles the selection with the URL: valid `?library=` params win (so shared links and
 * Back/Forward restore them); without them, the current selection is written back so the
 * address bar stays shareable, and with no selection yet the stored one is used.
 */
const syncSelection = (libsFromUrl: ExternalLibs[]) => {
  const { selectedLibs } = externalLibContext;

  if (libsFromUrl.length) {
    if (!isSameSelection(libsFromUrl, selectedLibs.value)) {
      selectedLibs.value = libsFromUrl;
    }
  } else if (selectedLibs.value.length) {
    writeLibsToUrl(selectedLibs.value);
  } else {
    const libsFromStorage = parseLibs(storedLibs.value);

    if (libsFromStorage.length) {
      selectedLibs.value = libsFromStorage;
    }
  }
};

// useUrlSearchParams updates `params` on popstate (Back/Forward). It ignores its own writes
// until the next tick, so defer the reconcile in case it has to write the param back.
watch(
  () => parseLibs(params[URL_PARAM]),
  (libs) => nextTick(() => syncSelection(libs)),
);

export function useExternalLibs(): ExternalLibContext {
  const context = inject<ExternalLibContext>(EXTERNAL_LIBS_CONTEXT);

  if (!context) {
    throw new Error('useExternalLibs must be used with externalLibs context');
  }

  watch(context.selectedLibs, async (selectedLibs) => {
    const savedIconNodes = { ...context.externalIconNodes.value };
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

  // Apply the URL/stored selection after mount, not during setup: the watcher above is lazy,
  // so the selection has to change after it exists for the icons to be fetched, and changing
  // it after hydration avoids an SSR mismatch on the checkbox.
  // Runs on every mount so client-side navigation (pushState, which `params` doesn't see) to a
  // URL carrying the param reapplies it; it reads the live URL for that reason.
  onMounted(() => syncSelection(getLibsFromLocation()));

  return context;
}
