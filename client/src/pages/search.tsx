import { Container } from "@chakra-ui/react";
import * as React from 'react';
import SearchForm from '../components/forms/SearchForm';


const Search: React.FC<{}> = () => {
  return (
    <Container
      py={{ base: 10 }}
      px={{ base: 10, xl: 0 }}
      width="full"
      maxW="6xl"
    >
      <SearchForm />
    </Container>
  );
};

export default Search;
