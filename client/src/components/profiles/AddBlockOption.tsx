import { ArrowUpDownIcon, HamburgerIcon, Icon, InfoIcon } from '@chakra-ui/icons';
import { Box, Center, Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { BlockType } from '../../generated/graphql';
import { CgSpaceBetweenV } from 'react-icons/cg';
import { IoIosStats, IoMdText} from 'react-icons/io';
import { BsListUl } from 'react-icons/bs';

const ICON_BOX_SIZE = '4em';

interface Props {
  type: BlockType;
}

const getInfoFor = (type: BlockType) => {
  switch (type) {
    case BlockType.Spacer:
      return [<Icon as={CgSpaceBetweenV} boxSize={ICON_BOX_SIZE} />, "Spacer"];
    case BlockType.Statistics:
      return [<Icon as={IoIosStats} boxSize={ICON_BOX_SIZE} />, "Statistics"];
    case BlockType.Text:
      return [<Icon as={IoMdText} boxSize={ICON_BOX_SIZE} />, "Text"];
    case BlockType.UserList:
      return [<Icon as={BsListUl} boxSize={ICON_BOX_SIZE} />, "List"];
  }
}

const AddBlockOption: React.FC<Props> = ({ type }) => {
  const [icon, label] = getInfoFor(type);

  return (
    <Center borderWidth='1px' borderRadius='xl' minWidth='250px' width='250px'
      padding='16px'>

      <VStack>
        {icon}
        <Text fontSize='xl'>{label}</Text>
      </VStack>

    </Center>
  )
}

export default AddBlockOption;