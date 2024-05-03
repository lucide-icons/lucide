/* eslint-disable import/prefer-default-export */
import { generateHashedKey } from './generateHashedKey.mjs';

/**
 * Checks if array of items contains duplicated items
 *
 * @param {array} children an array of items
 * @returns {Boolean} if items contains duplicated items.
 */
export const hasDuplicatedChildren = (children) => {
  const hashedKeys = children.map(generateHashedKey);

  return !hashedKeys.every(
    (key, index) => index === hashedKeys.findIndex((childKey) => childKey === key),
  );
};
