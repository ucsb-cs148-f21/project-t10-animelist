import { Center, Spinner } from "@chakra-ui/react";
import * as React from 'react';
import { useRouter } from "next/router";
import { useMeQuery, useProfileQuery } from '../../generated/graphql';
import ProfilePage from "../../components/profiles/ProfilePage";

const Profile: React.FC<{}> = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: meData, loading: meLoading } = useMeQuery();
  const { data: profileData, loading: profileLoading } = useProfileQuery({
    variables: {
      userId: userId as string
    }
  });

  if (meLoading || profileLoading) {
    return (
      <Center
        flexGrow={1}
      >
        <Spinner />
      </Center>
    );
  }

  if (!profileData || !profileData.user) {
    router.push("/");

    return (<div />);
  }

  return <ProfilePage username={profileData.user.username} 
    userLists={profileData.user.userLists}
    profilePageBlocks={profileData.user.profilePageBlocks}
    isOwn={meData && meData.me && meData.me.id === profileData.user.id} />;
};

export default Profile;