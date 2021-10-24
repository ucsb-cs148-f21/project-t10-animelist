import { Td, Tr } from "@chakra-ui/table";
import * as React from "react";
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
      <Td>{entryData.rating}</Td>
    </Tr>
  )
};

export default UserListRow;