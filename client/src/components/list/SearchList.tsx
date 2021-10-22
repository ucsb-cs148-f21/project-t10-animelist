import { HStack, Stack, Badge, Button, Image, Text, Heading } from '@chakra-ui/react';
import * as React from 'react';

interface SearchListProps {
  medias: any[]
}

const SearchList: React.FC<SearchListProps> = ({ medias }) => {
  return (
    <>
      {
        medias.map(anime => {
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
                <Button
                  size={"sm"}
                >
                  Add Anime
                </Button>
              </Stack>
            </HStack>
          )
        })
      }
    </>
  );
};

export default SearchList;