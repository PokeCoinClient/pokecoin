import { Flex, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import ThemeToggleButton from './ToggleButton';

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
        <Link
          to="/"
          activeProps={{
            style: { fontWeight: 'bold' },
          }}
        >
          Home
        </Link>
        <Link
          to="/shop"
          activeProps={{
            style: { fontWeight: 'bold' },
          }}
        >
          Shop
        </Link>
        <Link
          to="/mine"
          activeProps={{
            style: { fontWeight: 'bold' },
          }}
        >
          Mine
        </Link>
      </Flex>
    </Flex>
  );
}
export default Navbar;
