import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { HStack, Text, VStack, Wrap } from '@chakra-ui/layout';
import * as React from 'react';
import { BlockType } from '../../generated/graphql';
import AddBlockOption from './AddBlockOption';
import { Button } from '@chakra-ui/button';

interface Props {
  isOpen: boolean,
  onClose: () => void
}

const AddBlockModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selected, setSelected] = React.useState(BlockType.UserList);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Profile Block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing='1rem' padding='0.5rem'>
            <Wrap spacing='12px'>
              <AddBlockOption type={BlockType.UserList} selected={selected} clickHandler={setSelected} />
              <AddBlockOption type={BlockType.Statistics} selected={selected} clickHandler={setSelected} />
              <AddBlockOption type={BlockType.Text} selected={selected} clickHandler={setSelected} />
              <AddBlockOption type={BlockType.Spacer} selected={selected} clickHandler={setSelected} />
            </Wrap>
            <Button colorScheme='blue'>Next</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddBlockModal;