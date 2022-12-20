import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
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

function Shop() {
  const { data: cards } = useGetCards();
  console.log(cards);
  return (
    <Box>
      <Heading>Cards</Heading>
      <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
        {cards?.cards.map((card) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Box>
              <Text>${card}</Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Shop;
