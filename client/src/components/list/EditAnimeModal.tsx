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
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  } from "@chakra-ui/react"
import { UserListEntryExtended } from "./UserListRow";import { useFormik } from "formik";
import EditAnimeModalForm from "./EditAnimeModalForm";
;

interface EditAnimeModalProps{
	entryData: UserListEntryExtended,
	isOpen: boolean,
	onClose: () => void
}

const EditAnimeModal: React.FC<EditAnimeModalProps> = ({entryData, isOpen, onClose}) =>{
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{entryData.title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <EditAnimeModalForm entryData={entryData} />
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
	);
}

export default EditAnimeModal;
