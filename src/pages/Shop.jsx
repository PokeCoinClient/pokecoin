import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import card from '../assets/pokemon-card-backside.jpg';
import { useAuth } from '../contexts/AuthContext';
import {
  buyPackageByName,
  getCardPackages,
  getCurrentPackagePrice,
} from '../service/CardsService.js';
import { CardDetailModal } from './Cards.jsx';

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
      onError: (error) => {
        toast({
          title: 'Error.',
          description: error?.response?.data?.message,
          status: 'error',
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

const useGetPackagePrice = () => {
  return useQuery({
    queryKey: ['packagePrice'],
    queryFn: getCurrentPackagePrice,
  });
};

function SelectedPackage({ currentCard, cardPrice }) {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: buyPackage, data } = useBuyPackageByName();
  console.log(data);
  return (
    <Box
      width="216.44px"
      key={currentCard}
      as={motion.div}
      whileHover={{ scale: 1.05 }}
      cursor="pointer"
    >
      <Image src={card} height="300px" onClick={onOpen} />
      <Flex>
        <Text textAlign="center">{currentCard}</Text>
        <Spacer />
        <Text>Price: {cardPrice}</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentCard}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!data ? (
              <Flex>
                <Image src={card} width={330} />
                <Box>
                  <Text marginLeft={3}>Package name: {currentCard}</Text>
                  <Text marginLeft={3}>Price: {cardPrice}</Text>
                </Box>
              </Flex>
            ) : (
              data.cards.map((card) => {
                return (
                  <Box key={card.id}>
                    <Text>{JSON.stringify(card.name)}</Text>
                    <Image src={card.imageUrlHiRes} width={330} />
                  </Box>
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            {isAuthenticated && (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => buyPackage(currentCard)}
              >
                Buy
              </Button>
            )}

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function Shop() {
  const { data: cardPackages } = useGetPackages();
  const { data: cardPrice } = useGetPackagePrice();

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
            <SelectedPackage
              key={currentCard}
              currentCard={currentCard}
              cardPrice={cardPrice}
            />
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
