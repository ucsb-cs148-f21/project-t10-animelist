import { HStack, Stack, Badge, Button, Image, Text, Heading, Link } from '@chakra-ui/react';
import * as React from 'react';
import { useAddListEntryMutation, useMeQuery } from '../../generated/graphql';

interface SearchResultProps {
  anime: any
}

const SearchResult: React.FC<SearchResultProps> = ({ anime }) => {
  const { data, loading } = useMeQuery();
  const [addListEntry] = useAddListEntryMutation();
  const isLoggedIn = !loading && data;
  function onClick() {
    addListEntry({
      variables: {
        input: {
          mediaID: anime.id,
          rated: false,
          rating: 0
        }
      }
    });
  }
  return (
    <HStack>
      <Image src={anime.coverImage.medium} height="150"/>
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
          isLoggedIn ?
            (
              <Button onClick={onClick}
                size={"sm"}
              >
                Add Anime
              </Button>
            ) :
            (
              <Link href="/signup">
                <Button
                  size={"sm"}
                >
                  Add Anime
                </Button>
              </Link>
            )
        }
      </Stack>
    </HStack>
  );
};

export default SearchResult;