import {Button, Flex, Heading, Image, Text, useToast} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
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
  const resp = await axios.get(
    `/cards/packages/${data}/buyDefaultPackage`,
    data,
    {
      headers: {
        token: `${token}`,
      },
    }
  );
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
  const { user } = useAuth();
  const toast = useToast();
  const { mutate: buyPackageMutate } = useMutation(
    ['buyPackage'],
    buyPackageByName,
    {
      onSuccess: (data) => {
        toast({
          title: 'Logged in.',
          description: 'You are now logged in.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      },
    }
  );

  return (
    <div className="App">
      <Heading>Shop</Heading>
      <Flex>
        {cardPackages?.map((currentCard) => {
          return (
            <Button
              key={currentCard}
              onClick={() => buyPackageMutate(currentCard, user?.token)}
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
