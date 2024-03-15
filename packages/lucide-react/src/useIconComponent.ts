import { CamelToPascal, ComponentList, toPascalCase } from "@lucide/shared";
import createLucideIcon from "./createLucideIcon";

import { IconNode, LucideIcon } from "./types";

/**
 * Create a list (object) of icon components from a list (object) of icon nodes
 *
 * @param icons
 * @returns Object of icon components
 */
const useIconComponent = <Icons extends Record<string, IconNode>>(iconNodes: Icons) => {
  if (typeof iconNodes !== 'object') {
    console.error('[lucide-react]: useIconComponent expects an object as argument')
  }

  const iconNodeEntries = Object.entries(iconNodes)

  const iconNodesHasCorrectType = iconNodeEntries.every(
    ([, iconNode]) => Array.isArray(iconNode)
  )

  if (!iconNodesHasCorrectType) {
    console.error('[lucide-react]: Passed icons object has incorrect type')
  }
  // TODO: Optional throw an warning if this function is executed inside a react component render function, because this harms performance

  const iconComponents = iconNodeEntries.reduce((acc, [iconName, iconNode]) => {
    const componentName = toPascalCase(iconName) as keyof ComponentList<Icons, LucideIcon>;

    acc[componentName] = createLucideIcon(componentName as string, iconNode) as ComponentList<Icons, LucideIcon>[typeof componentName];

    return acc;
  }, {} as ComponentList<Icons, LucideIcon>)

  return iconComponents
}

export default useIconComponent
