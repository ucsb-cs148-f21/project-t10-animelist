import * as React from "react";
import Icon from "@chakra-ui/icon";
import { BsDash } from "react-icons/bs";
import { Td, Tr } from "@chakra-ui/table";
import { UserListEntry } from "../../generated/graphql";
import { Avatar, Button,} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import EditAnimeModal from "./EditAnimeModal";

interface UserListEntryExtended extends UserListEntry {
  title: string,
  coverImage: string
}

interface UserListRowProps {
  entryData: UserListEntryExtended;
}

const UserListRow: React.FC<UserListRowProps> = ({ entryData }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState("md")

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }
  return (
    <>
      <Tr>
        <Td>{entryData.title}</Td>
        <Td>{entryData.rated ? entryData.rating : <Icon as={BsDash} />}</Td>
        <Button onClick={onOpen}> Edit </Button>
      </Tr>
        <EditAnimeModal entryData={entryData} isOpen={isOpen} onClose={onClose} />
    </>
  )
;}

export default UserListRow;
export type {UserListEntryExtended};