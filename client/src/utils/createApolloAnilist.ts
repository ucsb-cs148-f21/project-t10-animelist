import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { merge, isEqual } from "lodash";
import { useMemo } from "react";

export const ANILIST_GRAPHQL_ENDPOINT = "https://graphql.anilist.co";

export const APOLLO_ANILIST_STATE_PROP_NAME = "__APOLLO_ANILIST_STATE__"

let apolloClient;

export function createApolloAnilist() {
  return new ApolloClient({
    uri: ANILIST_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });
}

export function initializeApolloAnilist(initialState = null) {
  const _apolloClient: ApolloClient<NormalizedCacheObject> = apolloClient ?? createApolloAnilist()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloStateAnilist(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_ANILIST_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApolloAnilist(pageProps) {
  const state = pageProps[APOLLO_ANILIST_STATE_PROP_NAME]
  const store = useMemo(() => initializeApolloAnilist(state), [state])
  return store
}
