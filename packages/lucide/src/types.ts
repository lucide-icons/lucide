// className is not supported in svg elements
export type SVGProps = Record<string, string | number>;

export type IconNode = [tag: string, attrs: SVGProps][];
export type Icons = { [key: string]: IconNode };
