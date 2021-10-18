import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import * as React from 'react';

const Search: React.FC<{}> = () => {

  const [title, setTitle] = React.useState("")
  const handleChange = (event) => setTitle(event.target.value)
  async function searchAnime(e) {
    e.preventDefault();

    const apolloClient = new ApolloClient({
      uri: "https://graphql.anilist.co",
      cache: new InMemoryCache()
    })
    const graphQlQuery = gql`
      query {
        Media(search: "${title}") {
          id
          title {
            romaji
          }
          coverImage {
            medium
          }
        }
      }
    `

    const data = await apolloClient.query({
      query: graphQlQuery
    });

    console.log(data);
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
    </Stack>
  );
};

export default Search;
