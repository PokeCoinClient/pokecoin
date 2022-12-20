import { Box, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
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
  return (
    <Box>
      <Heading>Cards</Heading>
      <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
        {cards?.cards.map((card) => {
          return (
            <Box key={card.id}>
              <Image src={card.imageUrl} />
              <Text>{JSON.stringify(card.name)}</Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Shop;
