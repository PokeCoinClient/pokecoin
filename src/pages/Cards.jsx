import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import axios from '../api/axios';
import InputField from '../components/InputField.jsx';

const getCards = async (data) => {
  const resp = await axios.get(`/cards?page=${data}`);
  return resp.data;
};

const viewDetails = (card) => {
  console.log(card);
  return (
    <Modal
      size={['xs', 'sm', 'md']}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={useColorModeValue('#fff', '#202023')}>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={5}>
            <InputField name="username" label="username" />
            <InputField name="password" label="password" isPassword />
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Box>
            <Button size={['xs', 'sm']} type="submit" colorScheme="blue" mr={3}>
              Sign in
            </Button>

            <Button size={['xs', 'sm']} colorScheme="blue" mr={3}>
              Register
            </Button>
          </Box>
          <Button size={['xs', 'sm']}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function CardsTable(data) {
  const { cards } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(cards);
  return (
    <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
      {cards?.cards.map((card) => {
        return (
          <Box key={card.id}>
            <Text>{JSON.stringify(card.name)}</Text>
            <Image src={card.imageUrl} />
            <Button onClick={onOpen}>Open Modal</Button>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

// TODO make use of useMemo for less rerendering
function Shop() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const onSetSearch = useCallback((evt) => setSearch(evt.target.value), []);

  const { data: cards } = useQuery({
    queryKey: ['cards', page],
    queryFn: () => getCards(page),
  });

  // TODO implement search
  useEffect(() => {
    cards?.cards.filter((c) => c.name.includes(search));
  }, [cards, search]);

  return (
    <Box>
      <Heading>Cards</Heading>
      <Flex>
        <InputGroup m="5px">
          <InputLeftAddon children="Name" />
          <Input placeholder="Pikachu" value={search} onChange={onSetSearch} />
        </InputGroup>
      </Flex>
      <Button
        m="5px"
        onClick={() => (page > 0 ? setPage(page - 1) : setPage(page))}
      >
        Previous
      </Button>
      <Button
        m="5px"
        onClick={() => (page < 2 ? setPage(page + 1) : setPage(page))}
      >
        Next
      </Button>

      <CardsTable cards={cards} />
    </Box>
  );
}

export default Shop;
