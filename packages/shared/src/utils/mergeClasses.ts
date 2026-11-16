/**
 * Merges classes into a single string
 *
 * @param {array} classes
 * @returns {string} A string of classes
 */
export const mergeClasses = <ClassType = string | undefined | null>(...classes: ClassType[]) => {
  const seen = new Set<string>();
  const out: string[] = [];

  for (const cls of classes) {
    if (!cls || typeof cls !== 'string') continue;
    const tokens = cls.trim().split(/\s+/);
    for (const token of tokens) {
      if (token && !seen.has(token)) {
        seen.add(token);
        out.push(token);
      }
    }
  }

  return out.join(' ');
};
