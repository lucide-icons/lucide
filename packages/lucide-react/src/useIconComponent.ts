import createLucideIcon, { IconNode, LucideIcon } from "./createLucideIcon";

type CamelToPascal<T extends string> =
  T extends `${infer FirstChar}${infer Rest}` ? `${Capitalize<FirstChar>}${Rest}` : never

type ComponentList<T> = {
  [Prop in keyof T as CamelToPascal<Prop & string>]: LucideIcon
}

export const toPascalCase = <T extends string>(string: T): CamelToPascal<T> => {
  const camelCase = string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );

  return (camelCase.charAt(0).toUpperCase() + camelCase.slice(1)) as CamelToPascal<T>;
};

const useIconComponent = <Icons extends Record<string, IconNode>>(icons: Icons) => {
  // TODO: throw error if iconNodes are incorrect
  // TODO: throw error if this function is executed inside a react component render function

  const iconNodeEntries = Object.entries(icons)
  const iconComponents = iconNodeEntries.reduce((acc, [iconName, iconNode]) => {
    const componentName = toPascalCase(iconName) as keyof ComponentList<Icons>;

    acc[componentName] = createLucideIcon(componentName as string, iconNode) as ComponentList<Icons>[typeof componentName];

    return acc;
  }, {} as ComponentList<Icons>)

  return iconComponents
}

export default useIconComponent
