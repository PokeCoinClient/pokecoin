import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export function CardDetailModal({ card }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        as={motion.div}
        whileHover={{ scale: 1.02 }}
        w="100%"
        textAlign="center"
        key={card.name}
      >
        <Image src={card.imageUrl} onClick={onOpen} cursor="pointer" />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{card.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Image src={card.imageUrlHiRes} width={330} />
              <Box>
                <Text marginLeft={2}>{`Artist: ${card.artist}`}</Text>
                <Text marginLeft={2}>{`Attacks: ${
                  card.attacks?.map((e) => {
                    return e.name;
                  }) || '-'
                }`}</Text>
                <Text marginLeft={2}>{`HP: ${card.hp || '-'}`}</Text>
                <Text marginLeft={2}>{`ID: ${card.id}`}</Text>
                <Text marginLeft={2}>{`Level: ${card.level || '-'}`}</Text>
                <Text marginLeft={2}>{`Pokedex Number: ${
                  card.nationalPokedexNumber || '-'
                }`}</Text>
                <Text marginLeft={2}>{`Number: ${card.number || '-'}`}</Text>
                <Text marginLeft={2}>{`Rarity: ${card.rarity}`}</Text>
                <Text marginLeft={2}>{`Retreat Cost: ${
                  card.retreatCost || '-'
                }`}</Text>
                <Text marginLeft={2}>{`Series: ${card.series || '-'}`}</Text>
                <Text marginLeft={2}>{`Subtype: ${card.subtype || '-'}`}</Text>
                <Text marginLeft={2}>{`Supertype: ${
                  card.supertype || '-'
                }`}</Text>
                <Text marginLeft={2}>{`Types: ${
                  card.types?.map((e) => {
                    return e;
                  }) || '-'
                }`}</Text>
                <Text marginLeft={2}>{`Weaknesses: ${
                  card.weaknesses?.map((e) => {
                    return e.type;
                  }) || '-'
                }`}</Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
