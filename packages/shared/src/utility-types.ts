/**
 * Convert a type string from camelCase to PascalCase
 *
 * @example
 * type Test = CamelToPascal<'fooBar'> // 'FooBar'
 */
export type CamelToPascal<T extends string> = T extends `${infer FirstChar}${infer Rest}`
  ? `${Capitalize<FirstChar>}${Rest}`
  : never;

/**
 * Creates a list of components from a list of component names and a component type
 */
export type ComponentList<ComponentNames, ComponentType> = {
  [Prop in keyof ComponentNames as CamelToPascal<Prop & string>]: ComponentType;
};
