import { cx } from 'hono/css';
import { mergeClasses } from '@lucide/shared';

/**
 * Class names created with `css` from `hono/css` are Promises,
 * they can't be merged as strings without losing their styles.
 */
const isCssClass = (value: unknown): value is Promise<string> => value instanceof Promise;

/**
 * Merges class names, uses `cx` from `hono/css` when any of them is a `hono/css` class name.
 *
 * @param classes Class names to merge.
 * @returns Merged class names.
 */
export const mergeClassNames = (
  ...classes: (string | Promise<string> | undefined)[]
): string | Promise<string> => {
  const classNames = mergeClasses(
    ...classes.filter((className): className is string => typeof className === 'string'),
  );
  const cssClassNames = classes.filter(isCssClass);

  if (!cssClassNames.length) {
    return classNames;
  }

  return classNames ? cx(classNames, ...cssClassNames) : cx(...cssClassNames);
};
