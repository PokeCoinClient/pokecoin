import {
  Box,
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
import axios from '../api/axios';

const getCards = async () => {
  const resp = await axios.get('/cards');
  return resp.data;
};

const useGetCards = () => {
  return useQuery({ queryKey: ['cards'], queryFn: getCards });
};

const viewDetails = () => {
  return null;
};

function Shop() {
  const { data: cards } = useGetCards();
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
    </Box>
  );
}

export default Shop;
