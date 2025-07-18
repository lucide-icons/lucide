import { type IconNode } from '../types.ts';

export interface ExportTemplate {
  componentName: string;
  iconName: string;
  children: IconNode;
  getSvg: () => Promise<string>;
  deprecated: boolean;
  deprecationReason: string;
}

export type TemplateFunction = (params: ExportTemplate) => Promise<string>;

const defineExportTemplate = (exportFunction: TemplateFunction) => exportFunction;

export default defineExportTemplate;
