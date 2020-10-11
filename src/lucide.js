import replaceElement from './replaceElement';
import * as allIcons from './icons/index';

/*
  Create icons
*/
export const createIcons = ({ icons = {}, nameAttr = 'icon-name', attrs = {} } = {}) => {
  if (!Object.values(icons).length) {
    throw new Error(
      "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`",
    );
  }

  if (typeof document === 'undefined') {
    throw new Error('`createIcons()` only works in a browser environment.');
  }

  const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);

  Array.from(elementsToReplace).forEach(element =>
    replaceElement(element, { nameAttr, icons, attrs }),
  );
};

/*
  Create Element function export.
*/
export { default as createElement } from './createElement';

/*
 Icons exports.
*/
export { allIcons as icons };
export * from './icons/index';
