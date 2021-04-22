export type IconNode = readonly [string, object];
export type IconData = readonly [string, object, IconNode[]? ];
export type Icons = { [key: string]: IconData }
