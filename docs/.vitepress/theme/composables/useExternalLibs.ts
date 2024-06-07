import { useRoute } from 'vitepress';
import { ref, inject, Ref, onMounted, watch } from 'vue';
import { IconEntity } from '../types';

export const EXTERNAL_LIBS = Symbol('externalLibs');

interface ExternalLibContext {
  selectedLibs: Ref<Record<string, IconEntity>>
}

export const categoryViewContext = {
  selectedLibs: ref(),
};

export function useExternalLibs(): ExternalLibContext {
  const context = inject<ExternalLibContext>(EXTERNAL_LIBS);

  if (!context) {
    throw new Error('useExternalLibs must be used with externalLibs context');
  }

  return context;
}
