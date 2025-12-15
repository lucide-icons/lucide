import { type IconNode } from '../types.ts';

export interface ExportTemplate {
  componentName: string;
  iconName: string;
  children: IconNode;
  getSvg: () => Promise<string>;
  deprecated: boolean;
  deprecationReason: string;
  aliases: Array<string | { name: string }>;
  toPascalCase: (value: string) => string;
}

export type TemplateFunction = (params: ExportTemplate) => Promise<string>;

const defineExportTemplate = (exportFunction: TemplateFunction) => exportFunction;

export default defineExportTemplate;
