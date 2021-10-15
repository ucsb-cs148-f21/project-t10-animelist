import * as React from 'react';
import { Box, Button, Heading, Stack, Text, Link } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa';
import { useMeQuery } from '../generated/graphql';
import router from 'next/router';

const Home: React.FC<{}> = () => {
  const { data, } = useMeQuery();

  if (data.me) {
    router.push("/list");
    return (<div />);
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
        Anime List App
      </Heading>
      <Text>
        This is the current anime list web app (currently in development) for team 10 in CS148-F21
      </Text>
      <Stack
        direction={'column'}
        align={'center'}
      >
        <Button as="a" href="https://github.com/ucsb-cs148-f21/project-t10-animelist" leftIcon={<FaGithub />}>
          GitHub
        </Button>
      </Stack>
    </Stack>
  );
};

export default Home;
