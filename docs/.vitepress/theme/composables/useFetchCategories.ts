import { useFetch } from '@vueuse/core';

const useFetchCategories = () =>
  useFetch<Record<string, string[]>>(
    `${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/categories`,
    {
      immediate:
        typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('search'),
    },
  ).json();

export default useFetchCategories;
