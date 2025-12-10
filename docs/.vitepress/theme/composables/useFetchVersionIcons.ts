import { useFetch } from '@vueuse/core';
import { computed, Ref } from 'vue';

const useFetchVersionIcons = (version: Ref<string | undefined>) =>{
  const fetchUrl = computed(() => {
    if(version.value == null ) return ''
    return `https://unpkg.com/lucide-static@${version.value}/icon-nodes.json`
  })
  return useFetch<Record<string, string>>(
    fetchUrl,
    {
      refetch: true
    }
  ).json();
}

export default useFetchVersionIcons;
