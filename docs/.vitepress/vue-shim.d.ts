declare module '*.vue' {
  import Vue from 'vue';
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
