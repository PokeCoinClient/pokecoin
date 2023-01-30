import { Box, SimpleGrid } from '@chakra-ui/react';
import { CardDetailModal } from './CardDetailModal.jsx';

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

export default CardsTable;
