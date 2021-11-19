import { Center, Spinner, Heading, Container, Stack } from "@chakra-ui/react";
import * as React from 'react';
import CreateRatingSystemForm from "../components/ratingsystem/CreateRatingSystemForm";
import { useMeQuery } from '../generated/graphql';
import { useRouter } from "next/router";

const CreateRatingSystem: React.FC<{}> = () => {

  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading) { 
    return (
      <Center
        flexGrow={1}
      >
        <Spinner />
      </Center>
    );
  }

  if (!data || !data.me) {
    router.push("/login");

    return (<div />);
  }

  return (
    <Stack
      as={Container}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 20 }}
      maxWidth="3xl"
    >
      <Heading>
        Create Your Own Rating System
      </Heading>
      <CreateRatingSystemForm/>
    </Stack>
  );
};

export default CreateRatingSystem;