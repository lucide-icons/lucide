/* eslint-disable import/prefer-default-export */
import { generateHashedKey } from './generateHashedKey.ts';

/**
 * Checks if array of items contains duplicated items
 *
 * @param {array} children an array of items
 * @returns {Boolean} if items contains duplicated items.
 */
export const hasDuplicatedChildren = (
  children: Array<{ name: string; attributes: Record<string, unknown> }>,
): boolean => {
  const hashedKeys = children.map(generateHashedKey);

  return !hashedKeys.every(
    (key, index) => index === hashedKeys.findIndex((childKey) => childKey === key),
  );
};
