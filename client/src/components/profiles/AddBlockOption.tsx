import { ArrowUpDownIcon, HamburgerIcon, Icon, InfoIcon } from '@chakra-ui/icons';
import { Box, Center, Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { Block, BlockType } from '../../generated/graphql';
import { CgSpaceBetweenV } from 'react-icons/cg';
import { IoIosStats, IoMdText} from 'react-icons/io';
import { BsListUl } from 'react-icons/bs';
import { Button } from '@chakra-ui/button';

const ICON_BOX_SIZE = '4em';

interface Props {
  type: BlockType;
  selected?: BlockType;
  setBlock: (func: (prevBlock: Block) => Block) => void;
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

const AddBlockOption: React.FC<Props> = ({ type, selected, setBlock}) => {
  const handleClick = () => {
    setBlock(prevBlock => {
      return {
        ...prevBlock,
        type: type
      };
    });
  }

  const [icon, label] = getInfoFor(type);

  return (
    <Button onClick={handleClick}
      colorScheme='blue' borderWidth='1px' borderRadius='xl' minWidth='250px'
      variant={(type === selected) ? 'solid' : 'ghost'}
      size='xl' padding={6} >

        <VStack>
          {icon}
          <Text fontSize='xl'>{label}</Text>
        </VStack>

    </Button>
  )
}

export default AddBlockOption;