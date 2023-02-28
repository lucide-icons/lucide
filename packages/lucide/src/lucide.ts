import replaceElement from './replaceElement';
import * as allIcons from './icons';

/**
 * Replaces all elements with matching nameAttr with the defined icons
 * @param {{ icons?: object, nameAttr?: string, attrs?: object }} options
 */
const createIcons = ({ icons = {}, nameAttr = 'icon-name', attrs = {} } = {}) => {
  if (!Object.values(icons).length) {
    throw new Error(
      "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`",
    );
  }

  if (typeof document === 'undefined') {
    throw new Error('`createIcons()` only works in a browser environment.');
  }

  const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);

  Array.from(elementsToReplace).forEach((element) =>
    replaceElement(element, { nameAttr, icons, attrs }),
  );
};

export { createIcons };

/*
  Create Element function export.
*/
export { default as createElement } from './createElement';

/*
 Icons exports.
*/
export { allIcons as icons };
export * from './icons';
