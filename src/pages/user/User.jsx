import { Box, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { getMe, getUserBalance } from '../../service/AuthService.js';

function User() {
  const { user, isAuthenticated } = useAuth();
  const { data, isLoading, isError } = useQuery(
    ['me'],
    () => getMe(user.token),
    {
      enabled: isAuthenticated,
    }
  );
  const { data: currentBalance } = useQuery(
    ['currentBalance'],
    () => getUserBalance(user.token),
    {
      enabled: isAuthenticated,
    }
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <Box>
      <Heading>Profile</Heading>
      <Text>User Id: {data._id}</Text>
      <Text>Username: {data.username}</Text>
      <Text>Current balance: {currentBalance.amount} Pokecoins</Text>
    </Box>
  );
}

export default User;
