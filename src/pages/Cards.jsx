import {
  Box,
  Button,
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
import { useCallback, useEffect, useState } from 'react';
import axios from '../api/axios';

const getCards = async (data) => {
  const resp = await axios.get(`/cards?page=${data}`);
  return resp.data;
};

const viewDetails = () => {
  return null;
};

function CardsTable(data) {
  const { cards } = data;
  console.log(cards);
  return (
    <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
      {cards?.cards.map((card) => {
        return (
          <Box key={card.id}>
            <Text>{JSON.stringify(card.name)}</Text>
            <Image src={card.imageUrl} onClick={() => viewDetails(card)} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

// TODO make use of useMemo for less rerendering
function Shop() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const onSetSearch = useCallback((evt) => setSearch(evt.target.value), []);

  const { data: cards } = useQuery({
    queryKey: ['cards', page],
    queryFn: () => getCards(page),
  });

  // TODO implement search
  useEffect(() => {
    cards?.cards.filter((c) => c.name.includes(search));
  }, [cards, search]);

  return (
    <Box>
      <Heading>Cards</Heading>
      <Flex>
        <InputGroup m="5px">
          <InputLeftAddon children="Name" />
          <Input placeholder="Pikachu" value={search} onChange={onSetSearch} />
        </InputGroup>
      </Flex>
      <Button
        m="5px"
        onClick={() => (page > 0 ? setPage(page - 1) : setPage(page))}
      >
        Previous
      </Button>
      <Button
        m="5px"
        onClick={() => (page < 2 ? setPage(page + 1) : setPage(page))}
      >
        Next
      </Button>

      <CardsTable cards={cards} />
    </Box>
  );
}

export default Shop;
