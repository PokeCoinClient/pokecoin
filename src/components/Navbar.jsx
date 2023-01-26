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
  { name: 'Shop', path: '/shop', needsAuth: false },
  { name: 'Cards', path: '/cards', needsAuth: false },
  { name: 'UserCards', path: '/userCards', needsAuth: true },
  { name: 'Mine', path: '/mine', needsAuth: true },
  { name: 'User', path: '/profile', needsAuth: true },
];

const getUserBalance = async (token) => {
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
      as="header"
      w="100%"
      display="flex"
      justify="space-between"
      alignItems="center"
      py={3}
    >
      <Box>
        <Flex display="flex" gap={1} alignItems="center">
          <Image src={IconSvg} height="25px" />
          <Link to="/">
            <Text fontSize={['sm', 'sm', 'md']}>Pokecoin</Text>
          </Link>
        </Flex>
      </Box>
      <Flex display="flex" gap={[1, 2, 3]} alignItems="center">
        {navLinks.map((link) => {
          if (link.needsAuth && !isAuthenticated) {
            return null;
          }
          return (
            <Link
              key={link.name}
              to={link.path}
              activeProps={{
                style: { fontWeight: 'bold' },
              }}
            >
              <Text fontSize={['sm', 'sm', 'md']}>{link.name}</Text>
            </Link>
          );
        })}
      </Flex>

      <Flex gap={2} alignItems="center">
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
