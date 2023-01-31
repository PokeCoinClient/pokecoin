import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCards } from '../service/CardsService.js';
import { CardDetailModal } from '../components/CardDetailModal.jsx';

function CardsTable(data) {
  const { cards } = data;
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} justifyItems="center" gap={3}>
      {cards?.cards.map((card) => {
        return (
          <Box key={card.id}>
            <CardDetailModal card={card} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

function Cards() {
  const [page, setPage] = useState(0);

  const { data: cards } = useQuery({
    queryKey: ['cards', page],
    queryFn: () => getCards(page),
  });
  return (
    <Box>
      <Button m="5px" onClick={() => setPage(page - 1)} disabled={page <= 0}>
        Previous
      </Button>
      <Button
        m="5px"
        onClick={() => setPage(page + 1)}
        disabled={cards?.cards?.length < 50}
      >
        Next
      </Button>
      <CardsTable cards={cards} />
    </Box>
  );
}

export default Cards;
