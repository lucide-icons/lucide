/* eslint-disable import/no-extraneous-dependencies */
import { parseDOM } from 'htmlparser2';
import DEFAULT_ATTRS from './default-attrs.json';

export default iconsObject => {
  const iconNodes = {};

  Object.keys(iconsObject).forEach(icon => {
    const svgString = iconsObject[icon];
    const dom = parseDOM(svgString);

    const children = dom.map(element => [
      element.name,
      {
        ...element.attribs,
      },
    ]);

    iconNodes[icon] = [
      'svg',
      {
        ...DEFAULT_ATTRS,
      },
      children,
    ];
  });

  return iconNodes;
};
