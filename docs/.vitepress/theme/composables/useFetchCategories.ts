import { useFetch } from '@vueuse/core';
import getBaseUrl from '../utils/getBaseUrl';

const useFetchCategories = () =>
  useFetch<Record<string, string[]>>(`${getBaseUrl()}/api/categories`, {
    immediate:
      typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('search'),
  }).json();

export default useFetchCategories;
