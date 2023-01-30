import { Box, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCards } from '../service/CardsService.js';
import CardsTable from '../components/CardTable.jsx';

function Cards() {
  const [page, setPage] = useState(0);

  const { data: cards } = useQuery({
    queryKey: ['cards', page],
    queryFn: () => getCards(page),
  });
  return (
    <Box>
      <Button m="5px" onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <Button m="5px" onClick={() => setPage(page + 1)}>
        Next
      </Button>
      {cards?.cards?.length !== 0 ? (
        <CardsTable cards={cards} />
      ) : page < 0 ? (
        setPage(0)
      ) : (
        setPage(page - 1)
      )}
    </Box>
  );
}

export default Cards;
