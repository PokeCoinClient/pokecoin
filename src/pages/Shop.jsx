import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import card from '../assets/pokemon-card-backside.jpg';

const getCardPackages = async () => {
  const resp = await axios.get('/cards/packages');
  return resp.data;
};

const getCurrentPackage = async ({ name }) => {
  const resp = await axios.get(`/cards/packages/${name}`);
  return resp.data;
};

const useGetPackages = () => {
  return useQuery({
    queryKey: ['cardPackages'],
    queryFn: getCardPackages,
  });
};

function Shop() {
  const { data: cardPackages } = useGetPackages();
  return (
    <div className="App">
      <Heading>Shop</Heading>
      <Flex>
        {cardPackages?.map((currentCard) => {
          return (
            <Button
              key={currentCard}
              onClick={() => getCurrentPackage({ currentCard })}
            >
              {currentCard}
            </Button>
          );
        })}
        <Image src={card} height="300px" />
      </Flex>
    </div>
  );
}

export default Shop;
