import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import ThemeToggleButton from './ToggleButton';
import IconSvg from '../assets/icon.svg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Cards', path: '/cards' },
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
        <Flex display="flex" gap={1}>
          <Image src={IconSvg} height="25px" />
          <Link to="/">
            <Text fontSize={['sm', 'md', 'lg']}>Pokecoin</Text>
          </Link>
        </Flex>
      </Box>

      <Flex display="flex" gap={[1, 2, 3]}>
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

      <Flex gap={2}>
        <Button
          size="xs"
          minW="70px"
          aria-label="Toggle theme"
          colorScheme={useColorModeValue('blue', 'yellow')}
        >
          Login
        </Button>
        <ThemeToggleButton />
      </Flex>
    </Flex>
  );
}

export default Navbar;
