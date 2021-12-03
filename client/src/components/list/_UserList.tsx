import { useApolloClient } from "@apollo/client";
import { PlusSquareIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, Tbody, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ContinuousRatingSystem, DiscreteRatingSystem, UserList as UserListType, UserListItem as UserListItemType, UserListRating, _UserListDocument } from "../../generated/graphql";
import { useFetchAnimeInfoQuery } from "../../generated/graphql_anilist";
import { initializeApolloAnilist } from "../../utils/createApolloAnilist";
import SearchAddAnime from "../search/_SearchAddAnime";
import UserListItem from "./_UserListItem";

const PAGE_SIZE = 20;

export interface UserListProps {
  userlist: UserListType;
  isOwn: boolean;
  fullSize: boolean;
}

export interface IListItem {
  id: number;
  listId: string;
  title: string;
  watchStatus: string;
  coverImage: string;
  bannerImage: string;
  ratingSystem?: ContinuousRatingSystem | DiscreteRatingSystem;
  rating?: UserListRating;
}

export const ListOwnerBar: React.FC<{ addedIds: Set<number>; listId: string }> = ({ addedIds, listId }) => {
  const { isOpen, onOpen, onClose: onCloseDisclosure } = useDisclosure();
  const client = useApolloClient();
  const onClose = async () => {
    await client.refetchQueries({ include: [_UserListDocument] });
    onCloseDisclosure();
  }
  return (
    <>
      <ButtonGroup alignSelf="flex-end">
        <Button leftIcon={<PlusSquareIcon/>} alignSelf="flex-end" colorScheme="blue" onClick={onOpen}>Add Anime</Button>
        <Button leftIcon={<SettingsIcon/>}>Settings</Button>
      </ButtonGroup>
      <Modal isCentered   scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
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

const UserList: React.FC<UserListProps> = ({ userlist, isOwn, fullSize }) => {
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
        ratingSystem: userlist.ratingSystem as any,
        listId: userlist.id,
        coverImage: anilistMedia.coverImage.medium,
        bannerImage: anilistMedia.bannerImage
      }));
      
      setListItems(
        prev => {
          const ids = new Set<number>(prev.map(item => item.id));
          return page === 1 ? listItems : prev.concat(listItems.filter(item => !ids.has(item.id)));
        }
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
    <VStack width="full" p={6}>
      <Heading>{userlist.name}</Heading>
      {isOwn && <ListOwnerBar addedIds={new Set(userlist.items.map(item => item.mediaID))} listId={userlist.id} />}
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
            listItems.map((item) => <UserListItem key={item.id} item={item} canEdit={isOwn}/>)
          }
        </Tbody>
      </Table>
      {!loading && page < MAX_PAGE && <div ref={loader} />}
    </VStack>
  )
};

export default UserList;
