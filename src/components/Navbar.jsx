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
    >
      <Flex align="flex-start">
        <ThemeToggleButton />
      </Flex>

      <Flex>
        <Link to="/">
          <Text fontSize={['sm', 'md', 'lg']}>Pokecoin</Text>
        </Link>
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
            <Text fontSize={['sm', 'md', 'lg']}>{link.name}</Text>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
