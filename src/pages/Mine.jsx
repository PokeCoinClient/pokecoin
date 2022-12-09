import { Center, Flex, Image } from '@chakra-ui/react';
import RunningPikachu from '../assets/pikachu-running.gif';
import SleepingPikachu from '../assets/pikachu-sleeping.gif';

function Mine() {
  return (
    <Flex justifyContent="center" h="90%">
      <Center>
        <Image src={RunningPikachu} height="200px" />
        <Image src={SleepingPikachu} height="250px" />
      </Center>
    </Flex>
  );
}

export default Mine;
