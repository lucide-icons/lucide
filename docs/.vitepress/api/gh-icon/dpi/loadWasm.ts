import fs from 'fs';
import module from 'node:module';
import resvg_wasm from "@resvg/resvg-wasm/index_bg.wasm"

let wasm;

if (process.env.NODE_ENV === 'development') {
  const require = module.createRequire(import.meta.url);

  wasm = fs.readFileSync(require.resolve('@resvg/resvg-wasm/index_bg.wasm'));
} else {
  wasm = resvg_wasm;
}

export default wasm;
