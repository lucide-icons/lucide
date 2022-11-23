export type IconNode = readonly [string, Record<string,any>];
export type IconData = readonly [string, Record<string,any>, IconNode[]? ];
export type Icons = { [key: string]: IconData }
