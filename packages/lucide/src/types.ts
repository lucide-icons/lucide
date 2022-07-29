
// className is not supported in svg elements
export type SVGProps = Record<string, string | number>

export type IconNodeChild = readonly [tag: string, attrs: SVGProps];
export type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]];
export type Icons = { [key: string]: IconNode }
