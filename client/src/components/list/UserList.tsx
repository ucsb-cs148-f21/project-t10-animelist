import { Avatar, Heading, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { User } from '../../generated/graphql';

interface Props {
	user: Pick<User, "username">
};

const UserList: React.FC<Props> = ({ user }) => {
	return (
		<VStack
			w="full"
			p={6}
		>
			<Avatar
        size={"xl"}
        name={user.username}
      />	

			<Heading>
				Placeholder list for {user.username}
			</Heading>
		</VStack>
	)
};

export default UserList;