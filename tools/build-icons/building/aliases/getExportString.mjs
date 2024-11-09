const getExportString = (
  componentName,
  iconName,
  aliasImportFileExtension,
  deprecated,
  deprecationReason = '',
) =>
  deprecated
    ? `export {\n` +
      `  /** @deprecated ${deprecationReason} */\n` +
      `  default as ${componentName}\n` +
      `} from '../icons/${iconName}${aliasImportFileExtension}';\n`
    : `export { default as ${componentName} } from '../icons/${iconName}${aliasImportFileExtension}';\n`;

export default getExportString;
