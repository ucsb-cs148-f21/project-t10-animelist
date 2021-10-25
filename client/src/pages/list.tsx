import { VStack } from "@chakra-ui/react";
import router from "next/router";
import * as React from "react";
import UserList from "../components/list/UserList";
import Loading from "../components/Loading";
import { useUserListQuery } from "../generated/graphql";

const List: React.FC<{}> = () => {
  const { data, loading } = useUserListQuery();

  if (loading) {
    return <Loading />;
  }

  if (!data || !data.me) {
    router.push("/login");
    return <div />;
  }

  return (
    <VStack py={{ base: 10 }} width="full">
      <UserList list={data.me.userList} />
    </VStack>
  );
};

export default List;
