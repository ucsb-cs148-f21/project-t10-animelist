import { Avatar, Heading, VStack } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../generated/graphql";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { Button, ButtonGroup} from "@chakra-ui/react"

interface Props {
  user: Pick<User, "username">;
}

const UserList: React.FC<Props> = ({ user }) => {
  return (
    <VStack w="full" p={6}>
      <Avatar size={"xl"} name={user.username} />

      <Heading>Placeholder list for {user.username}</Heading>

    <Table>
      <TableCaption>This is my animelist</TableCaption>
      <Thead>
        <Tr>
          <Th>Anime title</Th>
          <Th>Score</Th>
        </Tr>
      </Thead>
     <Tbody>
        <Tr>
          <Td>Your name</Td>
          <Td>10</Td>
        </Tr>
        <Tr>
          <Td>Stein's Gate</Td>
          <Td>9</Td>
        </Tr>
        <Tr>
          <Td>Your Lie in April	</Td>
          <Td>8</Td>
        </Tr>
      </Tbody>
    </Table>

    <Button colorScheme="blue">Add Anime</Button>
    </VStack>
    
  );
};




export default UserList;
