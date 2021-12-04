import * as React from 'react';
import { Box, Button, Flex, Heading, Image, Stack, Text, Link, VStack, ButtonGroup, useColorModeValue } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa';
import { useMeQuery } from '../generated/graphql';
import router from 'next/router';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

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
          <Text
            as='span'
            position='relative'
            _after={{
              content: "''",
              width: 'full',
              height: '10%',
              position: 'absolute',
              bottom: -1.5,
              left: 0,
              bg: useColorModeValue('blue.100', 'blue.700'),
              zIndex: -1,
            }}
          >
            T10 - Anime List
          </Text>
        </Heading>

        <Text>
          Welcome to your personalized anime list experience!
          Track your favorite animes and the ones you've been planning to watch,
          using a highly customizable rating system and a profile page where you can
          show off your taste.
        </Text>

        <ButtonGroup variant="outline">
          <Link href="/signup">
            <Button colorScheme='blue' variant='solid'>
              Sign up
            </Button>
          </Link>
          <Link href="/login">
            <Button colorScheme='blue'>
              Login
            </Button>
          </Link>
        </ButtonGroup>

        <ColorModeSwitcher />
      </VStack>

      <Flex flex={2}>
        <Image alt='Anime scenery' objectFit='cover'
          src={useColorModeValue('images/landing-page-light.jpg', '/images/landing-page-dark.jpg')} />
      </Flex>
    </Stack>
  );
};

export default Home;
