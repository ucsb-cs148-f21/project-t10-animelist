import { ApolloClient, InMemoryCache } from "@apollo/client";

export const ANILIST_GRAPHQL_ENDPOINT = "https://graphql.anilist.co";

export function createApolloAnilist() {
  return new ApolloClient({
    uri: ANILIST_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });
}