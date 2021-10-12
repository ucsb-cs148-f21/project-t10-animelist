import { ApolloProvider } from "@apollo/client";
import React from "react";
import Chakra from "../components/Chakra";
import Layout from "../components/Layout";
import { useApollo } from "../utils/createApollo";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Chakra>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Chakra>
    </ApolloProvider>
  );
}
