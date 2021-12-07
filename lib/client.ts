import { useMemo } from "react";
import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

type CurrentApolloCache = any;
let apolloClient: ApolloClient<CurrentApolloCache> | undefined;

function createIsomorphLink() {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("../backend/schema");
    const { db } = require("../backend/db");
    return new SchemaLink({ schema, context: { db } });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin"
    });
  }
}

function createApolloClient() {
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      for (const { message, locations, path } of graphQLErrors) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);

      if (typeof window !== "undefined" && !window.navigator.onLine) {
        alert("Sorry, your browser is offline.");
      } else {
        alert("Some other network error occurred.");
      }
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, createIsomorphLink()]),
    cache: new InMemoryCache()
  });
}

export function initializeApollo(
  initialState: CurrentApolloCache | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: CurrentApolloCache) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
