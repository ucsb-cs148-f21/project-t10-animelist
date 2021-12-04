import { Center, Spinner } from "@chakra-ui/react";
import * as React from 'react';
import { useRouter } from "next/router";
import { useProfileQuery } from '../../generated/graphql';
import ProfilePage from "../../components/profiles/ProfilePage";

const Profile: React.FC<{}> = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading } = useProfileQuery({
    variables: {
      userId: userId as string
    }
  });

  if (loading) {
    return (
      <Center
        flexGrow={1}
      >
        <Spinner />
      </Center>
    );
  }

  if (!data || !data.user) {
    router.push("/");

    return (<div />);
  }

  return <ProfilePage username={data.user.username} 
    userLists={data.user.userLists}
    profilePageBlocks={data.user.profilePageBlocks}
    isOwn={data.me.id === data.user.id} />;
};

export default Profile;