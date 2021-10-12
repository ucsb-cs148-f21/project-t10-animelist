import { Button, Center, Spinner, VStack } from "@chakra-ui/react";
import * as React from 'react';
import { useRouter } from "next/router";
import ProfileCard from "../components/profiles/ProfileCard";
import { MalLinkOauthDocument, MalLinkOauthQuery, useMeQuery } from '../generated/graphql';
import useImperativeQuery from "../utils/useImperativeQuery";
import { ApolloQueryResult } from "@apollo/client";

const Profile: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();
  const malOauth = useImperativeQuery(MalLinkOauthDocument);
  const router = useRouter();

  if (loading) { 
    return (
      <Center
        flexGrow={1}
      >
        <Spinner />
      </Center>
    );
  }

  if (!data || !data.me) {
    router.push("/login");

    return (<div />);
  }

  return (
    <Center
      py={{ base: 20, md: 36 }}
      maxW={{ base: "sm", md: "xl" }}
      width="full"
    >
      <VStack width="full">
        <ProfileCard user={data.me} />
        <Button onClick={async () => {
          const { data }: ApolloQueryResult<MalLinkOauthQuery> = await malOauth();
          window.location.href = data.malLinkOauth;
        }}>
          Link MAL
        </Button>
      </VStack>
    </Center>
  );
};

export default Profile;