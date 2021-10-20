import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Container, FormControl, Heading, HStack, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Form } from "formik";
import * as React from 'react';

const SearchForm: React.FC<{}> = () => {
  const [animes, setAnimes] = React.useState([])
  const [title, setTitle] = React.useState("")
  const handleChange = (event) => setTitle(event.target.value)
  async function searchAnime(e) {
    e.preventDefault();

    const apolloClient = new ApolloClient({
      uri: "https://graphql.anilist.co",
      cache: new InMemoryCache()
    })
    const graphQlQuery = gql`
      query SearchAnime ($search: String!) {
        Page {
          media(search: $search type: ANIME isAdult: false) {
            id
            title {
              romaji
            }
            coverImage {
              medium
            }
            genres
            siteUrl
          }
        }
      }
    `

    const response = await apolloClient.query({
      query: graphQlQuery,
      variables: {
        search: title
      }
    });

    setAnimes(response.data.Page.media)

    console.log(response.data.Page.media);
  }
  
  return (
    <Stack
    as={Container}
    spacing={{ base: 8, md: 14 }}
    py={{ base: 20, md: 36 }}
    px={{ base: 10 }}
    maxW="6xl"
  >
    <Heading
      width="100%"
    >
      Search For an Anime!
    </Heading>
    <HStack>
      <Input
        value={title}
        onChange={handleChange}
        placeholder="Type an anime"
      />
      <Button onClick={searchAnime}>
        Search
      </Button>
    </HStack>
    {
      animes.map(anime => {
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
              <div style={{ flexGrow: 1 }}/>
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
  </Stack>
  );
};

export default SearchForm;
