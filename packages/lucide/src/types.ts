export type SVGProps = Partial<SVGElement>

export type IconNodeChild = readonly [string, object];
export type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]];
export type Icons = { [key: string]: IconNode }
