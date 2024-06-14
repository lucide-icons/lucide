import { IconNode } from 'lucide-vue-next/src/createLucideIcon';
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
  export default IconNode;
}
