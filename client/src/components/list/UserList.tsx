import { Avatar, Heading, Link, VStack } from "@chakra-ui/react";
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
import { Button, ButtonGroup } from "@chakra-ui/react"
import * as React from "react";
import { User } from "../../generated/graphql";

interface Props {
  user: Pick<User, "username">;
}

const UserList: React.FC<Props> = ({ user }) => {
  return (
    <VStack width="full" p={6} maxWidth="6xl">
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

      <Link href="/search">
        <Button
          colorScheme="blue"
        >
          Add Anime
        </Button>
      </Link>

    </VStack>
  );
};

export default UserList;
