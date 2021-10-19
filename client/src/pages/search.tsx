import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import * as React from 'react';

const Search: React.FC<{}> = () => {
  const [animes, setAnimes] = React.useState([ 
    { id: 1, title: { romaji: "Your Name" } },  
    { id: 2, title: { romaji: "Violet Evergarden" } },
    { id: 3, title: { romaji: "Ergo Proxy" } }
  ])
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
          media(search: $search type: ANIME) {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
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

    console.log(response);
  }


  return (
    <Stack
      as={Box}
      textAlign="center"
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
      px={{ base: 10 }}
      maxW="3xl"
    >
      <Heading>
        Search For an Anime!
      </Heading>
      <Input
        value={title}
        onChange={handleChange}
        placeholder="Type an anime"
      />
      <Button onClick={searchAnime}>
        Search
      </Button>
      {
        animes.map(anime => {
          return (
            <Text>{anime.title.romaji}</Text>
          )
        })
      }
    </Stack>
  );
};

export default Search;
