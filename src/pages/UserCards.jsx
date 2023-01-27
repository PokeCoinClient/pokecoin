import { Box, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { CardDetailModal } from './Cards.jsx';
import { getCardById, getUserCards } from '../service/CardsService.js';

function CardsTable({ cards }) {
  const cardSet = useQueries({
    queries: cards?.map((card) => {
      return {
        queryKey: ['card', card],
        queryFn: () => getCardById(card),
      };
    }),
  });
  return (
    <SimpleGrid columns={[1, 2, 3]} justifyItems="center" gap={3}>
      {cardSet?.map((card, idx) => {
        return (
          <Box key={idx}>
            {card.isLoading ? (
              <Skeleton w="240px" h="330px" />
            ) : (
              <>
                <Text>{JSON.stringify(card.data.card.name)}</Text>
                <CardDetailModal card={card.data.card} />
              </>
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
    const ids = cardIds?.map((o) => o.cardId);
    return [...new Set(ids)];
  }, [cardIds]);

  return <Box>{filteredCards && <CardsTable cards={filteredCards} />}</Box>;
}

export default UserCards;
