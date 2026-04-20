import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import { Provider as MobxProvider } from "mobx-react";
import { RootStore } from "./store";
import "./app.less";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  /* 使用MobX-React提供的Provider写入Store Context */
  return <MobxProvider {...RootStore}>{children}</MobxProvider>;
}

export default App;
