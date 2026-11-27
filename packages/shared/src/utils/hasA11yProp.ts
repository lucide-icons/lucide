/**
 * Check if a component has an accessibility prop
 *
 * @param {object} [props]
 * @returns {boolean} Whether the component has an accessibility prop
 */
export const hasA11yProp = (props?: Record<string, unknown> | null): boolean => {
  if (props == null || typeof props !== 'object') {
    return false;
  }

  for (const prop in props) {
    if (
      Object.prototype.hasOwnProperty.call(props, prop) &&
      (prop.startsWith('aria-') || prop === 'role' || prop === 'title') &&
      props[prop] != null
    ) {
      return true;
    }
  }

  return false;
};
