import { Avatar, Box, Button, ButtonGroup, Center, Container, Grid, GridItem, Heading, HStack, Spinner, VStack, Text, Table, Tbody, Th, Thead, Tr, Td, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import * as React from 'react';
import { useRouter } from "next/router";
import ProfileCard from "../components/profiles/ProfileCard";
import { MalLinkOauthDocument, MalLinkOauthQuery, useProfileQuery } from '../generated/graphql';
import useImperativeQuery from "../utils/useImperativeQuery";
import { ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import UserListItem from "../components/list/_UserListItem";
import ProfilePageBlockGrid from "../components/profiles/ProfilePageBlockGrid";

const Profile: React.FC<{}> = () => {
  const { data, loading } = useProfileQuery();
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
    <VStack
      py={{ base: 10, md: 10 }}
      spacing="3rem"
      width="100%"
      maxWidth={{ base: "sm", md: "6xl" }}
    >
      <HStack
        spacing="3rem"
        width="100%"
      >
        <Avatar
          size={"lg"}
          name={data.me.username}
        />
        <Heading>{data.me.username}</Heading>
      </HStack>
      <ButtonGroup
        width="100%"
      >
        <Button onClick={async () => {
          const { data }: ApolloQueryResult<MalLinkOauthQuery> = await malOauth();
          window.location.href = data.malLinkOauth;
        }}>
          Link MAL
        </Button>
        <Link href="/createratingsystem">
          <Button colorScheme="blue">Create Rating System</Button>
        </Link>
        <Link href="/createlist">
          <Button colorScheme="blue">Create a List</Button>
        </Link>
      </ButtonGroup>

      
      <ProfilePageBlockGrid blocks={data.me.profilePageBlocks} />

      <Grid>
        <Box w='100%'>
          <Table>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Anime title</Th>
                <Th>Watch Status</Th>
                <Th>Rating</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                [1, 2, 3].map(i => <Tr>
                  <Td>Test</Td>
                  <Td>Test</Td>
                  <Td>Test</Td>
                  <Td>Test</Td>
                </Tr>)
              }
            </Tbody>
          </Table>
        </Box>
      </Grid>
       
    </VStack>
  );
};

export default Profile;