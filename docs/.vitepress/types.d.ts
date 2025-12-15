import { type IconNode } from 'lucide-vue-next/src/types';
import Vue from 'vue';

declare module '*.vue' {
  export default Vue;
}

declare module '*.data.ts' {
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
