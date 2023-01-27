import { Box, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../api/axios';
import { getUserBalance } from '../../components/Navbar.jsx';

const axiosMe = async (token) => {
  const resp = await axios.get('/auth/me', {
    headers: {
      token: `${token.queryKey[1]}`,
    },
  });
  return resp.data;
};

function User() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery(['me', user.token], axiosMe, {
    enabled: !!user,
  });
  const { data: currentBalance } = useQuery(
    ['currentBalance', user.token],
    getUserBalance,
    {
      enabled: !!user,
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
      <Text>User Id: {data?._id}</Text>
      <Text>Username: {data?.username}</Text>
      <Text>Current balance: {currentBalance?.amount} Pokecoins</Text>
    </Box>
  );
}

export default User;
