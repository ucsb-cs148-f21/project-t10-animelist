import { Center, Spinner, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import Header from "./Header";
import Loading from "./Loading";

export default function Layout({ children }) {
  const { data, loading } = useMeQuery({ notifyOnNetworkStatusChange: true });
  const router = useRouter();

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <Stack
      height="100vh"
      alignItems="center"
    >
      {(router.pathname !== '/') &&
      <Header
        maxW="6xl"
        margin="0 auto"
        width="100%"
        user={data?.me}
      />}
      {children}
    </Stack>
  );
}