import { optimize } from 'svgo';

const plugin = {
  languages: [
    {
      name: 'Lucide SVG',
      parsers: ['lucide-svg'],
      extensions: ['.svg'],
      vscodeLanguageIds: ['svg'],
    },
  ],
  parsers: {
    'lucide-svg': {
      astFormat: 'lucide-svg',
      parse: (path) => path,
      locStart: () => 0,
      locEnd: () => 0,
    },
  },
  printers: {
    'lucide-svg': {
      print(path) {
        return optimize(path.node, {
          multipass: true,
          floatPrecision: 3,
          plugins: [
            'removeDoctype',
            'removeComments',
            'collapseGroups',
            'removeEmptyContainers',
            {
              name: 'removeAttrs',
              params: {
                attrs: [
                  'svg:^(?!(xmlns|width|height|fill|stroke|stroke-linecap|stroke-linejoin|stroke-width)$).+',
                  'path:^(?!(d)$).+',
                  'line:^(?!(x1|x2|y1|y2)$).+',
                  'polygon:^(?!points$).+',
                  'polyline:^(?!points$).+',
                  'circle:^(?!(cx|cy|r|fill)$).+',
                  'ellipse:^(?!(cx|cy|rx|ry)$).+',
                  'rect:^(?!(x|y|width|height|rx|ry)$).+',
                ],
              },
            },
          ],
          js2svg: {
            indent: 2,
            pretty: true,
            useShortTags: true,
            finalNewline: true,
          },
        })
          .data.replace(
            /<svg[^>]+>/,
            `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>`,
          )
          .replace(/"\/>/g, `" />`);
      },
    },
  },
};

export default plugin;
