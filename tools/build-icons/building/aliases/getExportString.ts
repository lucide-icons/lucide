const getExportString = (
  componentName: string,
  iconName: string,
  aliasImportFileExtension: string,
  deprecated?: boolean,
  deprecationReason = '',
) =>
  deprecated
    ? `export {\n` +
      `  /** @deprecated ${deprecationReason} */\n` +
      `  default as ${componentName}\n` +
      `} from '../icons/${iconName}${aliasImportFileExtension}';\n`
    : `export { default as ${componentName} } from '../icons/${iconName}${aliasImportFileExtension}';\n`;

export default getExportString;
