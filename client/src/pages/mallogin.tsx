import { Center, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { MeDocument, MeQuery, useMalLoginMutation } from "../generated/graphql";
import { initializeApollo } from "../utils/createApollo";

interface MalLinkProps {
  code: string,
  state: string
}

const Profile: React.FC<MalLinkProps> = (props) => {
  const [ loading, setLoading ] = useState(true);
  const [ success, setSuccess ] = useState(false);
  const [ useMalLogin ] = useMalLoginMutation({
    variables: { input: { code: props.code, state: props.state } },
    update: (store, { data }) => {
      if (!data) return null;

      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data.malLogin.user,
        }
      });
    }
  });
  const router = useRouter();

  useEffect(() => {
    useMalLogin()
    .then(res => {
      setSuccess(res.data.malLogin.success)
      router.push("/profile")
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
      <Heading>Login {success ? "successful" : "not successful"}!</Heading>
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