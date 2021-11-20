import {
  Button, Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack,
  Table, Tbody,
  Td, Th, Thead,
  Tr
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { RatingSystem, use_UpdateUserListItemMutation, WatchStatus } from "../../generated/graphql";
import { IListItem } from "./_UserList";
;

interface EditAnimeModalProps {
  // ratingSystem: RatingSystem,
  ratingSystem: RatingSystem,
  item: IListItem,
  isOpen: boolean,
  onClose: () => void,
  onSave: (item: IListItem) => void
}

const EditAnimeModal: React.FC<EditAnimeModalProps> = ({ ratingSystem, item, isOpen, onClose, onSave }) => {
  const [updateListItem] = use_UpdateUserListItemMutation();
  const formik = useFormik({
    initialValues: item,
    onSubmit: async (submittedListItem) => {
      await updateListItem({
        variables: {
          input: {
            listId: submittedListItem.listId,
            mediaID: submittedListItem.id,
            watchStatus: submittedListItem.watchStatus as WatchStatus,
            subRatings: submittedListItem.rating ? submittedListItem.rating.subRatings.map(subRating => ({ id: subRating.id, rating: subRating.rating })) : null
          }
        }
      })
      onSave(submittedListItem)
    }
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {item.title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Select id="watchStatus" {...formik.getFieldProps("watchStatus")}>
              <option value={WatchStatus.PlanToWatch}>Plan to watch</option>
              <option value={WatchStatus.Completed}>Completed</option>
            </Select>
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
                      <Td><Input initialValue={item.rating ? item.rating.subRatings.at(index).displayRating : "-"} /></Td>
                    </Tr>
                  )
                  )
                }
              </Tbody>
            </Table>
            Score: {item.rating ? item.rating.displayRating : "-"}
          </ModalBody>

          <ModalFooter>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditAnimeModal;
