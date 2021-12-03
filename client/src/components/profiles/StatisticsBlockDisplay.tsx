import { Box } from '@chakra-ui/layout';
import { Stat, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import * as React from 'react';
import { StatisticsBlock } from '../../generated/graphql';

interface Props {
  block: StatisticsBlock;
}

const StatisticsBlockDisplay: React.FC<Props> = ({ block }) => {
  return (
    <Box w="100%">
      <StatGroup>
        <Stat>
          <StatLabel fontSize='md'>Media Entries</StatLabel>
          <StatNumber>{block.additionalData.entries}</StatNumber>
          <StatHelpText>Unique entries across all lists</StatHelpText>
        </Stat>
      </StatGroup>
    </Box> 
  );
}

export default StatisticsBlockDisplay;