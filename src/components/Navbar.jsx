import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import ThemeToggleButton from './ToggleButton';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Mine', path: '/mine' },
];

function Navbar() {
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
        <ThemeToggleButton />
      </Box>

      <Box>
        <Link to="/">
          <Text fontSize={['sm', 'md', 'lg']}>Pokecoin</Text>
        </Link>
      </Box>

      <Flex gap={2}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            activeProps={{
              style: { fontWeight: 'bold' },
            }}
          >
            <Text fontSize={['sm', 'md', 'lg']}>{link.name}</Text>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
