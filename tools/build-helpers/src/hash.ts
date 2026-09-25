/**
 * djb2 hashing function
 *
 * @param {string} string
 * @param {number} seed
 * @returns {string} A hashed string of 6 characters
 */
export const hash = (string: string, seed: number = 5381): string => {
  let i = string.length;

  while (i) {
    seed = (seed * 33) ^ string.charCodeAt(--i);
  }

  return (seed >>> 0).toString(36).substr(0, 6);
};
