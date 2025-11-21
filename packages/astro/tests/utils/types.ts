import type { queries, BoundFunctions } from '@testing-library/dom';
import type { ContainerRenderOptions } from 'astro/container';
import type { ComponentProps } from 'astro/types';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export type RenderFn = <T = PossibleComponentType>(
  AstroComponent: T,
  options?: RenderFnOptions<T>,
) => RenderResult;

type RenderFnOptions<T> = T extends AstroComponentVirtualType
  ? ContainerRenderOptionsWithInferedProps<T>
  : ContainerRenderOptions;

type RenderResult = Promise<
  {
    container: HTMLElement;
    html: string;
  } & Queries
>;

type ContainerRenderOptionsWithInferedProps<T extends AstroComponentVirtualType> = Omit<
  ContainerRenderOptions,
  'props'
> & {
  props?: ComponentProps<T>;
};

// types may either be coming from the compiler (through the language tools)
// or from the Astro component's signature itself
type PossibleComponentType = AstroComponentFactory | AstroComponentVirtualType;
type AstroComponentVirtualType = (args: any) => any;

type Queries = BoundFunctions<typeof queries>;
