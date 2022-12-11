import { Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

function User() {
  const { user } = useAuth();

  return (
    <div>
      <Text>{JSON.stringify(user)}</Text>
    </div>
  );
}

export default User;
