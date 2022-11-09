// className is not supported in svg elements
type SVGProps = Record<string, string | number>

type IconNodeChild = readonly [tag: string, attrs: SVGProps];
type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]];
type Icons = { [key: string]: IconNode }
