import upperCamelCase from 'upperCamelCase';

/**
 * Generates a componentName of a String.
 *
 * @param {string} iconName
 */
export const generateComponentName = (iconName) => iconName === "github" ? "GitHub" : upperCamelCase(iconName);
