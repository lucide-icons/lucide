export type TemplateFunction = (params: {
    componentName: string;
    iconName: string;
    children: Array<[string, Record<string, any>]>;
    getSvg: () => string;
    deprecated?: boolean;
    deprecationReason?: string;
  }) => Promise<string>;

export type Path = string
