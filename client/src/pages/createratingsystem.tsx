import { Heading, Container, Stack } from "@chakra-ui/react";
import * as React from 'react';
import CreateRatingSystemForm from "../components/ratingsystem/CreateRatingSystemForm";

const CreateRatingSystem: React.FC<{}> = () => {

  return (
    <Stack
      as={Container}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 20 }}
      maxWidth="3xl"
    >
      <Heading>
        Create a Rating System
      </Heading>
      <CreateRatingSystemForm/>
    </Stack>
  );
};

export default CreateRatingSystem;