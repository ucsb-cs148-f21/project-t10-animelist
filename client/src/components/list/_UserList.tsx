import { Badge, Icon, Table, TableCaption, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { UserList as UserListType, UserListItem, UserListRating } from "../../generated/graphql";
import { useFetchAnimeInfoQuery } from "../../generated/graphql_anilist";
import { createApolloAnilist, initializeApolloAnilist, useApolloAnilist } from "../../utils/createApolloAnilist";
import { Image } from "@chakra-ui/react"
import { BsDash } from "react-icons/bs";

const pageSize = 20;

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
  const [ listItems, setListItems ] = useState<IListItem[]>([])
  const { loading } = useFetchAnimeInfoQuery({
    client: initializeApolloAnilist(),
    variables: {
      ids: userlist.items.slice(0, pageSize).map(item => item.mediaID)
    },
    onCompleted: data => {

      const items_map: Record<number, UserListItem> = userlist.items.reduce((map, item) => {
        map[item.mediaID] = item
        return map;
      }, {});

      setListItems(
        data.Page.media.map(anilistMedia => ({
          id: anilistMedia.id,
          title: anilistMedia.title.romaji,
          watchStatus: items_map[anilistMedia.id].watchStatus,
          coverImage: anilistMedia.coverImage.medium
        }))
      );
    }
  });

  if (loading) {
    return <div />
  }

  return (
    <VStack width="full" p={6} maxWidth="6xl" alignItems="center">
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
              console.log(item)
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
    </VStack>
  )
};

export default UserList;
