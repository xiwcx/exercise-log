import type { AppProps } from "next/app";
import { LayoutMain } from "../components/layout-main";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const link = createHttpLink({
  uri: "/api/graphql",
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <LayoutMain>
        <Component {...pageProps} />
      </LayoutMain>
    </ApolloProvider>
  );
}
export default MyApp;
