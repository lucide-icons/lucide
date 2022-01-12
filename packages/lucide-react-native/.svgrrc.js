module.exports = {
  ext: 'tsx',
  prettierConfig: {
    parser: 'typescript',
  },
  jsx: {
    babelConfig: {
      plugins: [
        // xmlns is not typed correctly
        [
          '@svgr/babel-plugin-remove-jsx-attribute',
          {
            elements: ['Svg'],
            attributes: ['xmlns', 'className'],
          },
        ],
        // default is 1em - replace it to 24
        [
          "@svgr/babel-plugin-replace-jsx-attribute-value",
          {
            "values": [
              { "value": "1em", "newValue": 24 },
            ]
          }
        ]
      ],
    },
  },
}
