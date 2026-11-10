/**
 * Merges classes into a single string
 *
 * @param {array} classes
 * @returns {string} A string of classes
 */
export const mergeClasses = <ClassType = string | undefined | null>(...classes: ClassType[]) => {
  const uniqueClasses: ClassType[] = [];

  for (const className of classes) {
    if (
      Boolean(className) &&
      (className as string).trim() !== '' &&
      !uniqueClasses.includes(className)
    ) {
      uniqueClasses.push(className);
    }
  }

  return uniqueClasses.join(' ').trim();
};
