import * as React from 'react';
import UserList from '../list/UserList';
import { UserListBlock } from '../../generated/graphql';

interface Props {
  block: UserListBlock;
}

const UserListBlockDisplay: React.FC<Props> = ({ block }) => {
  return (
    <UserList userlist={block.additionalData.userList} isOwn={false} fullSize={false} />
  );
}

export default UserListBlockDisplay;