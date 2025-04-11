import { useFetch } from '@vueuse/core';

const useFetchTags = () =>
  useFetch<Record<string, string>>(
    `${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/release-info`,
    {
      immediate:
        typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('version'),
    },
  ).json();

export default useFetchTags;
