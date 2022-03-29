import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const isFirstRef = useRef(true);

  if (isFirstRef.current) {
    isFirstRef.current = false;
  }

  useEffect(() => {
    if (!isFirstRef.current) {
      return effect();
    }
  }, deps);
};
