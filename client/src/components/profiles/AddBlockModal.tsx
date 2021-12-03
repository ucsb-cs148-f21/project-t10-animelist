import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { HStack, Text, Wrap } from '@chakra-ui/layout';
import * as React from 'react';
import { BlockType } from '../../generated/graphql';
import AddBlockOption from './AddBlockOption';

interface Props {
  isOpen: boolean,
  onClose: () => void
}

const AddBlockModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Profile Block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Wrap spacing='12px'>
            <AddBlockOption type={BlockType.UserList} />
            <AddBlockOption type={BlockType.Statistics} />
            <AddBlockOption type={BlockType.Text} />
            <AddBlockOption type={BlockType.Spacer} />
          </Wrap>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddBlockModal;