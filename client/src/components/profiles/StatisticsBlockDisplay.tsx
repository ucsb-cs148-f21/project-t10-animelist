import { Box } from '@chakra-ui/layout';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import * as React from 'react';
import { StatisticsBlock } from '../../generated/graphql';

interface Props {
  block: StatisticsBlock;
}

const StatisticsBlockDisplay: React.FC<Props> = ({ block }) => {
  return (
    <Box w="100%">
      <Stat>
        <StatLabel>Media Entries</StatLabel>
        <StatNumber>{block.additionalData.entries}</StatNumber>
        <StatHelpText>Unique entries across all lists</StatHelpText>
      </Stat>
    </Box> 
  );
}

export default StatisticsBlockDisplay;