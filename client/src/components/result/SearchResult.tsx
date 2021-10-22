import { HStack, Stack, Badge, Button, Image, Text, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useAddListEntryMutation } from '../../generated/graphql';

interface SearchResultProps {
  anime: any
}

const SearchResult: React.FC<SearchResultProps> = ({ anime }) => {
  const [addListEntry] = useAddListEntryMutation();
  function onclick() {
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
    <HStack key={anime.id}>
      <Image src={anime.coverImage.medium} />
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
        <Button onClick={onclick}
          size={"sm"}
        >
          Add Anime
        </Button>
      </Stack>
    </HStack>
  );
};

export default SearchResult;