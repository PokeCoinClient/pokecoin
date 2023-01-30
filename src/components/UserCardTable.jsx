import { useQueries } from '@tanstack/react-query';
import { getCardById } from '../service/CardsService.js';
import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { CardDetailModal } from './CardDetailModal.jsx';

function CardsTable({ cards }) {
  const cardSet = useQueries({
    queries: cards?.map((card) => {
      return {
        queryKey: ['card', card.id],
        queryFn: () => getCardById(card.id),
      };
    }),
  });
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} justifyItems="center" gap={3}>
      {cardSet?.map((card, idx) => {
        let c = cards.find((c) => c.id === card?.data?.card.id);
        return (
          <Box key={idx}>
            {card.isLoading ? (
              <Skeleton w="240px" h="330px" />
            ) : (
              <Flex flexDirection={'column'} gap={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  justifyContent={'space-between'}
                >
                  <Text>{c.amount}x</Text>
                  <Box display="flex" alignItems="center">
                    <Tooltip label={'Last found at'}>
                      <TimeIcon mr={1} />
                    </Tooltip>
                    <Text fontSize="xs">
                      {new Date(c.timestamp).toLocaleString()}
                    </Text>
                  </Box>
                </Box>
                <CardDetailModal card={card.data.card} />
              </Flex>
            )}
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

export default CardsTable;
