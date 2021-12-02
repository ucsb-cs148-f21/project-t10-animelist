import * as React from 'react';
import { Block, BlockType } from "../../generated/graphql";
import SpacerBlockDisplay from './SpacerBlockDisplay';

interface Props {
  block: Block;
}

const ProfilePageBlock: React.FC<Props> = ({ block }) => {
  switch (block.type) {
    case BlockType.Spacer:
      return <SpacerBlockDisplay block={block} />;
    case BlockType.Statistics:
      return <StatisticsBlock block={block} />;
    case BlockType.Text:
      return <TextBlock block={block} />;
    case BlockType.UserList:
      return <UserListBlock block={block} />;
  }
}

export default ProfilePageBlock;