import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { Avatar, Button, Heading, Table, TableCaption, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { UserListEntry } from "../../generated/graphql";
import { createApolloAnilist } from "../../utils/createApolloAnilist";
import Loading from "../Loading";
import UserListRow from "./UserListRow";

const pageSize = 20 ;

interface UserListProps {
  list: UserListEntry[];
}

const UserList: React.FC<UserListProps> = ({ list }) => {
  const [medias, setMedias] = React.useState(new Map());
  const [mediasFetched, setMediasFetched] = React.useState(false);
  const [pages, setPages] = React.useState(1);

  const totalPages =Math.ceil(list.length/pageSize);
  const observer = React.useRef(
    new IntersectionObserver(
        (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setPages((no) => no + 1);
            }
        }
        )
  );

  React.useEffect(() => {
    
    const apolloClient = createApolloAnilist();
    fetchAnimeInfo(apolloClient);

    return () => apolloClient.stop();
  }, [list,pages]);
  
  async function fetchAnimeInfo(apolloClient: ApolloClient<NormalizedCacheObject>) {
    const query = gql`
      query FetchAnimeInfo($ids: [Int]!) {
        Page {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
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

    const lastPage = list.slice((pages - 1) * pageSize, pages * pageSize);
    const lastPageIds = lastPage.map(anime => anime.mediaID);

    const { data: newMedias }  = await apolloClient.query({
      query,
      variables: {
        ids: lastPageIds
      }
    });

    // convert array of media into an array of pairs, where first value
    // is the media ID and second value is the entire media object,
    // then convert the array of pairs into a Map so that we can fetch
    // media data by media ID.
    const newMediasMap = new Map(newMedias.Page.media.map(
      (media: any) => [media.id, media]
    ));

    const mergedMediasMap = new Map([...Array.from(medias), ...Array.from(newMediasMap)])

    setMedias(mergedMediasMap);
    setMediasFetched(true);
  }

  if (!mediasFetched) {
    return <Loading />;
  }

  const displayedList = list.slice(0,pageSize*pages);
  
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
          {displayedList.map(anime => {
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
      <div>
        {pages}
      </div>
    </VStack>
  )
};

export default UserList;
