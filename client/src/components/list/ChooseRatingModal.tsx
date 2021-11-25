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
import ChooseRatingModalForm from "./ChooseRatingModalForm";

interface ChooseRatingModalProps{
    //entryData: 
	isOpen: boolean,
	onClose: () => void
}

const ChooseRatingModal: React.FC<ChooseRatingModalProps> = ({isOpen, onClose}) =>{
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Your Rating Systems </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <ChooseRatingModalForm/>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
	);
}

export default ChooseRatingModal;