import * as React from 'react';
import { Box, Button, Heading, Stack, Text, Link } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa';
import { useMeQuery } from '../generated/graphql';
import router from 'next/router';
import { Input } from "@chakra-ui/react";

const Search: React.FC<{}> = () => {

  const [title, setTitle] = React.useState("")
  const handleChange = (event) => setTitle(event.target.value)

  function handleClick(e) {
    e.preventDefault();
    console.log(title);
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
        value = {title}
        onChange = {handleChange}
        placeholder="Type an anime"
      />
      <Button onClick={handleClick}>
          Search
      </Button>
    </Stack>
  );
};

export default Search;
