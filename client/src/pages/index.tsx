import * as React from 'react';
import { Box, Button, Flex, Heading, Image, Stack, Text, Link, VStack, ButtonGroup, useColorModeValue, Icon } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa';
import { useMeQuery } from '../generated/graphql';
import router from 'next/router';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { BsPencil } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { IoIosShare, IoMdSettings } from 'react-icons/io';

interface FeatureCardProps {
  icon: IconType;
  label: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, label, children }) => (
  <Box borderWidth='1px' borderRadius='xl'
    padding={{ base: 4 }}
    margin={{ base: 1, md: 2 }}
    flex={1}
  >
    <Icon as={icon} boxSize='3rem' marginBottom={2} />
    <Text fontSize='xl' fontWeight='semibold'>{label}</Text>
    <Text>{children}</Text>
  </Box>
)

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
      spacing={0}
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

        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems='stretch'
          justifyContent='space-between'
        >
          <FeatureCard icon={BsPencil} label='Track'>Keep track of your anime history.</FeatureCard>
          <FeatureCard icon={IoMdSettings} label='Customize'>Shape your experience exactly how you want it.</FeatureCard>
          <FeatureCard icon={IoIosShare} label='Share'>Share your profile with friends.</FeatureCard>
        </Flex>

        <ColorModeSwitcher />
      </VStack>

      <Flex flex={2} mx={0} position='relative'>
        <Image alt='Anime scenery' objectFit='cover'
          src={useColorModeValue('images/landing-page-light.jpg', '/images/landing-page-dark.jpg')} />
        <Text position='absolute' bottom={1} right={1}
          padding={1}
          backgroundColor={useColorModeValue('gray.400', 'gray.800')}>
          Image &copy; {useColorModeValue('Studio Ghibli, Inc.', 'CoMix Wave Films, Inc.')}
        </Text>
      </Flex>
    </Stack>
  );
};

export default Home;
