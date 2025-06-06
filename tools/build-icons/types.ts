export type TemplateFunction = (params: {
    componentName: string;
    iconName: string;
    children: (string | Record<string, string>)[][];
    getSvg: () => string;
    deprecated?: boolean;
    deprecationReason?: string;
  }) => Promise<string>;

export type Path = string
