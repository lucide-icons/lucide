import { useColorMode } from "@chakra-ui/core";
import { useKeyBindings } from "../lib/key";

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useKeyBindings({
    KeyT: {
      fn: () => toggleColorMode(),
    },
  });

  return <div>{children}</div>;
};

export default Layout;
