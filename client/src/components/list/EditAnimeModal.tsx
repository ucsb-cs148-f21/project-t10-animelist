import * as React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
  } from "@chakra-ui/react"
import { UserListEntryExtended } from "./UserListRow";;

interface EditAnimeModalProps{
	entryData: UserListEntryExtended,
	isOpen: boolean,
	onClose: () => void
}

const EditAnimeModal: React.FC<EditAnimeModalProps> = ({entryData, isOpen, onClose}) =>{
	return(
		<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
			  hello
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} >
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
	)
}


export default EditAnimeModal;
