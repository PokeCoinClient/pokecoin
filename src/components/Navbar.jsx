import { Flex, Text } from '@chakra-ui/react';
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
      w="100%"
      display="flex"
      justify="space-between"
      alignItems="center"
      mt={4}
      h="5vh"
    >
      <Flex align="flex-start">
        <ThemeToggleButton />
      </Flex>

      <Flex>
        <Text fontSize="xl">Pokecoin</Text>
      </Flex>

      <Flex align="flex-end" gap={2}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            activeProps={{
              style: { fontWeight: 'bold' },
            }}
          >
            <Text fontSize="xl">{link.name}</Text>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
