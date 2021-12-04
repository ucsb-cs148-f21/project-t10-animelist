import { Tr, Td, Badge, Icon, Button, Image, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import { BsDash } from 'react-icons/bs';
import { ContinuousRatingSystem, DiscreteRatingSystem, RatingSystem, WatchStatus } from '../../generated/graphql';
import EditAnimeModal from './EditAnimeModal';
import { IListItem } from './UserList';

export interface UserListItemProps {
  item: IListItem;
  canEdit: boolean;
  showImage: boolean;
}

const badgeFor = (watchStatus: WatchStatus) => {
  switch(watchStatus) {
    case WatchStatus.PlanToWatch:
      return <Badge colorScheme="cyan">Plan to watch</Badge>
    case WatchStatus.Watching:
      return <Badge colorScheme="yellow">Watching</Badge>
    case WatchStatus.OnHold:
      return <Badge colorScheme="orange">On hold</Badge>
    case WatchStatus.Dropped:
      return <Badge colorScheme="red">Dropped</Badge>
    case WatchStatus.Completed:
      return <Badge colorScheme="green">Completed</Badge>
    default:
      return <Badge>watchStatus</Badge>
  }
}

const UserListItem: React.FC<UserListItemProps> = ({ item: initialItem, canEdit, showImage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [item, changeItemState] = React.useState<IListItem>(initialItem);


  return (
    <Tr>
      {showImage && <Td><Image src={item.coverImage} minWidth="67px" width="67px" height="100px" objectFit="cover" /></Td>}
      <Td>{item.title}</Td>
      <Td display={{ base: "none", md: "table-cell" }}>{badgeFor(item.watchStatus as WatchStatus)}</Td>
      <Td>{item.rating ? item.rating.displayRating : <Icon as={BsDash} />}</Td>
      { canEdit && <Td><Button onClick={onOpen}>Edit</Button><EditAnimeModal item={item} isOpen={isOpen} onClose={onClose} onSave={changeItemState}/></Td> }
    </Tr>
  );
};

export default UserListItem;