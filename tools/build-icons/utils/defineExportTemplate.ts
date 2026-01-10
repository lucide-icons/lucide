import { type IconNodeWithChildren } from '../types.ts';

export interface ExportTemplate {
  componentName: string;
  iconName: string;
  children: IconNodeWithChildren[];
  getSvg: () => Promise<string>;
  deprecated: boolean;
  deprecationReason: string;
}

export type TemplateFunction = (params: ExportTemplate) => Promise<string>;

const defineExportTemplate = (exportFunction: TemplateFunction) => exportFunction;

export default defineExportTemplate;
