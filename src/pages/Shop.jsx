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
import { useState } from 'react';

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
        queryClient.invalidateQueries(['balance']);
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

function ShowCards({ data, cardIsOpen, cardOnClose }) {
  const [page, setPage] = useState(0);
  return (
    <Modal isOpen={cardIsOpen} onClose={cardOnClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{JSON.stringify(data?.cards[page]?.name)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Image src={data?.cards[page]?.imageUrlHiRes} width={528} />
            <Text align={'center'}>{`Card: ${page + 1}/${
              data?.cards?.length
            }`}</Text>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent={'space-between'}>
          <Box>
            <Button
              al
              m="5px"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              m="5px"
              onClick={() => setPage(page + 1)}
              disabled={data?.cards?.length - 1 === page}
            >
              Next
            </Button>
          </Box>
          <Box>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                cardOnClose();
                setPage(0);
              }}
            >
              Close
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function SelectedPackage({ currentCard, cardPrice }) {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: cardIsOpen,
    onClose: cardOnClose,
    onOpen: cardOnOpen,
  } = useDisclosure();
  const { mutate: buyPackage, data } = useBuyPackageByName();

  const handleBuyClick = () => {
    buyPackage(currentCard);
    onClose();
    cardOnOpen();
  };

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
          <ModalHeader>{card.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Image src={card} width={330} />
              <Box>
                <Text marginLeft={3}>Package name: {currentCard}</Text>
                <Text marginLeft={3}>Price: {cardPrice}</Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            {isAuthenticated && (
              <Button colorScheme="blue" mr={3} onClick={handleBuyClick}>
                Buy
              </Button>
            )}

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ShowCards
        data={data}
        cardIsOpen={cardIsOpen}
        cardOnClose={cardOnClose}
      />
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
