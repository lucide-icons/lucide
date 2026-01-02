import { type IconNode } from 'lucide-vue-next/src/types';
import Vue from 'vue';

declare module '*.vue' {
  export default Vue;
}

declare module '*.data.ts' {
  const data: any;

  export { data };
}

declare module '*.data' {
  const data: any;

  export { data };
}

declare module '*.wasm' {}

declare const resvg_wasm: RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare module 'node:module' {
  function createRequire(filename: string): NodeRequire;
}

declare module '*.node.json' {
  const value: IconNode;
  export default value;
}

declare global {
  interface Window {
    ExpoSnack?: {
      /**
       * Initialize all snack players on the page
       */
      initialize(): void;
      /**
       * Remove a snack player container
       */
      remove(container: Element): void;
      /**
       * Append/add a snack player container
       */
      append(container: Element): void;
    };
  }
}
