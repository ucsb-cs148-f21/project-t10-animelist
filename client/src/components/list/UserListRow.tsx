import * as React from "react";
import Icon from "@chakra-ui/icon";
import { BsDash } from "react-icons/bs";
import { Td, Tr } from "@chakra-ui/table";
import { UserListEntry } from "../../generated/graphql";

interface UserListEntryExtended extends UserListEntry {
  title: String,
  coverImage: String
}

interface UserListRowProps {
  entryData: UserListEntryExtended;
}

const UserListRow: React.FC<UserListRowProps> = ({ entryData }) => {
  return (
    <Tr>
      <Td>{entryData.title}</Td>
      <Td>{entryData.rated ? entryData.rating : <Icon as={BsDash} />}</Td>
    </Tr>
  )
};

export default UserListRow;