import replaceElement from './replaceElement';

/* eslint-disable */
/*
  Main library entry
*/
export default ({ icons = {}, nameAttr = 'data-feather', attrs = {} }) => {
    if (!Object.values(icons).length) {
      throw new Error(
        "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import featherity, { icons } from 'featherity';\nfeather({icons});`",
      );
    }

    if (typeof document === 'undefined') {
      throw new Error('`feather.replace()` only works in a browser environment.');
    }

    const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);

    Array.from(elementsToReplace).forEach(element => replaceElement(element, {nameAttr, icons, attrs}));
  };

/*
 Icons exports.
*/
export * as icons from './icons/index';
export * from './icons/index';
