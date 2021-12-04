import { ApolloQueryResult } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, HStack, Link, VStack } from "@chakra-ui/layout";
import { Avatar, Button, ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { data } from "msw/lib/types/context";
import React from "react";
import { Block, BlockInput, EmbeddedUserList, MalLinkOauthDocument, MalLinkOauthQuery, ProfileDocument, User, useUpdateProfilePageBlocksMutation } from "../../generated/graphql";
import { convertBlockToBlockInput } from "../../utils/convertBlock";
import useImperativeQuery from "../../utils/useImperativeQuery";
import AddBlockModal from "./AddBlockModal";
import ProfilePageBlockGrid from "./ProfilePageBlockGrid";

interface Props {
  username: string;
  userLists: EmbeddedUserList[];
  profilePageBlocks: Block[][];
  isOwn: boolean;
}

const ProfilePage: React.FC<Props> = ({ username, userLists, profilePageBlocks, isOwn }) => {
  const addBlock = (newBlock: BlockInput) => {
    // convert current blocks into BlockInput types
    let updatedBlocks: BlockInput[][] = profilePageBlocks.map(row => row.map(convertBlockToBlockInput))

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
    }).then(success => {
        if (success) {
          toast({ position: "top", status: "success", title: "Success!", description: `Successfully added block` });
        }
    });
  }

  const [ updateProfilePageBlocks ] = useUpdateProfilePageBlocksMutation();
  const malOauth = useImperativeQuery(MalLinkOauthDocument);
  const toast = useToast();

  const {
    isOpen: isOpenAddBlock,
    onOpen: onOpenAddBlock,
    onClose: onCloseAddBlock
  } = useDisclosure();

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
            name={username}
          />
          <Heading>{username}</Heading>
        </HStack>
        {isOwn && 
        <Box>
          <Tooltip label='Edit profile' placement='right' openDelay={250}>
            <IconButton aria-label='Edit profile' icon={<EditIcon />}
              onClick={onOpenAddBlock} />
          </Tooltip>
          <AddBlockModal
            userLists={userLists}
            isOpen={isOpenAddBlock}
            onClose={onCloseAddBlock}
            onBlockComplete={addBlock} />
        </Box>}
      </Flex>
      {isOwn && <ButtonGroup
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
      </ButtonGroup>}
      
      <ProfilePageBlockGrid blocks={profilePageBlocks} />

    </VStack>
  );
};

export default ProfilePage;