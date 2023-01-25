import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  Stack,
  StackDivider,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../api/axios';

const getCards = async (data) => {
  const resp = await axios.get(`/cards?page=${data}`);
  return resp.data;
};

function CardDetailModal({ card }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        as={motion.div}
        whileHover={{ scale: 1.03 }}
        w="100%"
        textAlign="center"
        key={card.name}
      >
        <Image src={card.imageUrl} onClick={onOpen} cursor="pointer" />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{card.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Image src={card.imageUrlHiRes} width={330} />
              <Box>
                <Text marginLeft={2}>{`Type: ${card.types[0]}`}</Text>
                <Text marginLeft={2}>{`Attacks: ${card.attacks[0].cost}`}</Text>
                <Text marginLeft={2}>{`Rarity: ${card.rarity}`}</Text>
                <Text marginLeft={2}>{`HP: ${card.hp}`}</Text>
                <Text marginLeft={2}>{`Level: ${card.level}`}</Text>
                <Text marginLeft={2}>{`Weaknesses: ${card.weaknesses?.map(
                  (e) => {
                    return e.type || e;
                  }
                )}`}</Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function CardsTable(data) {
  const { cards } = data;
  console.log(cards);
  return (
    <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
      {cards?.cards.map((card) => {
        return (
          <Box key={card.id}>
            <Text>{JSON.stringify(card.name)}</Text>
            <CardDetailModal card={card} />
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
