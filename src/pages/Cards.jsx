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
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from '../api/axios';

const getCards = async (data) => {
  console.log(data);
  const resp = await axios.get(`/cards?page=${1}`);
  return resp.data;
};

const useGetCards = () => {
  return useQuery(['cards'], (data) => getCards(data));
};

const viewDetails = () => {
  return null;
};

function CardsTable(data) {
  const { page } = data;
  const { data: cards } = useGetCards();
  console.log(page);
  // () => cards(page)
  return (
    <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
      {cards?.cards.map((card) => {
        return (
          <Box key={card.id}>
            <Image src={card.imageUrl} onClick={() => viewDetails(card)} />
            <Text>{JSON.stringify(card.name)}</Text>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

function Shop() {
  const [page, setPage] = useState(10);
  return (
    <Box>
      <Heading>Cards</Heading>
      <Flex>
        <InputGroup m="5px">
          <InputLeftAddon children="Name" />
          <Input placeholder="Pikachu" />
        </InputGroup>
        <InputGroup m="5px">
          <InputLeftAddon children="Name" />
          <Input placeholder="Pikachu" />
        </InputGroup>
      </Flex>
      <CardsTable page={page} />
      <Button onClick={() => setPage(page + 1)} />
    </Box>
  );
}

export default Shop;
