import {
  Box,
  Button,
  Flex,
  Heading,
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
import { useQuery, useQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext.jsx';

const getUserCards = async (token) => {
  const resp = await axios.get(`/cards/usercards`, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

const getCardById = async (id) => {
  const resp = await axios.get(`/cards/${id}`);
  return resp.data;
};

function CardsTable({ cards }) {
  const result = useQueries({
    queries: cards?.map((card) => {
      return {
        queryKey: ['card', card.cardId],
        queryFn: () => getCardById(card.cardId),
      };
    }),
  });
  const cardSet = new Set();
  // need fix, daten sind noch nicht da wieso auch immer
  result.map((c) => cardSet.add(c?.data.card));
  return (
    <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
      {cardSet?.forEach((card) => {
        return (
          <Box key={card.id}>
            <Text>{JSON.stringify(card.name)}</Text>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

function Shop() {
  const { user } = useAuth();
  const { data: cardIds } = useQuery({
    queryKey: ['cards'],
    queryFn: () => getUserCards(user?.token),
  });
  return (
    <Box>
      <Heading>Cards</Heading>
      {cardIds && <CardsTable cards={cardIds} />}
    </Box>
  );
}

export default Shop;
