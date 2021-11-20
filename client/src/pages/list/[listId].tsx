import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import UserList from '../../components/list/_UserList';
import { useMeQuery, use_UserListQuery } from '../../generated/graphql';

const ListPage: React.FC<{}> = () => {
  
  const router = useRouter();
  const { listId } = router.query
  const { data: meData } = useMeQuery();
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
      <UserList userlist={data.userList} isOwn={meData && meData.me && meData.me.id == data.userList.ownerId}/>
    </VStack>
  );
};

export default ListPage;