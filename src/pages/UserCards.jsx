import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserCards } from '../service/CardsService.js';
import CardsTable from '../components/UserCardTable.jsx';

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
