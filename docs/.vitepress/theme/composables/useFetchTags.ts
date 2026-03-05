import { useFetch } from '@vueuse/core';

const useFetchTags = () =>
  useFetch<Record<string, string[]>>('/api/tags', {
    immediate:
      typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('search'),
  }).json();

export default useFetchTags;
