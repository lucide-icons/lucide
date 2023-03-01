import { LucideIconData } from '../icons/types';

/**
 * Creates a new SVGElement from icon node
 *
 * @param tag
 * @param attrs
 * @param children
 * @returns
 */
export const createElement = ([
    tag,
    attrs,
    children = [],
]: LucideIconData): SVGElement => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

    Object.keys(attrs).forEach((name) => {
        const attrValue: string =
            typeof attrs[name] === 'string'
                ? (attrs[name] as string)
                : attrs[name].toString(10);
        element.setAttribute(name, attrValue);
    });

    if (children.length) {
        children.forEach((child: LucideIconData) => {
            const childElement = createElement(child);

            element.appendChild(childElement);
        });
    }

    return element;
};
