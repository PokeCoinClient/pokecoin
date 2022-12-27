import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link, useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ThemeToggleButton from './ToggleButton';
import IconSvg from '../assets/icon.svg';
import Login from './Login';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';

const navLinks = [
  { name: 'Home', path: '/', needsAuth: false },
  {
    name: 'Shop',
    path: '/shop',
    needsAuth: false,
  },
  { name: 'Cards', path: '/cards', needsAuth: false },
  {
    name: 'Mine',
    path: '/mine',
    needsAuth: true,
  },
  { name: 'User', path: '/profile', needsAuth: true },
];

export const getUserBalance = async (token) => {
  const resp = await axios.get('/wallet/balance', {
    headers: {
      token: `${token.queryKey[1]}`,
    },
  });
  return resp.data;
};

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const { data: userBalance } = useQuery({
    queryKey: ['balance', user?.token],
    queryFn: getUserBalance,
    enabled: !!user?.token,
  });

  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      h="5vh"
      pr={3}
      pl={3}
      style={{
        background: 'rgba(255, 255, 255, 0.11)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: ' blur(6.8px)',
        borderRadius: '10px',
      }}
    >
      <Flex display="flex" gap={1} alignItems="center">
        <Image src={IconSvg} height="40px" />
        <Link to="/">
          <Text fontSize={['sm', 'sm', 'md']}>Pokecoin</Text>
        </Link>
      </Flex>
      <Flex flex={2} justifyContent="flex-end" alignItems="center" gap={2}>
        <Text fontSize={['sm', 'sm', 'md']}>{userBalance?.amount}</Text>
        {isAuthenticated ? (
          <motion.div>
            <Button
              size="xs"
              minW="75px"
              maxW="75px"
              onClick={() => {
                logout();
                router.navigate({ to: '/' });
              }}
            >
              Logout
            </Button>
          </motion.div>
        ) : (
          <motion.div>
            <Login />
          </motion.div>
        )}
        <ThemeToggleButton />
      </Flex>
    </Flex>
  );
}

export default Navbar;
