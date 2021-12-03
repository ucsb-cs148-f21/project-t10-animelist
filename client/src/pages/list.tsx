import { ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import { useMeQuery } from "../generated/graphql";

const List: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  return (
    <VStack py={{ base: 10 }} width="sm">
      <Heading>Your Lists</Heading>
      {
        data.me.userLists && data.me.userLists.length !== 0 &&
        data.me.userLists.map((userlist) => (
          <Button width="full" maxW="sm" onClick={() => router.push(`list/${userlist.id}`)}>
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
  );
};

export default List;
