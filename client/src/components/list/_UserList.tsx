import { useApolloClient } from "@apollo/client";
import { PlusSquareIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ContinuousRatingSystem, DiscreteRatingSystem, UserList as UserListType, UserListItem as UserListItemType, UserListRating, useUpdateUserListMutation, _UserListDocument } from "../../generated/graphql";
import { useFetchAnimeInfoQuery } from "../../generated/graphql_anilist";
import { initializeApolloAnilist } from "../../utils/createApolloAnilist";
import SearchAddAnime from "../search/_SearchAddAnime";
import { useCreateUserListMutation, useMeQuery } from "../../generated/graphql";
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

export const ListOwnerBar: React.FC<{ addedIds: Set<number>; userlist: UserListType }> = ({ addedIds, userlist }) => {
  const { isOpen: isOpenAddAnimeModal, onOpen: onOpenAddAnimeModal, onClose: onCloseAddAnimeModal } = useDisclosure();
  const { isOpen: isOpenEditAnimeModal, onOpen: onOpenEditAnimeModal, onClose: onCloseEditAnimeModal } = useDisclosure();
  const client = useApolloClient();
  const onClose = async () => {
    await client.refetchQueries({ include: [_UserListDocument] });
    onCloseAddAnimeModal();
  }
  return (
    <>
      <ButtonGroup alignSelf="flex-end">
        <Button leftIcon={<PlusSquareIcon />} alignSelf="flex-end" colorScheme="blue" onClick={onOpenAddAnimeModal}>Add Anime</Button>
        <Button leftIcon={<SettingsIcon />} onClick={onOpenEditAnimeModal} >Settings</Button>
      </ButtonGroup>
      <Modal isCentered scrollBehavior="inside" isOpen={isOpenAddAnimeModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="10px" maxW="56rem">
          <ModalCloseButton />
          <ModalHeader>
            <Heading>Add Anime</Heading>
          </ModalHeader>
          <ModalBody>
            <SearchAddAnime addedIds={addedIds} listId={userlist.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <EditUserListModal initialName={userlist.name} initialRatingSystemId={userlist.ratingSystem.id} listId={userlist.id} isOpen={isOpenEditAnimeModal} onClose={onCloseEditAnimeModal} />
    </>
  );
};

export const EditUserListModal: React.FC<{ initialName: string, initialRatingSystemId: string, listId: string, isOpen: boolean, onClose: () => void, }> = ({ initialName, initialRatingSystemId, listId, isOpen, onClose }) => {
  const [updateUserList] = useUpdateUserListMutation();
  const { data: meData } = useMeQuery();
  const formik = useFormik({
    initialValues: {
      name: initialName,
      ratingSystemId: initialRatingSystemId
    },
    onSubmit: async ({ name, ratingSystemId }) => {
      await updateUserList({
        variables: {
          input: {
            name,
            listId,
            ratingSystemId
          }
        }
      })
      .then(
        req => {
          window.location.reload();
        },
        err => {
          console.log("Error!")
        }
      )
    }
  });
  
  return (
    <Modal isCentered scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="10px" maxW="56rem">
        <ModalCloseButton />
        <ModalHeader>
          <Heading>update name and rating system</Heading>
        </ModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>New name</FormLabel>
              <Input id="name" {...formik.getFieldProps("name")} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>New ratingsystem</FormLabel>
              <Select
                size="lg"
                id="ratingSystemId"
                {...formik.getFieldProps("ratingSystemId")}
                isRequired
              >
                <option value="10_DISCRETE" >10 point</option>
                <option value="10_CONTINUOUS" >10 point decimal</option>
                <option value="100_CONTINUOUS" >100 point decimal</option>
                <option value="5_STAR" >5 stars</option>
                <option value="3_SMILEY" >3 smiley</option>
                {
                  meData && meData.me.ratingSystems && meData.me.ratingSystems.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                }
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="red" variant="outline" onClick={onClose}>Cancel</Button>
              <Button colorScheme="green" type="submit">
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
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
    <VStack width="full" p={fullSize ? 6 : 0}>
      <Heading size={fullSize ? 'xl' : 'md'} alignSelf={fullSize ? 'center' : 'flex-start'}>
        {userlist.name}
      </Heading>
      {isOwn && <ListOwnerBar addedIds={new Set(userlist.items.map(item => item.mediaID))} userlist={userlist} />}
      <Table>
        <Thead>
          <Tr>
            {fullSize && <Th>Image</Th>}
            <Th>Anime title</Th>
            <Th display={{ base: "none", md: "table-cell" }}>Watch Status</Th>
            <Th>Rating</Th>
            {isOwn && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {
            listItems.map((item) => <UserListItem key={item.id} item={item} canEdit={isOwn} showImage={fullSize} />)
          }
        </Tbody>
      </Table>
      {!loading && page < MAX_PAGE && <div ref={loader} />}
    </VStack>
  )
};

export default UserList;
