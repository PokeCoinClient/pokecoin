import { Button, Flex, Heading, Image, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';
import card from '../assets/pokemon-card-backside.jpg';
import { useAuth } from '../contexts/AuthContext';

const getCardPackages = async () => {
  const resp = await axios.get('/cards/packages');
  return resp.data;
};

const getCurrentPackage = async ({ name }) => {
  const resp = await axios.get(`/cards/packages/${name}`);
  return resp.data;
};

const buyPackageByName = async (data, token) => {
  console.log(data, token);
  const resp = await axios.get(`/cards/packages/${data}/buyDefaultPackage`, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

const usePostBlock = () => {
  const { user } = useAuth();
  const toast = useToast();
  return useMutation(
    ['buyPackage'],
    (data) => buyPackageByName(data, user.token),
    {
      onSuccess: () => {
        toast({
          title: 'Package bought.',
          description: 'You bought a package.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      },
    }
  );
};

const useGetPackages = () => {
  return useQuery({
    queryKey: ['cardPackages'],
    queryFn: getCardPackages,
  });
};

function Shop() {
  const { data: cardPackages } = useGetPackages();
  const { mutate: buyPackage } = usePostBlock();

  return (
    <div className="App">
      <Heading>Shop</Heading>
      <Flex>
        {cardPackages?.map((currentCard) => {
          return (
            <Button key={currentCard} onClick={() => buyPackage(currentCard)}>
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
