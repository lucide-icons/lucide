export default ({ componentName, iconName, children }) => `
const ${componentName} = [
  '${iconName}',
  ${JSON.stringify(children)}
];

export default ${componentName};
`;
