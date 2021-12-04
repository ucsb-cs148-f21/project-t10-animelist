import { Heading, VStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import UserList, { ListOwnerBar } from '../../components/list/UserList';
import { useMeQuery, use_UserListQuery } from '../../generated/graphql';

const ListPage: React.FC<{}> = () => {

  const router = useRouter();
  const { listId } = router.query
  const { data: meData } = useMeQuery();
  const { data, loading } = use_UserListQuery({ variables: { listId: listId as string } });

  if (loading) {
    return (
      <div />
    )
  }

  if (!data) {
    return (
      <div>Oops, no data!</div>
    )
  }

  if (!data.userList.items || data.userList.items.length == 0) {
    return (
      <VStack py={{ base: 10 }} width="full" maxWidth="6xl">
        <Heading>{ data.userList.name }</Heading>
        <ListOwnerBar addedIds={new Set(data.userList.items.map(item => item.mediaID))} userlist={data.userList}/>
        <Text>You have no items, yet! :(</Text>
      </VStack>
    );
  }

  return (
    <VStack py={{ base: 10 }} width="full" maxWidth="6xl">
      <UserList userlist={data.userList}
        isOwn={meData && meData.me && meData.me.id == data.userList.ownerId} 
        fullSize={true} />
    </VStack>
  );
};

export default ListPage;