export type SVGProps = Record<string, string | number>;
export type IconNode = readonly [tag: string, attrs: SVGProps][];
export type Icons = { [key: string]: IconNode };
