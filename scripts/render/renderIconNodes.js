import DEFAULT_ATTRS from './default-attrs.json';
import { parseDOM } from 'htmlparser2';

export default (iconsObject) => {
  const iconNodes = {}

  for(const icon in iconsObject) {

    const svgString = iconsObject[icon];
    const dom = parseDOM(svgString);

    const children = [
      ...dom.map(element => ([
        element.name,
        {
          ...element.attribs,
        }
      ])),
    ];

    iconNodes[icon] = [
      'svg',
      {
        ...DEFAULT_ATTRS,
      },
      children
    ]
  }

  return iconNodes;
}

