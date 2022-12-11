import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link, useRouter } from '@tanstack/react-router';
import ThemeToggleButton from './ToggleButton';
import IconSvg from '../assets/icon.svg';
import Login from './Login';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { name: 'Home', path: '/', needsAuth: false },
  { name: 'Shop', path: '/shop', needsAuth: false },
  { name: 'Cards', path: '/cards', needsAuth: false },
  { name: 'Mine', path: '/mine', needsAuth: true },
  { name: 'User', path: '/user', needsAuth: true },
];

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
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
        <Flex display="flex" gap={1}>
          <Image src={IconSvg} height="25px" />
          <Link to="/">
            <Text fontSize={['sm', 'md', 'lg']}>Pokecoin</Text>
          </Link>
        </Flex>
      </Box>
      <Flex display="flex" gap={[1, 2, 3]}>
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
              <Text fontSize={['sm', 'md', 'lg']}>{link.name}</Text>
            </Link>
          );
        })}
      </Flex>

      <Flex gap={2} alignItems="flex-end">
        {isAuthenticated ? (
          <Button
            size="xs"
            onClick={() => {
              logout();
              router.navigate({ to: '/' });
            }}
          >
            Logout
          </Button>
        ) : (
          <Login />
        )}
        <ThemeToggleButton />
      </Flex>
    </Flex>
  );
}

export default Navbar;
