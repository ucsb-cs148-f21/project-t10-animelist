import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import { use_UserListQuery } from '../../generated/graphql';

const ListPage: React.FC<{}> = () => {
  
  const router = useRouter();
  const { listId } = router.query
  const { data, loading } = use_UserListQuery({ variables: { listId: listId as string } });

  if (loading) {
    return (
      <div>Loading. . .</div>
    )
  }

  if (!data) {
    return (
      <div>Oops, no data!</div>
    )
  }

  return (
    <VStack py={{ base: 10 }} width="full">
      {
        data.userList.items.map(item => <div key={item.mediaID}>{ item.mediaID }: { item.watchStatus }</div>)
      }
    </VStack>
  );
};

export default ListPage;