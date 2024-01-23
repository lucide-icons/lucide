import { LucideIcon } from "../dist/lucide-react";
import createLucideIcon, { IconNode } from "./createLucideIcon";

type CamelToPascal<T extends string> =
  T extends `${infer FirstChar}${infer Rest}` ? `${Capitalize<FirstChar>}${Rest}` : never

type ComponentList<T> = {
  [Prop in keyof T as CamelToPascal<Prop & string>]: LucideIcon
}

const toPascalCase = <T extends string>(string: T): CamelToPascal<T> =>
  string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()) as CamelToPascal<T>;

const useIconComponent = <Icons extends Record<string, IconNode>>(icons: Icons) => {
  const iconNodeEntries = Object.entries(icons)
  const iconComponents = iconNodeEntries.reduce((acc, [iconName, iconNode]) => {
    const componentName = toPascalCase(iconName) as keyof ComponentList<Icons>;

    acc[componentName] = createLucideIcon(componentName as string, iconNode) as ComponentList<Icons>[typeof componentName];

    return acc;
  }, {} as ComponentList<Icons>)

  return iconComponents
}

export default useIconComponent
