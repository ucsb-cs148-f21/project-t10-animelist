import {
  Button, ButtonGroup, FormControl, FormLabel, Heading, Image, Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody,
  Td, Th, Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as React from "react";
import { use_UpdateUserListItemMutation, WatchStatus } from "../../generated/graphql";
import { IListItem } from "./_UserList";
;

interface EditAnimeModalProps {
  item: IListItem,
  isOpen: boolean,
  onClose: () => void,
  onSave: (item: IListItem) => void
}

const EditAnimeModal: React.FC<EditAnimeModalProps> = ({ item, isOpen, onClose, onSave }) => {
  const [updateListItem] = use_UpdateUserListItemMutation();
  const toast = useToast();
  const formik = useFormik({
    initialValues: item,
    onSubmit: async (submittedListItem) => {
      const { data, errors } = await updateListItem({
        variables: {
          input: {
            listId: submittedListItem.listId,
            mediaID: submittedListItem.id,
            watchStatus: submittedListItem.watchStatus as WatchStatus,
            subRatings: submittedListItem.rating ? submittedListItem.rating.subRatings.map(subRating => ({ id: subRating.id, rating: subRating.rating })) : null
          }
        }
      });
      if (data) {
        onSave(submittedListItem)
        onClose()
        toast({ position: "top", status: "success", title: "Success" })
      } else {
        toast({ position: "top", status: "error", title: "Error" })
      }
    }
  });

  return (
    <Modal isCentered isOpen={isOpen} size={"xl"} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader padding="0 0 0 0">
          <Image src={item.bannerImage} borderRadius="5px 5px 0px 0px" height="150px" width="100%" objectFit="cover" />
          <Heading padding="1rem">{item.title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Watch Status</FormLabel>
              <Select id="watchStatus" {...formik.getFieldProps("watchStatus")}>
                <option value={WatchStatus.PlanToWatch}>Plan to watch</option>
                <option value={WatchStatus.Completed}>Completed</option>
              </Select>
            </FormControl>
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
                  item.ratingSystem.subRatings.map((subRating, index) => (
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
            <ButtonGroup>
              <Button variant="outline" colorScheme="red">Delete</Button>
              <Button type="submit" colorScheme="green" isLoading={formik.isSubmitting}>Save</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditAnimeModal;
