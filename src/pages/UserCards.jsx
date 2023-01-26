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

const getCardById = (id) => {
  return axios.get(`/cards/${id}`);
};

function CardsTable(data) {
  const { cards } = data;
  console.log(cards);
  const result = useQueries(
    cards?.map((card) => {
      console.log(card.cardId);
      return {
        queryKey: ['card', card.cardId],
        queryFn: () => getCardById(card.cardId),
      };
    })
  );
  console.log(result);
  return <SimpleGrid columns={[1, 2, 3]} justifyItems="center" />;
}

function Shop() {
  const { user } = useAuth();
  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: () => getUserCards(user.token),
  });
  return (
    <Box>
      <Heading>Cards</Heading>
      <CardsTable cards={cards} />
    </Box>
  );
}

export default Shop;
