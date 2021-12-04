import * as React from 'react';
import { Box, Button, Flex, Heading, Image, Stack, Text, Link, VStack } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa';
import { useMeQuery } from '../generated/graphql';
import router from 'next/router';

const Home: React.FC<{}> = () => {
  const { data, } = useMeQuery();

  if (data && data.me) {
    router.push("/list");
    return (<div />);
  }

  return (
    <Stack
      height='full'
      direction={{ base: 'column', md: 'row' }}
      as={Box}
      textAlign="center"
      spacing={{ base: 8, md: 14 }}

    >
      <VStack
        flex={1}
        direction='column'
        spacing='2rem'
        py={{ base: 20, md: 36 }}
        px={{ base: 10 }}
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
      </VStack>

      <Flex flex={2}>
        <Image alt='Anime scenery' objectFit='cover'
          src={'/images/landing-page-dark.jpg'} />
      </Flex>
    </Stack>
  );
};

export default Home;
