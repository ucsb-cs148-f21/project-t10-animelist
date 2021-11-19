import { Badge, Button, Heading, Icon, Link, Skeleton, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useMeQuery, UserList as UserListType, UserListItem, UserListRating } from "../../generated/graphql";
import { useFetchAnimeInfoQuery } from "../../generated/graphql_anilist";
import { createApolloAnilist, initializeApolloAnilist, useApolloAnilist } from "../../utils/createApolloAnilist";
import { Image } from "@chakra-ui/react"
import { BsDash } from "react-icons/bs";

const PAGE_SIZE = 10;

interface UserListProps {
  userlist: UserListType;
}

interface IListItem {
  id: number;
  title: string;
  watchStatus: string;
  coverImage: string;
  rating?: UserListRating;
}

const UserList: React.FC<UserListProps> = ({ userlist }) => {
  const { data } = useMeQuery();
  const isLoggedIn = data;
  const { isOpen, onOpen, onClose } = useDisclosure()
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

      const userListItemOf: Record<number, UserListItem> = userlist.items.reduce((map, item) => {
        map[item.mediaID] = item
        return map;
      }, {});

      const listItems = data.Page.media.slice().sort((a, b) => indexOf[a.id] - indexOf[b.id]).map(anilistMedia => ({
        id: anilistMedia.id,
        title: anilistMedia.title.romaji,
        watchStatus: userListItemOf[anilistMedia.id].watchStatus,
        rating: userListItemOf[anilistMedia.id].rating,
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

      {
        isLoggedIn ?
          (
            <Button
              size={"sm"}
            >
              Logged in
            </Button>
          ) :
          (
            <Button
              size={"sm"}
            >
              Not logged in
            </Button>
          )
      }

      {
        isLoggedIn && data.me.id == userlist.ownerId ?
          (
            <Link href="/search">
              <Button colorScheme="blue">Add Anime</Button>
            </Link>) :
          <div></div>
      }

      <Table>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Anime title</Th>
            <Th>Watch Status</Th>
            <Th>Rating</Th>
            {
              isLoggedIn && data.me.id == userlist.ownerId ?
                (
                  <Th>Edit</Th>
                ) :
                (
                  <div></div>
                )
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            listItems.map((item) => {
              return (<Tr>
                <Td><Image src={item.coverImage} minWidth="67px" width="67px" height="100px" objectFit="cover" /></Td>
                <Td>{item.title}</Td>
                <Td><Badge>{item.watchStatus}</Badge></Td>
                <Td>{item.rating ? item.rating.displayRating : <Icon as={BsDash} />}</Td>
                {
                  isLoggedIn && data.me.id == userlist.ownerId ?
                    (
                      <Td><Button onClick={onOpen}> Edit </Button></Td>
                    ) :
                    (
                      <div></div>
                    )
                }
              </Tr>);
            })
          }
        </Tbody>
      </Table>
      {!loading && page < MAX_PAGE && <div ref={loader} />}
    </VStack>
  )
};

export default UserList;
