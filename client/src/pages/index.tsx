import * as React from 'react';
import { Box, Button, Heading, Stack, Text, Link } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa';

const Home: React.FC<{}> = () => {

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
        cs148-helloworld
      </Heading>
      <Text>
        This is my hello world web app for cs148 animelist team.
      </Text>
      <Stack
        direction={'column'}
        align={'center'}
      >
        <Button as="a" href="https://github.com/jvoucsb/cs148-helloworld" leftIcon={<FaGithub />}>
          GitHub
        </Button>
      </Stack>
    </Stack>
  );
};

export default Home;
