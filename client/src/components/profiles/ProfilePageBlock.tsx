import { Box } from '@chakra-ui/layout';
import * as React from 'react';
import { Block, BlockType, SpacerBlock, StatisticsBlock, TextBlock, UserListBlock } from "../../generated/graphql";
import SpacerBlockDisplay from './SpacerBlockDisplay';
import StatisticsBlockDisplay from './StatisticsBlockDisplay';
import TextBlockDisplay from './TextBlockDisplay';
import UserListBlockDisplay from './UserListBlockDisplay';

interface Props {
  block: Block;
}

const ProfilePageBlock: React.FC<Props> = ({ block }) => {
  let displayedBlock;

  switch (block.type) {
    case BlockType.Spacer:
      displayedBlock = <SpacerBlockDisplay block={block as SpacerBlock} />;
      break;
    case BlockType.Statistics:
      displayedBlock = <StatisticsBlockDisplay block={block as StatisticsBlock} />;
      break;
    case BlockType.Text:
      displayedBlock = <TextBlockDisplay block={block as TextBlock} />;
      break;
    case BlockType.UserList:
      displayedBlock = <UserListBlockDisplay block={block as UserListBlock} />;
      break;
  }

  return (
    <Box p={6}
      borderWidth={(block.type !== BlockType.Spacer) ? '1px' : '0'}
      borderRadius='md'>

      {displayedBlock}

    </Box>
  );
}

export default ProfilePageBlock;