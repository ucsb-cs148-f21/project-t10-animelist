import { Box, Text } from '@chakra-ui/layout';
import * as React from 'react';
import { TextBlock } from '../../generated/graphql';

interface Props {
  block: TextBlock;
}

const TextBlockDisplay: React.FC<Props> = ({ block }) => {
  return (
    <Box w='100%'>
      <Text whiteSpace='pre-wrap'>
        {block.textBlockInput.text}
      </Text>
    </Box>
  )
}

export default TextBlockDisplay;