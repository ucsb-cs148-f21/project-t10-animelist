import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import { useMeQuery } from "../generated/graphql";

const List: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading) {
    return <div />;
  }

  if (!data || !data.me) {
    router.push("/login");
    return <div />;
  }

  return (
    <VStack py={{ base: 10 }} width="sm" spacing={8}>
      <Heading>Your Lists</Heading>

      <ButtonGroup
        width="100%"
        justifyContent='center'
      >
        <Link href="/createratingsystem">
          <Button colorScheme="blue">Create Rating System</Button>
        </Link>
        <Link href="/createlist">
          <Button colorScheme="blue">Create a List</Button>
        </Link>
      </ButtonGroup>

      <VStack width="100%" spacing={2}>
        {
          data.me.userLists && data.me.userLists.length !== 0 &&
          data.me.userLists.map((userlist) => (
            <Button 
              key={userlist.id}
              width="full" 
              maxW="sm" 
              onClick={() => router.push(`list/${userlist.id}`)}
            >
              <HStack width="full" justifyContent="space-between">
                <Text>
                  {userlist.name}
                </Text>
                <ArrowRightIcon />
              </HStack>
            </Button>
          ))
        }
      </VStack>
    </VStack>
  );
};

export default List;
