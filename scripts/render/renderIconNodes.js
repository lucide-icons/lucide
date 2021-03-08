/* eslint-disable import/no-extraneous-dependencies */
import { parseDOM } from 'htmlparser2';
import { hash } from '../helpers';

export default (iconsObject, options) => {
  const iconNodes = {};

  Object.keys(iconsObject).forEach(icon => {
    const svgString = iconsObject[icon];
    const dom = parseDOM(svgString);

    const children = dom.map(element => {
      const child = [element.name, { ...element.attribs }];

      if (options.renderUniqueKey) {
        child[1].key = hash(JSON.stringify(child));
      }

      return child;
    });

    iconNodes[icon] = children;
  });

  return iconNodes;
};
