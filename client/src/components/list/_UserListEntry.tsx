import { Tr, Td, Badge, Icon, Button, Image, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import { BsDash } from 'react-icons/bs';
import _EditAnimeModal from './_EditAnimeModal';
import { IListItem } from './_UserList';

export interface UserListEntryProps {
  item: IListItem;
  canEdit: boolean;
}

const UserListEntry: React.FC<UserListEntryProps> = ({ item, canEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Tr>
      <Td><Image src={item.coverImage} minWidth="67px" width="67px" height="100px" objectFit="cover" /></Td>
      <Td>{item.title}</Td>
      <Td><Badge>{item.watchStatus}</Badge></Td>
      <Td>{item.rating ? item.rating.displayRating : <Icon as={BsDash} />}</Td>
      { canEdit && <Td><Button onClick={onOpen}>Edit</Button></Td> }
      <_EditAnimeModal isOpen={isOpen} onClose={onClose}/>
    </Tr>
  );
};

export default UserListEntry;