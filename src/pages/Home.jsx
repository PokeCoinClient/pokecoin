import {
  Center,
  Heading,
  Box,
  Text,
  Image,
  Flex,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import icon from '../assets/icon.svg';
import pokemon from '../assets/pokemon5.png';
import card from '../assets/pokemon-card-backside.jpg';
import GroupCards from '../assets/groupPokemon.png';

function Item({ textColor, headerText, bodyText, image, reverse = false }) {
  return (
    <Flex
      h={'22vh'}
      borderRadius={'10px'}
      boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
      flexDirection={reverse ? 'row-reverse' : 'row'}
    >
      <Flex padding={5} justifyContent={'center'} flexDirection="column">
        <Text fontSize="xx-large" textDecor="underline" color={textColor}>
          {headerText}
        </Text>
        <br />
        <Text fontSize="large" color={textColor}>
          {bodyText}
        </Text>
      </Flex>
      <Spacer />
      <Image src={image} height="100%" p={1} />
    </Flex>
  );
}

function Home() {
  const textColor = useColorModeValue('#554739', '#fff');
  return (
    <Flex flexDir={'column'} h={'100%'}>
      <Center gap={5}>
        <Image src={icon} height="100px" />
        <Box>
          <Heading color={textColor}>Pokecoin</Heading>
          <Text color={textColor}>The best client to mine your pokecoins!</Text>
        </Box>
      </Center>
      <Flex
        flexDir={'column'}
        flexGrow={1}
        justifyContent={'space-evenly'}
        gap={3}
      >
        <Item
          textColor={textColor}
          headerText={'Mine Pokecoins!'}
          bodyText={'Farm Pokecoins with your favorite Pokemon'}
          image={pokemon}
        />
        <Item
          textColor={textColor}
          headerText={'Buy Pokemon cards'}
          bodyText={'Buy super surprising Pokemon card packs'}
          image={card}
          reverse={true}
        />
        <Item
          textColor={textColor}
          headerText={'Collect Pokemon Cards'}
          bodyText={'Collect rare Pokemon cards and have fun looking at them'}
          image={GroupCards}
        />
      </Flex>
    </Flex>
  );
}

export default Home;
