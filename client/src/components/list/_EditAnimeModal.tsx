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
import {RatingSystem} from "../../generated/graphql";

interface EditAnimeModalProps{
    // ratingSystem: RatingSystem,
	// entryData: UserListEntryExtended,
	isOpen: boolean,
	onClose: () => void
}

const EditAnimeModal: React.FC<EditAnimeModalProps> = ({isOpen, onClose}) =>{
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>hi</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
              Test
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
	);
}

export default EditAnimeModal;
