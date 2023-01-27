import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from '../api/axios';
import card from '../assets/pokemon-card-backside.jpg';
import { useAuth } from '../contexts/AuthContext';

const getCardPackages = async () => {
  const resp = await axios.get('/cards/packages');
  return resp.data;
};

const getCurrentPackagePrice = async () => {
  const resp = await axios.get(`/cards/packages/currentPackageCost`);
  return resp.data;
};

const buyPackageByName = async (data, token) => {
  const resp = await axios.get(`/cards/packages/${data}/buyDefaultPackage`, {
    headers: {
      token: `${token}`,
    },
  });
  return resp.data;
};

const useBuyPackageByName = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries(['balance', user?.token]);
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

const useGetPackagePrice = () => {
  return useQuery({
    queryKey: ['packagePrice'],
    queryFn: getCurrentPackagePrice,
  });
};

function Shop() {
  const { data: cardPackages } = useGetPackages();
  const { data: cardPrice } = useGetPackagePrice();
  const { mutate: buyPackage } = useBuyPackageByName();

  return (
    <Box>
      <Heading>Shop</Heading>
      <SimpleGrid columns={[1, 2, 3]} justifyItems="center">
        <Box width="216.44px" cursor="pointer">
          <Image src={card} height="300px" filter="grayscale(1)" />
          <Flex>
            <Text textAlign="center">Sold out!</Text>
            <Spacer />
            <Text>Price: -</Text>
          </Flex>
        </Box>
        {cardPackages?.map((currentCard) => {
          return (
            <Box
              width="216.44px"
              key={currentCard}
              as={motion.div}
              whileHover={{ scale: 1.05 }}
              cursor="pointer"
            >
              <Image
                src={card}
                height="300px"
                onClick={() => buyPackage(currentCard)}
              />
              <Flex>
                <Text textAlign="center">{currentCard}</Text>
                <Spacer />
                <Text>Price: {cardPrice}</Text>
              </Flex>
            </Box>
          );
        })}
        <Box width="216.44px" cursor="pointer">
          <Image src={card} height="300px" filter="grayscale(1)" />
          <Flex>
            <Text textAlign="center">Sold out!</Text>
            <Spacer />
            <Text>Price: -</Text>
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Shop;
