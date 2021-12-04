import { Badge, Button, Heading, HStack, Image, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import { use_AddUserListItemMutation, WatchStatus } from '../../generated/graphql';
import { Media, useSearchAnimeLazyQuery } from '../../generated/graphql_anilist';
import { initializeApolloAnilist } from '../../utils/createApolloAnilist';

interface SearchAddAnimeProps {
  addedIds: Set<number>;
  listId: string;
}

interface SearchResultProps {
  anime: Media;
  listId: string;
  isAdded: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({ anime, isAdded, listId }) => {
  const [added, setAdded] = useState(isAdded)
  const [ addUserListItem ] = use_AddUserListItemMutation();
  const toast = useToast();
  function onClick() {
    addUserListItem({
      variables: {
        input: {
          mediaID: anime.id,
          listId,
          watchStatus: WatchStatus.PlanToWatch
        }
      }
    }).then(
      res => {
        setAdded(true);
        toast({ position: "top", status: "success", title: "Success!", description: `Successfully added ${anime.title.romaji}` });
      }, 
      err => {
        toast({ position: "top", status: "error", title: "Error", description: `Failed to add ${anime.title.romaji}` });
      }
    );
  }
  return (
    <HStack>
      <Image src={anime.coverImage.medium} width="67px" height="100px" objectFit="cover" />
      <Stack
        height="100%"
        alignItems="flex-start"
      >
        <Heading size={"sm"}>{anime.title.romaji}</Heading>
        <HStack
          alignItems="center"
          flexWrap="wrap"
        >
          <Text>Genres:</Text>
          {
            anime.genres.map(genre => (
              <Badge
                key={genre}
              >
                {genre}
              </Badge>
            ))
          }
        </HStack>
        <div style={{ flexGrow: 1 }} />
        {
          !added ?
            (
              <Button onClick={onClick}
                size={"sm"}
              >
                Add Anime
              </Button>
            ) :
            (
              <Button
                size={"sm"}
                disabled={true}
              >
                Added
              </Button>
            )
        }
      </Stack>
    </HStack>
  );
};

const SearchAddAnime: React.FC<SearchAddAnimeProps> = ({ addedIds, listId }) => {
  const [ searchAnime, { data, loading }] = useSearchAnimeLazyQuery({ client: initializeApolloAnilist() });
  const formik = useFormik({
    initialValues: {
      title: ""
    },
    onSubmit: async ({ title }) => {
      searchAnime({ variables: { search: title } });
    }
  });

  return (
    <Stack
      spacing={{ base: 8 }}
      width="100%"
    >
      <form onSubmit={formik.handleSubmit}>
        <HStack>
          <Input id="title" {...formik.getFieldProps("title")} autoComplete="off" placeholder="Search by title" />
          <Button type="submit" isLoading={formik.isSubmitting || loading}>
            Search
          </Button>
        </HStack>
      </form>
      {formik.isSubmitting || loading || !data ?
        <div/> :
        (<>
          {
            data.Page.media.map(anime => {
              return (
                <SearchResult key={anime.id} anime={anime} isAdded={addedIds.has(anime.id)} listId={listId} />
              )
            })
          }
        </>
        )}
    </Stack>
  );
};

export default SearchAddAnime;