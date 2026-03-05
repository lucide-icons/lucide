import { useFetch } from '@vueuse/core';

const useFetchCategories = () =>
  useFetch<Record<string, string[]>>('/api/categories', {
    immediate:
      typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('search'),
  }).json();

export default useFetchCategories;
