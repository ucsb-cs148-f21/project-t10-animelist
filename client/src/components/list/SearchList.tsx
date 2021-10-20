import { HStack, Stack, Badge, Button, Image, Text } from '@chakra-ui/react';
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
            <HStack>
              <Image src={anime.coverImage.medium} />
              <Stack
                height="100%"
                alignItems="flex-start"
              >
                <Text>{anime.title.romaji}</Text>
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