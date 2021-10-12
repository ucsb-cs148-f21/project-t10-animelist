import { Center, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useMalLinkMutation } from "../generated/graphql";
import { initializeApollo } from "../utils/createApollo";

interface MalLinkProps {
  code: string,
  state: string
}

const Profile: React.FC<MalLinkProps> = (props) => {
  const [ loading, setLoading ] = useState(true);
  const [ success, setSuccess ] = useState(false);
  const [ useMalLink ] = useMalLinkMutation({ variables: { input: { code: props.code, state: props.state } } });

  useEffect(() => {
    useMalLink()
    .then(res => {
      setSuccess(res.data.malLink)
    })
    .catch(() => {})
    .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <Center
      py={{ base: 20, md: 36 }}
      maxW={{ base: "sm", md: "xl" }}
      width="full"
    >
      <Heading>Link {success ? "successful" : "not successful"}!</Heading>
    </Center>
  );
};

export default Profile;

export async function getServerSideProps({ query }) {
  const apollo = initializeApollo();

  if (!query.code || !query.state) {
    return {
      props: {}
    }
  }

  return {
    props: {
      code: query.code,
      state: query.state
    }
  };
}