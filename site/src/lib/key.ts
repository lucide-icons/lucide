import { useEffect } from 'react';

const isCtrl = (e: KeyboardEvent) => e.metaKey || e.ctrlKey;

export const useKeyBindings = (
  keyBindings: Record<
    string,
    {
      fn: (e: KeyboardEvent) => void;
      preventDefault?: boolean;
      ctrl?: boolean;
    }
  > = {},
  eventName = 'keydown'
) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const listener = (event: KeyboardEvent) => {
      const keyBinding = keyBindings[event.key];
      if (keyBinding === undefined) return;
      const condition = keyBinding.ctrl ? isCtrl(event) : true;
      if (!condition) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (event.target.type != 'text' || event.key == 'Escape') {
        event.preventDefault();
        keyBinding.fn(event);
      }
    };
    document.addEventListener(eventName, listener, false);

    return () => document.removeEventListener(eventName, listener);
  }, [keyBindings, eventName]);
};
