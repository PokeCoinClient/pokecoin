import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { CardDetailModal } from './Cards.jsx';
import { getCardById, getUserCards } from '../service/CardsService.js';
import { TimeIcon } from '@chakra-ui/icons';

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

// ToDo add amount to cards

function UserCards() {
  const { user } = useAuth();
  const { data: cardIds } = useQuery({
    queryKey: ['cards'],
    queryFn: () => getUserCards(user?.token),
  });

  const filteredCards = useMemo(() => {
    let m = new Map();
    cardIds?.forEach((o) => {
      let k = m.get(o.cardId);
      if (k) {
        m.set(o.cardId, {
          id: o.cardId,
          amount: k.amount + 1,
          timestamp: o.timestamp > k.timestamp ? o.timestamp : k.timestamp,
        });
      } else {
        m.set(o.cardId, {
          id: o.cardId,
          amount: 1,
          timestamp: o.timestamp,
        });
      }
    });
    let arr = [...m.values()];
    arr.sort((a, b) => b.timestamp - a.timestamp);
    return arr;
  }, [cardIds]);

  return <Box>{filteredCards && <CardsTable cards={filteredCards} />}</Box>;
}

export default UserCards;
