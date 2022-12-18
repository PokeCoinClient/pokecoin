import { Heading, Text, Image, Flex, Spacer } from '@chakra-ui/react';
import icon from '../assets/icon.svg';
import card from '../assets/pokemon-card-backside.jpg';

function Home() {
  return (
    <div className="App">
      <Heading>Pokecoin</Heading>
      <Text fontSize="lg">
        Apparently we had reached a great height in the atmosphere, for the sky
        was a dead black, and the stars had ceased to twinkle. By the same
        illusion which lifts the horizon of the sea to the level of the
        spectator on a hillside, the sable cloud beneath was dished out, and the
        car seemed to float in the middle of an immense dark sphere, whose upper
        half was strewn with silver. Looking down into the dark gulf below, I
        could see a ruddy light streaming through a rift in the clouds.
      </Text>

      <Flex marginTop="20">
        <Flex flexDirection="column">
          <Text fontSize="xx-large" textDecor="underline">
            Farm Pokecoins
          </Text>
          <br />
          <Text fontSize="large">
            Have fun while patiently farming pokecoins
          </Text>
        </Flex>
        <Spacer />
        <Image src={icon} height="200px" />
      </Flex>
      <Flex marginTop="20">
        <Image src={icon} height="200px" />
        <Spacer />
        <Flex flexDirection="column">
          <Text fontSize="xx-large" textDecor="underline">
            Buy Pokemon cards
          </Text>
          <br />
          <Text fontSize="large">Buy super surprising Pokemon card packs</Text>
        </Flex>
      </Flex>
      <Flex marginTop="20">
        <Flex flexDirection="column">
          <Text fontSize="xx-large" textDecor="underline">
            Collect Pokemon Cards
          </Text>
          <br />
          <Text fontSize="large">
            Collect Pokemon cards and have fun looking at them
          </Text>
        </Flex>
        <Spacer />
        <Image src={card} height="300px" />
      </Flex>
    </div>
  );
}

export default Home;
