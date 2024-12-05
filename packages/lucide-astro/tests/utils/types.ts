import { getQueriesForElement, } from '@testing-library/dom'
import type { ContainerRenderOptions } from "astro/container";
import type { ComponentProps } from "astro/types"
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export type RenderFn = <T = PossibleComponentType>(AstroComponent: T, options?: RenderFnOptions<T>) => RenderResult

type RenderFnOptions<T> = T extends AstroComponentVirtualType ? ContainerRenderOptionsWithInferedProps<T> : ContainerRenderOptions

type RenderResult = Promise<{
  container: HTMLElement;
  html: string;
} & Queries>

type ContainerRenderOptionsWithInferedProps<T extends AstroComponentVirtualType> = Omit<ContainerRenderOptions, "props"> & {
  props?: ComponentProps<T>
}

// types may either be coming from the compiler (through the language tools)
// or from the Astro component's signature itself
type PossibleComponentType = AstroComponentFactory | AstroComponentVirtualType
type AstroComponentVirtualType = (args: any) => any;

type Queries = ReturnType<Wrapper["wrapped"]>

// HACK: to unwrap the return type of getQueriesForElement
// without calling the function
// May possibly just use `ReturnType` if the function's ReturnType
// doesn't depend on the first parameter, didn't check that yet
// too much to digest for me rn 😛
class Wrapper {
  wrapped(e: HTMLElement) {
    return getQueriesForElement(e)
  }
}
