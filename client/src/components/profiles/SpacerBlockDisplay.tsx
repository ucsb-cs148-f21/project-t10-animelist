import { Box } from '@chakra-ui/layout';
import * as React from 'react';
import { SpacerBlock } from '../../generated/graphql';

const SPACER_HEIGHT = 20;

interface Props {
  block: SpacerBlock;
}

const SpacerBlockDisplay: React.FC<Props> = ({ block }) => {
  return <Box w='100%' h={SPACER_HEIGHT} />;
}

export default SpacerBlockDisplay;