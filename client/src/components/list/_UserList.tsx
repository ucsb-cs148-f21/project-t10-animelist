import { Badge, Button, Heading, Icon, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { UserList as UserListType, UserListItem, UserListRating } from "../../generated/graphql";
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
  const MAX_PAGE = Math.ceil(userlist.items.length / PAGE_SIZE)
  const [ listItems, setListItems ] = useState<IListItem[]>([])
  const [ page, setPage ] = useState<number>(1);
  const { loading } = useFetchAnimeInfoQuery({
    client: initializeApolloAnilist(),
    variables: {
      ids: userlist.items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(item => item.mediaID)
    },
    onCompleted: data => {

      const items_map: Record<number, UserListItem> = userlist.items.reduce((map, item) => {
        map[item.mediaID] = item
        return map;
      }, {});

      setListItems(
        prev => prev.concat(data.Page.media.map(anilistMedia => ({
          id: anilistMedia.id,
          title: anilistMedia.title.romaji,
          watchStatus: items_map[anilistMedia.id].watchStatus,
          rating: items_map[anilistMedia.id].rating,
          coverImage: anilistMedia.coverImage.medium
        })))
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
    return <div/>
  }

  return (
    <VStack width="full" p={6} maxWidth="6xl">
      <Heading>{ userlist.name }</Heading>
      <Button alignSelf="flex-end">Add Anime</Button>
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
            listItems.map((item) => {
              return (<Tr>
                <Td><Image src={item.coverImage} width="67px" height="100px" objectFit="cover" /></Td>
                <Td>{item.title}</Td>
                <Td><Badge>{item.watchStatus}</Badge></Td>
                <Td>{ item.rating ? item.rating.displayRating : <Icon as={BsDash}/> }</Td>
              </Tr>);
            })
          }
        </Tbody>
      </Table>
      { page < MAX_PAGE && <div ref={loader}/> }
    </VStack>
  )
};

export default UserList;
