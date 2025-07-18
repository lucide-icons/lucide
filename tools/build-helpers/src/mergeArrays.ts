/* eslint-disable import/prefer-default-export */
/**
 * Merge two arrays and remove duplicates
 *
 * @param {array} a
 * @param {array} b
 * @returns {array}
 */
export const mergeArrays = <T>(a: T[], b: T[]): T[] => {
  a = a.concat(b);
  a = a.filter((i, p) => a.indexOf(i) === p);
  return a;
};
