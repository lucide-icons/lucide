import replaceElement from './replaceElement';
import * as iconAndAliases from './iconsAndAliases';
import { Icons, SVGProps } from './types';

export interface CreateIconsOptions {
  icons?: Icons;
  nameAttr?: string;
  attrs?: SVGProps;
  root?: Element | Document | DocumentFragment;
  inTemplates?: boolean;
}

/**
 * Replaces all elements with matching nameAttr with the defined icons
 * @param {CreateIconsOptions} options
 */
const createIcons = ({
  icons = {},
  nameAttr = 'data-lucide',
  attrs = {},
  root = document,
  inTemplates,
}: CreateIconsOptions) => {
  if (!Object.values(icons).length) {
    throw new Error(
      "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`",
    );
  }

  if (typeof root === 'undefined') {
    throw new Error('`createIcons()` only works in a browser environment.');
  }

  const elementsToReplace = Array.from(root.querySelectorAll(`[${nameAttr}]`));

  elementsToReplace.forEach((element) => replaceElement(element, { nameAttr, icons, attrs }));

  if (inTemplates) {
    const templates = Array.from(root.querySelectorAll('template'));

    templates.forEach((template) =>
      createIcons({
        icons,
        nameAttr,
        attrs,
        root: template.content,
        inTemplates,
      }),
    );
  }

  /** @todo: remove this block in v1.0 */
  if (nameAttr === 'data-lucide') {
    const deprecatedElements = root.querySelectorAll('[icon-name]');
    if (deprecatedElements.length > 0) {
      console.warn(
        '[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide',
      );
      Array.from(deprecatedElements).forEach((element) =>
        replaceElement(element, { nameAttr: 'icon-name', icons, attrs }),
      );
    }
  }
};

export { createIcons };

/*
  Create Element function export.
*/
export { default as createElement } from './createElement';

/*
 Icons exports.
*/
export { iconAndAliases as icons };
export * from './icons';
export * from './aliases';

/*
 Types exports.
*/
export * from './types';
