import { Avatar, Heading, VStack } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import * as React from "react";
import { UserListEntry } from "../../generated/graphql";

interface UserListProps {
  list: UserListEntry[];
}

const UserList: React.FC<UserListProps> = ({ list }) => {
  return (
    <VStack width="full" p={6} maxWidth="6xl">
      <Table>
        <TableCaption>This is my animelist</TableCaption>
        <Thead>
          <Tr>
            <Th>Anime title</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
        {list.map(anime =>
          <Tr>
            <Td>{anime.mediaID}</Td>
            <Td>{anime.rating}</Td>
          </Tr>
        )}
          </Tbody>
      </Table>
      <Button colorScheme="blue">Add Anime</Button>
    </VStack>
  )
          
};

export default UserList;
