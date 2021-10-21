import { gql } from "@apollo/client";
import { Button, Heading, HStack, Input, Spinner, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as React from 'react';
import { createApolloAnilist } from "../../utils/createApolloAnilist";
import SearchList from "../list/SearchList";

const SearchForm: React.FC<{}> = () => {
  const [animes, setAnimes] = React.useState([])
  const formik = useFormik({
    initialValues: {
      title: ""
    },
    onSubmit: async ({ title }) => {
      await searchAnime(title);
    }
  });

  async function searchAnime(title) {
    const apolloClient = createApolloAnilist();
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

    const { data } = await apolloClient.query({
      query: graphQlQuery,
      variables: {
        search: title
      }
    });

    const medias = data.Page.media;

    setAnimes(medias);
  }

  return (
    <Stack
      spacing={{ base: 8 }}
    >
      <Heading>
        Search For an Anime!
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <HStack>
          <Input id="title" {...formik.getFieldProps("title")} autoComplete="off" placeholder="Type an anime" />
          <Button type="submit" isLoading={formik.isSubmitting}>
            Search
          </Button>
        </HStack>
      </form>
      {formik.isSubmitting ? <Spinner alignSelf="center" /> : <SearchList medias={animes} />}
    </Stack>
  );
};

export default SearchForm;
