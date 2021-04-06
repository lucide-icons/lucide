export type IconNode = readonly [string, object];
export type IconData = readonly [string, object, IconNode[] ];

export declare const icons: { [key: string]: IconData };

import { default as createElementTmp } from './build/createElement';

export function createElement(ico: IconData): HTMLElement {
    return createElementTmp(ico as any);
}
