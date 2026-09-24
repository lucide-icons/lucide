// eslint-disable
// This file is make sure that we can import from "lucide-react/dynamic" without having to specify the extension. This is a workaround for the fact that some bundlers (like Webpack) don't support importing from "lucide-react/dynamic.mjs" without specifying the extension.
// It is also the "default" target of the "./dynamic" entry in the package.json exports map, and it stays in place for resolvers that ignore "exports".
export * from './dynamic.mjs';
