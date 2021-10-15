import { VStack } from '@chakra-ui/react';
import router from 'next/router';
import * as React from 'react';
import UserList from '../components/list/UserList';
import Loading from '../components/Loading';
import { useMeQuery } from '../generated/graphql';

const List: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return (<Loading />);
  }

  if (!data || !data.me) {
    router.push("/login");
    return (<div />);
  }

  return (
    <VStack
      py={{ base: 20, md: 36 }}
      width="full"
    >
      <UserList user={data.me} />
    </VStack>
  );
};

export default List;