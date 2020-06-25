import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { QueryParamProvider } from "use-query-params";
import customTheme from "../lib/theme";

const QueryProvider = ({ children }) => {
  const router = useRouter();

  const history = {
    push: ({ search }: Location) =>
      router.push({ search, pathname: router.pathname }),

    replace: ({ search }: Location) =>
      router.replace({ search, pathname: router.pathname }),
  };

  const location = {
    search: router.asPath.replace(/[^?]+/u, ""),
  } as Location;

  return (
    <QueryParamProvider history={history} location={location}>
      {children}
    </QueryParamProvider>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <QueryProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
