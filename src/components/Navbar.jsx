import { Link } from '@tanstack/react-router';
import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
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
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to="/shop">Shop</Link>
        <Link to="/mine">Mine</Link>
      </Flex>
    </Flex>
  );
}
export default Navbar;
