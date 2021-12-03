import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { HStack, Text, VStack, Wrap } from '@chakra-ui/layout';
import * as React from 'react';
import { Block, BlockType, EmbeddedUserList, TextBlockInput, UserListBlockInput, Width } from '../../generated/graphql';
import AddBlockOption from './AddBlockOption';
import { Button } from '@chakra-ui/button';
import TextBlockModalForm from './TextBlockModalForm';
import UserListBlockModalForm from './UserListBlockModalForm';

interface Props {
  userLists: EmbeddedUserList[];
  isOpen: boolean;
  onClose: () => void;
  onBlockComplete: (block: Block) => void;
}

enum ModalStage {
  SelectType,
  AddBlockDetails,
  Done
}

const getModalTitle = (stage: ModalStage, blockType: BlockType) => {
  if (stage === ModalStage.AddBlockDetails) {
    switch (blockType) {
      case BlockType.Text:
        return "Add Details for Text Block";
      case BlockType.UserList:
        return "Add Details for User List Block";
    }
  } else {
    return "Add Profile Block";
  }
}

const AddBlockModal: React.FC<Props> = ({ userLists, isOpen, onClose, onBlockComplete }) => {
  const resetState = () => {
    setModalStage(ModalStage.SelectType);
    setBlock({
      type: BlockType.UserList,
      width: Width.Full
    });
  }

  const getModalBody = () => {
    if (modalStage === ModalStage.SelectType) {
      return (
        <VStack spacing='1rem' padding='0.5rem'>
          <Wrap spacing='12px'>
            <AddBlockOption type={BlockType.UserList} selected={block.type} setBlock={setBlock} />
            <AddBlockOption type={BlockType.Statistics} selected={block.type} setBlock={setBlock} />
            <AddBlockOption type={BlockType.Text} selected={block.type} setBlock={setBlock} />
            <AddBlockOption type={BlockType.Spacer} selected={block.type} setBlock={setBlock} />
          </Wrap>
          <Button colorScheme='blue' onClick={() => setModalStage(ModalStage.AddBlockDetails)}>
            Next
          </Button>
        </VStack>
      );
    } else if (modalStage === ModalStage.AddBlockDetails) {
      switch (block.type) {
        case BlockType.Text:
          return <TextBlockModalForm
            onBack={() => setModalStage(ModalStage.SelectType)}
            onNext={(input: TextBlockInput) => {
                setBlock(prevBlock => {
                  return {...prevBlock, textBlockInput: input}
                })
                setModalStage(ModalStage.Done);
            }} />;
        case BlockType.UserList:
          return <UserListBlockModalForm 
            userLists={userLists}
            onBack={() => setModalStage(ModalStage.SelectType)}
            onNext={(input: UserListBlockInput) => {
              setBlock(prevBlock => {
                return {...prevBlock, userListBlockInput: input}
              })
              setModalStage(ModalStage.Done);
            }} />;
      }
    }
  }

  const [modalStage, setModalStage] = React.useState(ModalStage.SelectType);
  const [block, setBlock] = React.useState({
    type: BlockType.UserList,
    width: Width.Full
  });

  React.useEffect(() => {
    if (modalStage === ModalStage.Done) {
      onClose();
      onBlockComplete(block);
      resetState();
    }
  }, [modalStage]);

  // check if block type doesn't require any additional details. if so, skip the
  // additional details stage and go to the done stage
  if (modalStage === ModalStage.AddBlockDetails &&
    [BlockType.Spacer, BlockType.Statistics].includes(block.type)) {

    setModalStage(ModalStage.Done);
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {onClose(); resetState();}} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{getModalTitle(modalStage, block.type)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {getModalBody()} 
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddBlockModal;