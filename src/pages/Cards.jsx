import {
  Box,
  Button,
  Flex,
  Image,
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
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getCards } from '../service/CardsService.js';
import { set } from 'react-hook-form';

export function CardDetailModal({ card }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(card);
  return (
    <>
      <Box
        as={motion.div}
        whileHover={{ scale: 1.02 }}
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
                <Text marginLeft={2}>{`Artist: ${card.artist}`}</Text>
                <Text marginLeft={2}>{`Attacks: ${
                  card.attacks?.map((e) => {
                    return e.name;
                  }) || '-'
                }`}</Text>
                <Text marginLeft={2}>{`HP: ${card.hp || '-'}`}</Text>
                <Text marginLeft={2}>{`ID: ${card.id}`}</Text>
                <Text marginLeft={2}>{`Level: ${card.level || '-'}`}</Text>
                <Text
                  marginLeft={2}
                >{`Pokedex Number: ${card.nationalPokedexNumber}`}</Text>
                <Text marginLeft={2}>Number</Text>
                <Text marginLeft={2}>{`Rarity: ${card.rarity}`}</Text>
                <Text marginLeft={2}>{`Retreat Cost: ${
                  card.retreatCost || '-'
                }`}</Text>
                <Text marginLeft={2}>{`Series: ${card.series || '-'}`}</Text>
                <Text marginLeft={2}>{`Set: ${card.set || 'set'}`}</Text>
                <Text marginLeft={2}>{`Subtype: ${card.subtype || '-'}`}</Text>
                <Text marginLeft={2}>{`Supertype: ${
                  card.supertype || '-'
                }`}</Text>
                <Text marginLeft={2}>{`Types: ${
                  card.types?.map((e) => {
                    return e;
                  }) || '-'
                }`}</Text>
                <Text marginLeft={2}>{`Weaknesses: ${
                  card.weaknesses?.map((e) => {
                    return e.type;
                  }) || '-'
                }`}</Text>
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
function Cards() {
  const [page, setPage] = useState(0);

  const { data: cards } = useQuery({
    queryKey: ['cards', page],
    queryFn: () => getCards(page),
  });
  return (
    <Box>
      <Button m="5px" onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <Button m="5px" onClick={() => setPage(page + 1)}>
        Next
      </Button>
      {cards?.cards?.length != 0 ? (
        <CardsTable cards={cards} />
      ) : page < 0 ? (
        setPage(0)
      ) : (
        setPage(page - 1)
      )}
    </Box>
  );
}

export default Cards;
