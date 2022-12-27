import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link, } from '@tanstack/react-router';
import { CardsIcon } from './Icons.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const navLinks = [
  { name: 'Home', path: '/', icon: CardsIcon, needsAuth: false },
  { name: 'Shop', path: '/shop', icon: CardsIcon, needsAuth: false },
  { name: 'Cards', path: '/cards', icon: CardsIcon, needsAuth: false },
  { name: 'Mine', path: '/mine', icon: CardsIcon, needsAuth: true },
  { name: 'User', path: '/profile', icon: CardsIcon, needsAuth: true },
];

function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <Flex
      w={{ base: '100%', md: '10vw' }}
      h={{ base: '5vh', md: '100%' }}
      flexDir="column"
      justifyContent={{
        base: 'center',
        md: 'space-between',
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.11)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: ' blur(6.8px)',
        borderRadius: '10px',
      }}
    >
      <Flex
        flexDir={{ base: 'row', md: 'column' }}
        alignItems={{ base: 'center' }}
        justifyContent="space-around"
        as="nav"
        gap={[0, 1, 5]}
        _first={{
          md: {
            marginTop: 3,
          },
        }}
      >
        {navLinks.map((link) => {
          if (link.needsAuth && !isAuthenticated) {
            return null;
          }
          return (
            <Box
              width="100%"
              key={link.name}
              _hover={{
                bg: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <Link
                to={link.path}
                activeProps={{
                  style: { fontWeight: 'bold' },
                }}
              >
                <Flex
                  alignItems={'center'}
                  gap={[0, 0, 2]}
                  justifyContent="flex-start"
                  flexDir={{
                    base: 'column',
                    md: 'row',
                  }}
                  ml={[0, 1, 5]}
                >
                  {<link.icon boxSize={{ base: 4, sm: 4, md: 8 }} />}
                  <Text fontSize={['sm', 'sm', 'md']}>{link.name}</Text>
                </Flex>
              </Link>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default Navbar;
