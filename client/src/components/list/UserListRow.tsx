import * as React from "react";
import Icon from "@chakra-ui/icon";
import { BsDash } from "react-icons/bs";
import { Td, Tr } from "@chakra-ui/table";
import { UserListEntry } from "../../generated/graphql";
import { Button } from "@chakra-ui/react";
import { useDisclosure, Image } from "@chakra-ui/react"
import EditAnimeModal from "./EditAnimeModal";

interface UserListEntryExtended extends UserListEntry {
  title: string,
  coverImage: string
}

interface UserListRowProps {
  entryData: UserListEntryExtended,
  ref?: (node: any) => void
}

/**
 * Represents a single row in a user's list. Takes a UserListEntryExtended
 * object describing the entry, which contains the data from the database
 * plus the title and other data fetched from Anilist API.
 */
const UserListRow = React.forwardRef<HTMLTableRowElement, UserListRowProps>(({ entryData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Tr ref={ref}>
      <Td><Image src={entryData.coverImage} width="67px" height="100px" objectFit="cover"/></Td>
      <Td>{entryData.title}</Td>
      <Td>{entryData.rated ? entryData.rating : <Icon as={BsDash} />}</Td>
      <Td><Button onClick={onOpen}> Edit </Button></Td>
      <EditAnimeModal entryData={entryData} isOpen={isOpen} onClose={onClose} />
    </Tr>
  );
});

export default UserListRow;
export type { UserListEntryExtended };