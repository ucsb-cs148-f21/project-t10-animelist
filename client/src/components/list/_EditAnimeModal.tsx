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
  Badge,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react"
import { UserListEntryExtended } from "./UserListRow"; import { useFormik } from "formik";
import EditAnimeModalForm from "./EditAnimeModalForm";
;
import { RatingSystem, use_UpdateUserListItemMutation } from "../../generated/graphql";
import { IListItem } from "./_UserList";

interface EditAnimeModalProps {
  // ratingSystem: RatingSystem,
  ratingSystem: RatingSystem,
  item: IListItem,
  isOpen: boolean,
  onClose: () => void
}

const EditAnimeModal: React.FC<EditAnimeModalProps> = ({ ratingSystem, item, isOpen, onClose }) => {
  // const [updateUserListItem] = use_UpdateUserListItemMutation();
  // const formik = useFormik({
  //   initialValues: {
      
  //   },
  //   onSubmit: async values => {
  //     const updatedEntry: UserListEntryInput = {
  //       mediaID: entryData.mediaID,
  //       rated: (values.score !== ''),
  //       rating: (values.score !== '') ? Number(values.score) : 0
  //     };
  //     await updateUserListEntry({
  //       variables: {
  //         input: updatedEntry
  //       }
  //     });
  //     window.location.reload();
  //   }
  // });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {item.title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          Score: {item.rating ? item.rating.displayRating: "-"}
          <Stack>
            <Table>
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th>Weight</Th>
                  <Th>Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  ratingSystem.subRatings.map((subRating, index) => (
                    <Tr>
                      <Td>{subRating.name}</Td>
                      <Td>{subRating.weight}</Td>
                      <Td>{item.rating ? item.rating.subRatings.at(index).displayRating: "-"}</Td>
                    </Tr>
                  )
                  )
                }
              </Tbody>
            </Table>
            <Button>Save</Button>
          </Stack>
        </ModalBody>

        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditAnimeModal;
