import { Avatar, Box, Button, ButtonGroup, Center, Container, Grid, GridItem, Heading, HStack, Spinner, VStack, Text, Table, Tbody, Th, Thead, Tr, Td, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Flex, IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import * as React from 'react';
import { useRouter } from "next/router";
import ProfileCard from "../components/profiles/ProfileCard";
import { Block, StatisticsBlock, MalLinkOauthDocument, MalLinkOauthQuery, useProfileQuery, BlockInput, useUpdateProfilePageBlocksMutation, UserListBlockInput, TextBlockInput, ProfileDocument } from '../generated/graphql';
import useImperativeQuery from "../utils/useImperativeQuery";
import { ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import UserListItem from "../components/list/_UserListItem";
import ProfilePageBlockGrid from "../components/profiles/ProfilePageBlockGrid";
import { EditIcon } from "@chakra-ui/icons";
import AddBlockModal from "../components/profiles/AddBlockModal";
import { profile } from "console";
import { convertBlockToBlockInput } from "../utils/convertBlock";

const Profile: React.FC<{}> = () => {
  const addBlock = (newBlock: BlockInput) => {
    // convert current blocks into BlockInput types
    let updatedBlocks: BlockInput[][] = data.me.profilePageBlocks.map(row => row.map(convertBlockToBlockInput))

    let row = [newBlock];
    updatedBlocks.push(row);

    console.log(updatedBlocks);
    updateProfilePageBlocks({
      variables: {
        input: {
          blocks: updatedBlocks
        }
      },
      refetchQueries: [
        ProfileDocument
      ]
    });
  }

  const { data, loading } = useProfileQuery();
  const [ updateProfilePageBlocks ] = useUpdateProfilePageBlocksMutation();
  const malOauth = useImperativeQuery(MalLinkOauthDocument);
  const router = useRouter();

  const {
    isOpen: isOpenAddBlock,
    onOpen: onOpenAddBlock,
    onClose: onCloseAddBlock
  } = useDisclosure();

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
      <Flex width="100%" direction='row' justifyContent='space-between'>
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
        <Box>
          <Tooltip label='Edit profile' placement='right' openDelay={250}>
            <IconButton aria-label='Edit profile' icon={<EditIcon />}
              onClick={onOpenAddBlock} />
          </Tooltip>
          <AddBlockModal
            userLists={data.me.userLists}
            isOpen={isOpenAddBlock}
            onClose={onCloseAddBlock}
            onBlockComplete={addBlock} />
        </Box>
      </Flex>
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

    </VStack>
  );
};

export default Profile;