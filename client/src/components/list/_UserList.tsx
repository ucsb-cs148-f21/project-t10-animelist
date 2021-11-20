import { Badge, Button, Heading, Icon, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { RatingSystem, useMeQuery, UserList as UserListType, UserListItem as UserListItemType, UserListRating } from "../../generated/graphql";
import { useFetchAnimeInfoQuery } from "../../generated/graphql_anilist";
import { createApolloAnilist, initializeApolloAnilist, useApolloAnilist } from "../../utils/createApolloAnilist";
import { Image } from "@chakra-ui/react"
import { BsDash } from "react-icons/bs";
import SearchAddAnime from "../search/_SearchAddAnime";
import UserListItem from "./_UserListItem";

const PAGE_SIZE = 20;

export interface UserListProps {
  ratingSystem: RatingSystem;
  userlist: UserListType;
  isOwn: boolean;
}

export interface IListItem {
  id: number;
  listId: string;
  title: string;
  watchStatus: string;
  coverImage: string;
  rating?: UserListRating;
}

const AddAnime: React.FC<{ addedIds: Set<number>; listId: string }> = ({ addedIds, listId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button alignSelf="flex-end" onClick={onOpen}>Add Anime</Button>
      <Modal isCentered scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="10px" maxW="56rem">
          <ModalCloseButton />
          <ModalHeader>
            <Heading>Add Anime</Heading>
          </ModalHeader>
          <ModalBody>
            <SearchAddAnime addedIds={addedIds} listId={listId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const UserList: React.FC<UserListProps> = ({ userlist, isOwn }) => {
  const MAX_PAGE = Math.ceil(userlist.items.length / PAGE_SIZE)
  const [listItems, setListItems] = useState<IListItem[]>([])
  const [page, setPage] = useState<number>(1);
  const { loading } = useFetchAnimeInfoQuery({
    client: initializeApolloAnilist(),
    variables: {
      ids: userlist.items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(item => item.mediaID)
    },
    onCompleted: data => {
      const indexOf = userlist.items.reduce((map, item, idx) => {
        map[item.mediaID] = idx;
        return map;
      }, {});

      const userListItemOf: Record<number, UserListItemType> = userlist.items.reduce((map, item) => {
        map[item.mediaID] = item
        return map;
      }, {});

      const listItems = data.Page.media.slice().sort((a, b) => indexOf[a.id] - indexOf[b.id]).map(anilistMedia => ({
        id: anilistMedia.id,
        title: anilistMedia.title.romaji,
        watchStatus: userListItemOf[anilistMedia.id].watchStatus,
        rating: userListItemOf[anilistMedia.id].rating,
        listId: userlist.id,
        coverImage: anilistMedia.coverImage.medium
      }));

      setListItems(
        prev => prev.concat(listItems)
      );
    }
  });

  const loader = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entities) => {
      if (entities[0].isIntersecting) {
        setPage(Math.min(MAX_PAGE, page + 1))
      }
    });
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [loading]);

  if (loading && listItems.length == 0) {
    return (
      <div />
    )
  }

  return (
    <VStack width="full" p={6} maxWidth="6xl">
      <Heading>{userlist.name}</Heading>
      {isOwn && <AddAnime addedIds={new Set(userlist.items.map(item => item.mediaID))} listId={userlist.id} />}
      <Table>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Anime title</Th>
            <Th>Watch Status</Th>
            <Th>Rating</Th>
            {isOwn && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {
            listItems.map((item) => <UserListItem ratingSystem={userlist.ratingSystem} key={item.id} item={item} canEdit={isOwn}/>)
          }
        </Tbody>
      </Table>
      {!loading && page < MAX_PAGE && <div ref={loader} />}
    </VStack>
  )
};

export default UserList;
