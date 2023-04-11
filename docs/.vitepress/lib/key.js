import { useEffect, useState } from "react";

const isCtrl = (e) => e.metaKey || e.ctrlKey;

// https://keycode.info
export const useKeyBindings = (
  initialKeyBindings = {},
  eventListener = "keydown"
) => {
  const [keyBindings] = useState(initialKeyBindings);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    document.addEventListener(
      eventListener,
      (event) => {
        const { code } = event;
        const keyBinding = keyBindings[code];
        if (keyBinding === undefined) return;
        const condition = keyBinding.ctrl ? isCtrl(event) : true;
        if (!condition) return;
        if (event.target.type != "text" || code == "Escape") {
          event.preventDefault();
          keyBinding.fn(event);
        }
      },
      false
    );

    return () =>
      Object.keys(keyBindings).forEach((keyBinding) =>
        // eslint-disable-next-line no-undef
        document.removeEventListener(eventListener, keyBindings[keyBinding])
      );
  }, []);
};
