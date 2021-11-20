import { Tr, Td, Badge, Icon, Button, Image } from '@chakra-ui/react';
import * as React from 'react';
import { BsDash } from 'react-icons/bs';
import { IListItem } from './_UserList';

export interface UserListEntryProps {
  item: IListItem;
  canEdit: boolean;
}

const UserListEntry: React.FC<UserListEntryProps> = ({ item, canEdit }) => {
  return (
    <Tr>
      <Td><Image src={item.coverImage} minWidth="67px" width="67px" height="100px" objectFit="cover" /></Td>
      <Td>{item.title}</Td>
      <Td><Badge>{item.watchStatus}</Badge></Td>
      <Td>{item.rating ? item.rating.displayRating : <Icon as={BsDash} />}</Td>
      { canEdit && <Td><Button>Edit</Button></Td> }
    </Tr>
  );
};

export default UserListEntry;