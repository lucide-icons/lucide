import { useRouter } from 'next/router';

export const useRouterParam = (key: string) => {
  const router = useRouter();

  const queryValue = router.query[key];
  const urlValue = typeof queryValue === 'string' ? queryValue : '';

  const setParam = (value: string) => {
    router.push(
      {
        query: value ? { [key]: value } : undefined,
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
  };

  return [urlValue, setParam] as const;
};
