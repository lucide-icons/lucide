/* eslint-disable import/prefer-default-export */
/**
 * @param {array} array
 * @returns {array}
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
