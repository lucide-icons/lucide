/**
 * Merges classes into a single string
 *
 * @param {array} classes
 * @returns {string} A string of classes
 */
export const mergeClasses = (...classes: (string | undefined | null)[]) => {
  const tokens = new Set<string>();

  for (const cls of classes) {
    if (typeof cls !== 'string') continue;
    for (const token of cls.split(/\s+/)) {
      if (token) tokens.add(token);
    }
  }

  return [...tokens].join(' ');
};
