import DEFAULT_ATTRS from './default-attrs.json';
import { parseDOM } from 'htmlparser2';

export default (iconsObject) => {
  const iconVnodes = {}

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

    iconVnodes[icon] = [
      'svg',
      {
        ...DEFAULT_ATTRS,
      },
      children
    ]
  }

  return iconVnodes;
}

