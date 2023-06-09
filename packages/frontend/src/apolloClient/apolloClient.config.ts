import { ApolloClient } from "@apollo/client";
import { getPersistedCache } from "./cache";

export const getApolloClient = async () => {
  const cache = await getPersistedCache();
  return new ApolloClient({
    uri: "http://localhost:8888/graphql",
    cache,
    connectToDevTools: true,
  }) as ApolloClient<any>;
};
