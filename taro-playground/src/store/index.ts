// /store/index.ts
import { Store } from "./test";
import { User } from "./user";
/** 将每个Store实例化 */
export const RootStore = {
  store: new Store(),
  user: new User(),
};
