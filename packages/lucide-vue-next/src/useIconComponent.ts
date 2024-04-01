import createLucideIcon from './createLucideIcon';
import { LucideIcon, IconNode } from './types';

type CamelToPascal<T extends string> = T extends `${infer FirstChar}${infer Rest}`
  ? `${Capitalize<FirstChar>}${Rest}`
  : never;

type ComponentList<T> = {
  [Prop in keyof T as CamelToPascal<Prop & string>]: LucideIcon;
};

export const toPascalCase = <T extends string>(string: T): CamelToPascal<T> => {
  const camelCase = string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );

  return (camelCase.charAt(0).toUpperCase() + camelCase.slice(1)) as CamelToPascal<T>;
};

const useIconComponent = <Icons extends Record<string, IconNode>>(icons: Icons) => {
  if (typeof icons !== 'object') {
    throw new Error('[lucide-vue-next]: useIconComponent expects an object as argument');
  }

  const iconNodeEntries = Object.entries(icons);

  const iconNodesHasCorrectType = iconNodeEntries.every(([, iconNode]) => Array.isArray(iconNode));

  if (!iconNodesHasCorrectType) {
    throw new Error('[lucide-vue-next]: Passed icons object has incorrect type');
  }

  const iconComponents = iconNodeEntries.reduce((acc, [iconName, iconNode]) => {
    const componentName = toPascalCase(iconName) as keyof ComponentList<Icons>;

    acc[componentName] = createLucideIcon(
      componentName as string,
      iconNode,
    ) as ComponentList<Icons>[typeof componentName];

    return acc;
  }, {} as ComponentList<Icons>);

  return iconComponents;
};

export default useIconComponent;
