import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { Avatar, Button, Heading, Table, TableCaption, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { UserListEntry } from "../../generated/graphql";
import { createApolloAnilist } from "../../utils/createApolloAnilist";
import Loading from "../Loading";
import UserListRow from "./UserListRow";

interface UserListProps {
  list: UserListEntry[];
}

const UserList: React.FC<UserListProps> = ({ list }) => {
  const [medias, setMedias] = React.useState(new Map());
  const [mediasFetched, setMediasFetched] = React.useState(false);

  React.useEffect(() => {
    const apolloClient = createApolloAnilist();
    fetchAnimeInfo(apolloClient);

    return () => apolloClient.stop();
  }, [list]);
  
  async function fetchAnimeInfo(apolloClient: ApolloClient<NormalizedCacheObject>) {
    const query = gql`
      query FetchAnimeInfo($ids: [Int]!) {
        Page {
          media(id_in: $ids, type: ANIME, isAdult: false) {
            id
            title {
              romaji
            }
            coverImage {
              medium
            }
          }
        }
      }
    `;

    const { data } = await apolloClient.query({
      query,
      variables: {
        ids: list.map(anime => anime.mediaID)
      }
    });

    // convert array of media into an array of pairs, where first value
    // is the media ID and second value is the entire media object,
    // then convert the array of pairs into a Map so that we can fetch
    // media data by media ID.
    const dataMap = new Map(data.Page.media.map(
      (media: any) => [media.id, media]
    ));

    setMedias(dataMap);
    setMediasFetched(true);
  }

  if (!mediasFetched) {
    return <Loading />;
  }

  return (
    <VStack width="full" p={6} maxWidth="6xl">
      <Table>
        <TableCaption>This is my animelist</TableCaption>
        <Thead>
          <Tr>
            <Th>Anime title</Th>
            <Th>Score</Th>
            <Th></Th> {/* empty column for Edit button */}
          </Tr>
        </Thead>
        <Tbody>
          {list.map(anime => {
            // check if media is defined in case media ID wasn't in anilist database
            const media = medias.get(anime.mediaID);

            return <UserListRow 
              key={anime.mediaID}
              entryData={{
                ...anime,
                title: (media ? media.title.romaji : "Unknown Title"),
                coverImage: (media ? media.coverImage.medium : "")
              }}
            />
          })}
        </Tbody>
      </Table>
      <Link href="/search">
        <Button colorScheme="blue">Add Anime</Button>
      </Link>
    </VStack>
  )
};

export default UserList;
