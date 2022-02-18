import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Sync URL query param with local value
 */
export const useSyncQuery = (key: string, value: string, onChange: (value: string) => void) => {
  const router = useRouter();

  const queryValue = router.query[key];
  const currentValue = typeof queryValue === 'string' ? queryValue : undefined;

  useEffect(() => {
    if (value !== currentValue) {
      router.push(
        {
          query: value ? { [key]: value } : undefined,
        },
        undefined,
        { scroll: false }
      );
    }
  }, [value]);

  useEffect(() => {
    if (currentValue !== undefined && value !== currentValue) {
      onChange(currentValue);
    }
  }, [currentValue]);
};
