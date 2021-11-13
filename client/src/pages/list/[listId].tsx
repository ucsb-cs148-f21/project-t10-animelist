import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import UserList from '../../components/list/_UserList';
import { use_UserListQuery } from '../../generated/graphql';

const ListPage: React.FC<{}> = () => {
  
  const router = useRouter();
  const { listId } = router.query
  const { data, loading } = use_UserListQuery({ variables: { listId: listId as string } });

  if (loading) {
    return (
      <div/>
    )
  }

  if (!data) {
    return (
      <div>Oops, no data!</div>
    )
  }

  return (
    <VStack py={{ base: 10 }} width="full">
      <UserList userlist={data.userList}/>
    </VStack>
  );
};

export default ListPage;