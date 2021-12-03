import * as React from 'react';
import { Block, BlockType, SpacerBlock, StatisticsBlock, TextBlock, UserListBlock } from "../../generated/graphql";
import SpacerBlockDisplay from './SpacerBlockDisplay';
import StatisticsBlockDisplay from './StatisticsBlockDisplay';

interface Props {
  block: Block;
}

const ProfilePageBlock: React.FC<Props> = ({ block }) => {
  switch (block.type) {
    case BlockType.Spacer:
      return <SpacerBlockDisplay block={block as SpacerBlock} />;
    case BlockType.Statistics:
      return <StatisticsBlockDisplay block={block as StatisticsBlock} />;
    case BlockType.Text:
      return <TextBlockDisplay block={block as TextBlock} />;
    case BlockType.UserList:
      return <UserListBlockDisplay block={block as UserListBlock} />;
  }
}

export default ProfilePageBlock;