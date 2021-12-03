import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Text } from '@chakra-ui/layout';
import * as React from 'react';

interface Props {
  isOpen: boolean,
  onClose: () => void
}

const AddBlockModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Profile Block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>hello world</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddBlockModal;