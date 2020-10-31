/* eslint-disable import/no-extraneous-dependencies */
import { parseDOM } from 'htmlparser2';
import DEFAULT_ATTRS from './default-attrs.json';
import { toCamelCase } from '../helpers';

const normalizeAttrs = attrs =>
  Object.keys(attrs).reduce((newAttrs, attr) => {
    const attrKey = toCamelCase(attr);

    newAttrs[attrKey] = attrs[attr];
    return newAttrs;
  }, {});

export default (iconsObject, camelizeAttrs = false) => {
  const iconNodes = {};

  Object.keys(iconsObject).forEach(icon => {
    const svgString = iconsObject[icon];
    const dom = parseDOM(svgString);

    const children = dom.map(element => [
      element.name,
      {
        ...(camelizeAttrs ? normalizeAttrs(element.attribs) : element.attribs),
      },
    ]);

    iconNodes[icon] = [
      'svg',
      {
        ...(camelizeAttrs ? normalizeAttrs(DEFAULT_ATTRS) : DEFAULT_ATTRS),
      },
      children,
    ];
  });

  return iconNodes;
};
