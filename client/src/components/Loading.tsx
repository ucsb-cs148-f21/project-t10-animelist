import { Stack, Center, Spinner } from '@chakra-ui/react';
import * as React from 'react';

const Loading: React.FC<{}> = () => {
  return (
    <Stack
    height="100vh"
    alignItems="center"
  >
    <Center
      flexGrow={1}
    >
      <Spinner />
    </Center>
  </Stack>
  );
};

export default Loading;